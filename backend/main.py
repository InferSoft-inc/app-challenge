import os
import shutil
import json
import boto3
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlalchemy import create_engine, Column, Integer, String, DECIMAL, Date, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import func
from sqlalchemy import and_
from datetime import datetime

from langchain_community.document_loaders import PyMuPDFLoader
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.retrievers import ContextualCompressionRetriever
from langchain_community.vectorstores import FAISS
from langchain_cohere import CohereEmbeddings
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain_cohere import CohereRerank
from langchain_community.document_loaders import AmazonTextractPDFLoader
from langchain.chains.summarize import load_summarize_chain
from groq import Groq
from openai import OpenAI

COHERE_API_KEY = os.getenv("COHERE_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

if not COHERE_API_KEY or not GROQ_API_KEY or not DATABASE_URL or not OPENAI_API_KEY or not AWS_ACCESS_KEY_ID or not AWS_SECRET_ACCESS_KEY:
    raise ValueError("Missing required environment variables")

Base = declarative_base()

class Invoice(Base):
    __tablename__ = 'invoices'

    id = Column(Integer, primary_key=True, index=True)
    vendor_name = Column(String(255), index=True)
    vendor_location = Column(String(255), index=True)
    date = Column(Date)
    invoice_total = Column(DECIMAL(10, 2))
    category = Column(String(255))

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Drop the table if desired, could make a function
# Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

class AppState:
    def __init__(self):
        self.app = FastAPI()
        self.text_splits = []
        self.retriever = None
        self.groq_client = Groq(api_key=GROQ_API_KEY)
        self.openai_client = OpenAI(api_key=OPENAI_API_KEY,)
        self.setup_routes()
        self.setup_cors()

    def setup_cors(self):
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=["http://localhost:3000"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    def setup_routes(self):
        self.app.get("/")(self.read_root)
        self.app.post("/upload")(self.upload_files)
        self.app.get("/query")(self.query_docs)
        self.app.get("/execute_query")(self.execute_query)

    def read_root(self):
        return {"message": "Welcome to the FastAPI backend!"}

    async def upload_files(self, files: List[UploadFile] = File(...)):
        textract_client = boto3.client(
            "textract",
            region_name="us-east-1",
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY 
        )
        for file in files:
            temp_file_path = f"/tmp/{file.filename}"
            with open(temp_file_path, "wb") as temp_file:
                shutil.copyfileobj(file.file, temp_file)

            # Use PyMuPDFLoader to load the PDF
            # loader = PyMuPDFLoader(temp_file_path)

            # Use AmazonTextractPDFLoader to load the PDF
            loader = AmazonTextractPDFLoader(temp_file_path, client=textract_client)
            data = loader.load()
            document_summary = self.create_summary(data)
            self.create_summary_table(document_summary)

            # Split the text into smaller chunks
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=5000, chunk_overlap=000)
            self.text_splits = text_splitter.split_documents(data)

            # Embed the text using OpenAIEmbeddings
            embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)

            # Store documents and their embeddings in FAISS
            vectorstore = FAISS.from_documents(self.text_splits, embeddings)
            vectorstore.save_local("vectors")
            self.retriever = FAISS.from_documents(self.text_splits, CohereEmbeddings()).as_retriever(search_kwargs={"k": 20})

            # Clean up the temporary file
            os.remove(temp_file_path)

        return JSONResponse(content={"message": "Files uploaded successfully"})

    def create_summary(self, docs):
        page_contents = [doc.page_content for doc in docs]
        summary_input = "\n".join(page_contents)
        system_prompt = '''
        Summarize the provided invoice document using the key below. Only respond with the JSON object please. Nothing else. If you can't grab the item do not guess or make them up. Write unknown.

        vendor_name: String
        vendor_location: Country, needs to be a string
        date: Month/Day/Year, ensure the year is 4 digits. Assume a recency biasis. So the year 18 would be 2018 not 1918.
        invoice_total: Number without $ sign
        category: (Hotel, Public Transporation, Restaraunt, Retail, Tourist Attraction)

        Your goal is to grab the following items and return them in a JSON format:
        1. vendor_name
        2. vendor_location
        3. date
        4. invoice_total
        5. category
        '''

        response = self.openai_client.chat.completions.create(
            model="gpt-4o",
            response_format={ "type": "json_object" },
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": summary_input}
            ]
        )
        return response.choices[0].message.content

    def create_summary_table(self, document_summary_str):
        # Convert the string response to a JSON object
        try:
            document_summary = json.loads(document_summary_str)
        except json.JSONDecodeError:
            raise ValueError("Failed to parse the document summary string as JSON.")

        session = SessionLocal()
        try:
            invoice = Invoice(
                vendor_name=document_summary.get('vendor_name', 'unknown'),
                vendor_location=document_summary.get('vendor_location', 'unknown'),
                date=datetime.strptime(document_summary.get('date', '01/01/1970'), '%m/%d/%Y').date(),
                invoice_total=float(document_summary.get('invoice_total', 0)), 
                category=document_summary.get('category', 'unknown')
            )
            session.add(invoice)
            session.commit()
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    def generate_sql(self, natural_language_query: str) -> str:
        prompt = f'''You are a helpful assistant. You will convert the following natural language query into a SQL query for the table "invoices":\n\n{natural_language_query}\n\nSQL Query.
        Use the table's schema for knowledge of columns and data types:
        
        id = Column(Integer, primary_key=True, index=True)
        vendor_name = Column(String(255), index=True)
        vendor_location = Column(String(255), index=True) # This is a country
        date = Column(Date) # This is in the format of Month/Day/Year
        invoice_total = Column(DECIMAL(10, 2)) # This is a number without the $ sign and has two decimals
        category = Column(String(255)) # This is a category of the invoice, can be (Hotel, Public Transporation, Restaraunt, Retail, Tourist Attraction)

        Response with JSON blob of the structure:
        
        SQL: The SQL query
        
        '''
        
        response = self.openai_client.chat.completions.create(
            model="gpt-4o",
            response_format={ "type": "json_object" },
            messages=[
                {"role": "system", "content": prompt}
            ]
        )

        sql_query_json = response.choices[0].message.content
        try:
            sql_query = json.loads(sql_query_json)
        except json.JSONDecodeError:
            raise ValueError("Failed to parse the document summary string as JSON.")
        sql_query = sql_query.get('SQL', None)
        return sql_query
    
    def run_sql_query(self, sql_query: str) -> List[dict]:
        session = SessionLocal()
        try:
            result = session.execute(text(sql_query))
            results_as_dict = result.mappings().all()
            return results_as_dict
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    async def execute_query(self, query: str):
        sql_query = self.generate_sql(query)
        if sql_query is None:
            return JSONResponse(content={"error": "Failed to generate SQL query from the provided natural language query."}, status_code=400)
        
        try:
            results = self.run_sql_query(sql_query)
            groq_prompt = f'''
            You are a helpful assistant. You are the last step in ensuring that the output is provided correctly.
            The user has asked a natural language question. That natural language question has been converted to SQL query. 
            That SQL query has been run against our database and the results are returned.

            The user's question {query} and the generated SQL query results: {results}. 

            Answer the question in a human readable format. Don't make up any answer. 
            If the query isn't present say "Error please rephrase your question"
            '''
            chat_completion = self.groq_client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": groq_prompt,
                    }
                ],
                model="llama3-8b-8192",
            )
            return JSONResponse(content={"answer": chat_completion.choices[0].message.content})
        except Exception as e:
            return JSONResponse(content={"error": str(e)}, status_code=500)

    def query_docs(self, query: str):
        embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
        loaded_vectors = FAISS.load_local("vectors", embeddings, allow_dangerous_deserialization=True)

        retriever_vectordb = loaded_vectors.as_retriever(search_kwargs={"k": 10})
        compressor = CohereRerank()
        compression_retriever = ContextualCompressionRetriever(base_compressor=compressor, base_retriever=self.retriever)
        
        model = ChatOpenAI(model_name="gpt-4o", openai_api_key=OPENAI_API_KEY)
        chain = RetrievalQA.from_chain_type(llm=model, retriever=compression_retriever)
        response = chain.invoke(query)
        return JSONResponse(content={"answer": response['result']})

state = AppState()
app = state.app

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
