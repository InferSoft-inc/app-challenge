## Technical Challenge: LLM Receipt Analysis App

### Overview
Welcome to the technical challenge for engineering positions at InferSoft. We're excited about your interest in helping us develop cutting-edge document analysis solutions using LLMs and innovative storage techniques. The purpose of this challenge is to assess your skills in building a basic version of the application we are developing.

### Challenge Description
Your task is to create a small application where a user can upload multiple text documents and then query these documents to retrieve relevant information based on their questions. The application should leverage an LLM for understanding and answering questions and a suitable storage method to handle document embeddings efficiently.

We've included a collection of scanned receipts. Your task is to create an application where users can upload the receipts and then retrieve relevant information based on a series of example user query prompts included below:

1. `List all the vendors and the total amount spent per vendor across all documents.`
2. `Identify all instances where transportation costs exceeded $100 in any single transaction across all countries. Create a table with the document name, date, and amount spent.`
3. `Calculate the total expenditure on dining out during holiday seasons (December-January) for the years 2018 through 2022, including a breakdown by type of cuisine and country.`
4. `Suggest where spending can be reduced without changing the trip's itinerary (e.g., cheaper hotels, restaurants, etc.).`

### Objectives
1. **Document Upload Interface**: Create a basic web interface that allows users to upload and store the documents.
2. **Text Processing**: Implement functionality to preprocess the uploaded documents into a suitable format for analysis. This should include OCR for scanned documents.
3. **Storage and Retrieval**: Utilize a method to store the preprocessed text, and enable efficient retrieval for query processing.
4. **Query System**: Develop a simple query interface where users can enter questions and retrieve answers. The system should find the most relevant document embeddings and use the LLM to generate answers based on these documents.
5. **Display Results**: The system should display the answers to the user’s questions.

### Deliverables
- **Code**: Hosted on a private GitHub repository.
  - Fork this repository to your GitHub account.
  - Clone your fork and create a new branch specifically for your submission.
  - Push your developed branch to your fork.
  - Email the link to your private repository and the specific branch to us at [whit@infersoft.com] when you are ready for review.
- **README File**:
  - Instructions on how to set up and run your application.
  - A brief explanation of your design choices and technologies used.
  - Any challenges you encountered and how you resolved them.
- **Demo Video**: A simple demo video showcasing the functionality of your application, answering as many of the example queries as you can. If it doesn't work perfectly, include your thoughts on what’s going wrong and how you would fix it in the README file.

### Evaluation Criteria
- **Functionality**: The application meets all the basic functional requirements.
- **Code Quality**: Clean, readable, and well-documented code.
- **Design and Architecture**: Thoughtful organization of code and use of appropriate design patterns.
- **Performance**: Efficiency of the queries and responsiveness of the system.

### Notes
- **No Time Limit**: There is no strict time limit for this challenge. We understand the full project might take a lot longer than a few hours. You are welcome to provide mock-up designs or placeholder code for parts you couldn’t complete within the timeframe.
- **Example Questions**: The list of queries provided are examples you can pose to the system. Feel free to come up with additional queries to showcase your solution.
- **Technology Flexibility**: You are free to use any technology stack you are comfortable with. Focus on the product deliverables and demonstrating your problem-solving approach.
- **Simplicity and Innovation**: A small demo with a subset of the data is sufficient. Consider implementing a basic vector DB lookup with FAISS or hosting the solution locally. It's okay to simplify aspects like using a smaller LLM locally or exploring alternative methods to achieve the desired results.

This challenge is intended to be a proof of concept that demonstrates your skills and approach to problem-solving. We look forward to reviewing your submission!
