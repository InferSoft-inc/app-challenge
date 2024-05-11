## Technical Challenge: Document Analysis Application

### Overview
Welcome to the technical challenge for the engineering position at our startup. We're excited about your interest in helping us develop cutting-edge document analysis solutions using large language models (LLMs) and vector databases. The purpose of this challenge is to assess your skills in building a basic version of the application we are developing.

### Challenge Description
Your task is to create a small application where a user can upload multiple text documents, and then query these documents to retrieve relevant information based on their questions. The application should leverage a LLM for understanding and answering questions and a vector database to store and retrieve document embeddings efficiently.

### Objectives
1. **Document Upload Interface**: Create a basic web interface that allows users to upload and store multiple text documents.
2. **Text Processing**: Implement functionality to preprocess the uploaded documents into a suitable format for analysis (e.g., tokenization, removing special characters).
3. **Vector Embedding**: Utilize a LLM to generate embeddings for the preprocessed text, and store these embeddings in a vector database.
4. **Query System**: Develop a simple query interface where users can enter questions and retrieve answers. The system should use the vector database to find the most relevant document embeddings and use the LLM to generate answers based on these documents.
5. **Display Results**: The system should display the relevant document snippets alongside the answers to the user’s questions.

### Technologies
- **Frontend**: HTML/CSS/JavaScript (Optional: React or Angular)
- **Backend**: Python (Flask or FastAPI)
- **LLM Integration**: You can use the Hugging Face Transformers library to integrate a pre-trained model like BERT or GPT.
- **Vector Database**: Use Faiss, Annoy, or similar for efficient similarity search in high-dimensional spaces.

### Deliverables
- Source code hosted on a public GitHub repository.
- A README file documenting:
  - How to set up and run your application.
  - A brief explanation of your design choices and technologies used.
  - Any challenges you encountered and how you resolved them.
- A simple demo (video or live) showcasing the functionality of your application.

### Evaluation Criteria
- **Functionality**: The application meets all the basic functional requirements.
- **Code Quality**: Clean, readable, and well-documented code.
- **Design and Architecture**: Thoughtful organization of code and use of appropriate design patterns.
- **Performance**: Efficiency of the queries and responsiveness of the system.

### Time Frame
You should aim to complete this challenge within 4 hours. This is intended to be a proof of concept that demonstrates your skills and approach to problem-solving in a condensed timeframe.

Good luck! We look forward to seeing your innovative solutions and discussing your approach during your interview.

# app-challenge-24

We're excited to invite you to take part in the next step - building your own LLM application. The products we're building with our design partners require either previous knowledge or the ability to learn rapidly how to build these systems. This challenge gives candidates the oppertunity to highlight their super powers and how those powers will help our team build the next generation of AI user experience. 

Project Description:

Included in this repo you will find a collection of scanned PDF documents from X. Your task is to create an application where users can upload the documents and then retrieve relevent information based on a series of users query prompts included below:

- List the documents by creation date, Create a table with Doc name, date created and individuals who signed (bonus to seperate out the lessee and lessor!)
- Create a table of all the key values XX

Additional details: 
- Time Limit: There's no time limit though we suggest aiming for 2-3 hours of work
- Areas of Focus: You'll see various aspects to this app, we don't expect you to build a perfect app - please focus on the areas where you are most profiecient. The goal is to exhibit your talents as an engineer.
- Communicate: Err on the side of oversharing - we want to learn how you think, what you would have done given more time, things you tried that maybe didn't work etc. This is all great to know and will absolutely be counted positivley!

Evaluation Criteria:

- We'll be evaluating folks based on code quality, innovation and communication. We made this an open exercise in an effort to learn more about where you shine. Again feel free to skip sections that you are not familiar with if it means you can show your skill elsewhere in the given time. 

Some hints: 

You'll need to use an OCR solution to pull out the text values. We're using AWS Textract to do this, feel free to use that or any solution of your choosing. 

Given the limited context window of models, you'll likely need to run the text through an embedding to create a vector representation of the documents. We're using MongDB atlas search (https://www.mongodb.com/developer/products/atlas/rag-with-polm-stack-llamaindex-openai-mongodb/). 

Feel free to use any model(s) you want

Submission Guidelines: 

- Fork this repository to your GitHub account.
- Clone your fork and create a new branch for your submission.
- Develop your solution on your branch.
- Push your branch to your fork and create a pull request to the main repository when you're ready.
- In addition to your code, please submit
  1) a screenshare walk through of you using the tool to answer some of the queries
  2) A README file describing how we can test your code
  3) The answers to the provided queries below (screenshot is fine)
- We will review your submission and get back to you soon!
