## Technical Challenge: LLM Receipt Analysis App

### Overview
Welcome to the technical challenge for engineering positions at InferSoft. We're excited about your interest in helping us develop cutting-edge document analysis solutions using LLMs and innovative storage techniques. The purpose of this challenge is to assess your skills in building a basic version of the application we are developing.

### Setting Up
Git clone the repository and then follow the steps below to setup the application

#### Backend
1) The Backend code is located in the 'api' folder. So first move into the api folder using `cd api`
2) This is not a required step, but a recommended one. If you are not doing this, then you can skip to step 4 directly. Create a new virtual environment. This is not a required step, but I would recommend doing this so that the dependencies which you have in your system do not cause issues with the required dependencies. Run the command `python -m venv env` or `python3 -m venv env` to create a new virtual environemnt with the name "env"
3) Activate the virtual environment by running the command `source env/bin/activate`
4) Now that the virtual environment is activated, install all the dependencies by running `pip install -r requirements.txt`
5) Once the dependencies are installed (and the enviroment keys set in `settings.py`), you can run the database migration commands. Run `python manage.py makemigrations`, followed by `python manage.py migrate` to migrate the DB changes
6) Now, you are all set to start the backend server. Start the server by running `python manage.py runserver` 

`Note: Github doesn't allow keys to be pushed to the repositories. So please contact `shreyas2499@gmail.com` to get access to the keys`

#### Frontend
1) The Frontend code is located in the 'ui' folder. So first move into the ui folder using `cd ui`
2) Then to install the dependencies, run the command `npm install`. This will install all the dependencies required
3) Now, you can start the frontend server by running the command `npm start`

### Design and Architecture
1) Backend: Django
2) Frontend: React with reactstrap
3) Database: Sqlite3
4) Storage: AWS S3
#### Architecture Diagram
   ![image](https://github.com/shreyas2499/app-challenge/assets/59840906/1cfc3320-6a41-4941-9c37-8bff6f2b7ab4)
- The user would upload files to the frontend web server. I used Reactjs and reactstrap for the frontend since react gives a lot of customizable packages which can be used for future improvements.
- I used Django for the backend as it also provides the added support for SQLite3 by default, which is the DB that I have gone ahead with for this project.
- The files would first be processed using the ocr package. The content extracted, and then the file would be stored in AWS S3. Ideally, we would want to scale this application. And when the application is scaled, storing files in the database can lead to really huge DB sizes which in turn would lead to really high costs. So using a blob store like S3 is the best alternative for this. So I am using S3 to store all the files (Very cheap compared to storing files in DB + Easily scalable).
- The obtained file link, file contents, file name is stored in the database.
- Since, the DB is just going store some basic information of the file, I didn't find the need to use a NoSql db like MongoDB or DynamoDB, and went with the Django's default Sqlite3 database as it does the job just fine in this case.
- Now, for the search and querying section. I have used chatGPT's GPT 4 Turbo Model to perform the querying. I retrieve all the records from the database and pass all the contents along with the searched query and ask the GPT model to return the result to me, which I then show to the user.


### Challenges
- I hadn't worked with OCR packages, so I had to research and experiment a bit on that front.
- I wasn't able to create the tables dynamically for the prompts. So right now, I am just displaying plain text.

**Demo Video**:  
https://github.com/shreyas2499/app-challenge/assets/59840906/2d378d30-f65e-40bd-a161-7d4f7552b301
