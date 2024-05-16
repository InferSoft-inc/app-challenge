## Technical Challenge: LLM Recipt Analysis App

### Overview
Welcome to the technical challenge for engineering positions at InferSoft. We're excited about your interest in helping us develop cutting-edge document analysis solutions using LLMs and vector databases. The purpose of this challenge is to assess your skills in building a basic version of the application we are developing.

### Challenge Description
Your task is to create a small application where a user can upload multiple text documents, and then query these documents to retrieve relevant information based on their questions. The application should leverage an LLM for understanding and answering questions and a vector database to store and retrieve document embeddings efficiently.

We've included a collection of scanned recipts. Your task is to create an application where users can upload the recipts and then retrieve relevent information based on a series of users query prompts included below:

1. `List all the vendors and the total amount spent per vendor across all documents`

2. `Identify all instances where transportation costs exceeded $100 in any single transaction across all countries. Create a table with the document name, date and amount spent`

3. `Calculate the total expenditure on dining out during holiday seasons (December-January) for the years 2018 through 2022, including a breakdown by type of cuisine and country.`

4. `Suggest where spending can be reduced without changing the trips itinerary (ie cheaper hotels, restaurants, etc).`

### Objectives
1. **Document Upload Interface**: Create a basic web interface that allows users to upload and store the documents. 
2. **Text Processing**: Implement functionality to preprocess the uploaded documents into a suitable format for analysis (e.g., tokenization, removing special characters). This should include OCR for scanned documents.
3. **Vector Embedding**: Utilize a LLM to generate embeddings for the preprocessed text, and store these embeddings in a vector database.
4. **Query System**: Develop a simple query interface where users can enter questions and retrieve answers. The system should use the vector database to find the most relevant document embeddings and use the LLM to generate answers based on these documents.
5. **Display Results**: The system should display the answers to the user’s questions.

### Suggested Technologies (use whatever you want)
- **Frontend**: HTML/CSS/JavaScript (Optional: React or Angular)
- **Backend**: Python (Flask or FastAPI), AWS textract for OCR
- **LLM Integration**: You can use the Hugging Face Transformers library to integrate a pre-trained model like BERT or GPT.
- **Vector Database**: Mongo, Faiss, Annoy, or similar for efficient similarity search in high-dimensional spaces.

### Deliverables
- Code hosted on a private GitHub repository.
  - Fork this repository to your GitHub account.
  - Clone your fork and create a new branch specifically for your submission.
  - Push your developed branch to your fork.
  - Email the link to your private repository and the specific branch to us at [whit@infersoft.com] when you are ready for review. 
- A README file documenting:
  - How to set up and run your application.
  - A brief explanation of your design choices and technologies used.
  - Any challenges you encountered and how you resolved them.
- A simple demo video showcasing the functionality of your application answering as many of the queries as you can. If it doesn't work perfectly, include your thoughts on whats going wrong and how you would fix it in the README file.


### Evaluation Criteria
- **Functionality**: The application meets all the basic functional requirements.
- **Code Quality**: Clean, readable, and well-documented code.
- **Design and Architecture**: Thoughtful organization of code and use of appropriate design patterns.
- **Performance**: Efficiency of the queries and responsiveness of the system.

This is intended to be a proof of concept that demonstrates your skills and approach to problem-solving in a condensed timeframe. We will review your submission and get back to you soon!
