# app-challenge-24

Thank you for taking the time to participate in our recruitment process, we're excited to invite you to take part in the next step - building your own LLM application. The products we're building with our design partners require either previous knowledge or the ability to learn rapidly how to build these systems. 

Project Description:

Included in this repo you will find a collection of scanned PDF documents from X. Your task is to create an application where users can upload the documents and then retrieve relevent information based on a series of users query prompts included below:

- List the documents by creation date, Create a table with Doc name, date created and individuals who signed (bonus to seperate out the lessee and lessor!)
- Create a table of all the key values XX

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
  1) a video walk through of you using the tool to answer some of the queries
  2) A README file describing how we can test your code
  3) The answers to the provided queries below (screenshot is fine)
- We will review your submission and get back to you soon!

  
Some things to note:

- Time Limit: There's no time limit though we suggest aiming for 2-3 hours of work
- Areas of Focus: You'll see various aspects to this app, we don't expect you to build a perfect app - please focus on the areas where you are most profiecient. The goal is to exhibit your talents as an engineer.
- Communicate: Err on the side of oversharing - we want to learn how you think, what you would have done given more time, things you tried that maybe didn't work etc. This is all great to know and will absolutely be counted positivley!

Evaluation Criteria:

- We'll be evaluating folks based on code quality, innovation and communication. We made this an open exercise in an effort to learn more about where you shine. Again feel free to skip sections that you are not familiar with if it means you can show your skill elsewhere in the given time. 
