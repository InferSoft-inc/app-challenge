# LLM Receipt Analysis App

## Overview

This project is a full stack application for receipt analysis using LangChain, OpenAI, Llama 3, Groq and Amazon Textract. The Fast API backend integrates with a MySQL database to store invoice data and provides endpoints for file upload, document querying, and SQL query execution. The frontend is written in Next.js' App Router in Typescript and Tailwind. The project is containerized using Docker and can be easily set up with Docker Compose.

Demo Video: https://drive.google.com/file/d/1H1KTrHHOfBsiYBRVuAjOk8txNdOzK5oq/view?usp=sharing

## Features

- **FastAPI Endpoints:** Provides endpoints for file upload, document querying, and SQL query execution.
- **Receipt Analysis:** Extracts and summarizes data from uploaded receipts using Amazon Textract, LangChain and LLMs.
- **MySQL Integration:** Stores extracted invoice data in a MySQL database and a vector store.
- **Environment Variables:** Secures API keys and database URL using environment variables.
- **CORS Enabled:** Allows frontend communication with the backend.

## Backend Endpoints

- **GET /:** Welcome message. Ensure the backend is running on http://localhost:8000/
- **POST /upload:** Upload receipt files for analysis.
- **GET /query:** Query documents stored in the vector database.
- **GET /execute_query:** Execute SQL queries against the MySQL database.

## Setup and Running

### Prerequisites

- Docker
- Docker Compose

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```sh
COHERE_API_KEY=your_cohere_api_key
GROQ_API_KEY=your_groq_api_key
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=mysql+pymysql://myuser:mypassword@db/mydatabase
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
```

You will need to obtain: [Cohere Key](https://dashboard.cohere.com/api-keys), [Groq Key](https://console.groq.com/keys), and [OpenAI Key](https://platform.openai.com/api-keys)

For the AWS keys you will have to go to AWS IAM console.

### Build and Run with Docker Compose

1. **Build the Docker images:**

    ```sh
    docker compose build
    ```

2. **Run the containers:**

    ```sh
    docker compose up
    ```

The backend service will be available at `http://localhost:8000`, frontend at `http://localhost:3000` and the MySQL database at `localhost:3306`.

### Accessing the MySQL Database

To access the MySQL database, use the following credentials:

- **Host:** localhost
- **Port:** 3306
- **Database:** mydatabase
- **User:** myuser
- **Password:** mypassword

## Project Structure

```sh
.
├── backend
│ ├── Dockerfile
│ ├── main.py
│ ├── requirements.txt
│ └── .env
├── frontend
│ ├── Dockerfile
│ ├── ...
├── docker-compose.yml
└── README.md
```

- **backend:** Contains the FastAPI backend code.
- **frontend:** Contains the webapp Next.js frontend code.
- **docker-compose.yml:** Docker Compose configuration file.
- **README.md:** Project documentation.

## Tech Stack Choices

1. Frontend: I chose Next.js' App Router because it is the newest web framework. Vercel is great. Lots of tutorials. App Router is new but I am familiar. 
2. Backend: It was a 50/50 toss up between Flask and Fast API. Both are written in Python and are relatively easy to learn.
3. Vector DB: FAISS. Extremely easy to get up and running.
4. Relational Database: I chose mysql because I am familiar with it and it's running for my other applications. 
5. LLMs: I used GPT4o whenever I needed the best results somewhat quickly. I could have used Opus but latency becomes an issue. I used Llama3 with Groq to form the final responses because GPT4o would be overkill and we want results fast.
6. Reranking: Reranking with Cohere improves results quite a bit. 

## Challenges

1. RAG out of the box gave extremely poor results. I experimented with a few designs but quickly realized I was better of using LLMs to convert those documents to a structured format to query off of.
2. MongoDB was being quite difficult. So I switched to FAISS to save time. ChromaDB, Pinecone, LanceDB and QDrant are all better than FAISS. But I wanted to ship a prototype.
3. CORs. Easy fix. But always something to add. 
4. Textract is very expensive. So for testing I made dummy PDFs and used PyMUPDF. 
5. Time and money were the biggest. You can build a pretty robust system for this with enough time and money to test.

## Engineering Considerations/Improvements

1. Push the uploaded files to a S3 bucket. You'd do so for permanence and so that AWS Textract could read and process multi page files.
2. Build out the modern PDF vs image based PDF. Textract is expensive. Ideally you do pass every file into it unless you have to.
3. Fine tune the embedding model
4. Use a more advanced vector store than FAISS. Ideally MongoDB. Ideally so you can leverage relational + vector store.
5. Use more metadata
6. Create longer and more complex JSON summaries, update the tables, etc
7. Wait for GPT5 and future models that can output more consistent results (produce more consistent/deterministic results)
8. I'd look to probably improve the latency. While file upload speed doesn't matter. Question answering does. So I'd explore more options.
9. Improve prompts, they are very much in prototype format. They are critical to the app's success.
10. Add more error handling and logging.
11. I'd add more chat history features. Probably not necessary but would make for a better UX.
12. I'd make the code more professional, modular and make main.py in my backend a lot shorter. I'd break steps out into functions.
13. Would love to integrate LangSmith or any testing framework.
14. Overall there is a lot of prototype -> production changes.

## License

This project is licensed under the MIT License.