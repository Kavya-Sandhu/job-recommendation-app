# 💼 Job Opportunity Explorer

A graph-based Job Recommendation System that recommends suitable job opportunities to candidates based on their skills.

## 📌 Project Overview

Job Opportunity Explorer is a web application that uses a graph database to connect candidates, skills, jobs, and companies.

The system analyzes the skills possessed by a candidate and compares them with the skills required by available jobs.

Based on the matching skills, the application recommends suitable jobs and displays a match percentage.

## 🎯 Problem Statement

Job seekers often need to search through many job opportunities to find positions that match their skills.

This project solves the problem by using a graph-based recommendation approach.

The system:

- Stores candidates and their skills
- Stores jobs and required skills
- Stores companies offering jobs
- Finds matching skills
- Calculates a match percentage
- Recommends suitable jobs to candidates

## ✨ Features

- Candidate selection
- Skill-based job recommendations
- Graph database integration
- Company and job information
- Required skill comparison
- Matched skill identification
- Match percentage calculation
- REST API backend
- Simple and responsive frontend

## 🛠️ Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- CognoDB
- Cypher Query Language
- REST API

## 🧩 Graph Database Structure

The project uses a graph-based data model.

### Main entities

- Person
- Skill
- Job
- Company

### Relationships

```text
Person
   │
   ├── HAS_SKILL ──> Skill
   │
   └── APPLIED_FOR ──> Job

Job
   │
   ├── REQUIRES_SKILL ──> Skill
   │
   └── POSTED_BY ──> Company
```

# 📂 Project Structure

```text
job-recommendation-app/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md

```

# 📄 Project Files

## `public/index.html`

Contains the structure of the Job Recommendation application's user interface.

It includes:

- Application title
- Candidate selection
- Find Jobs button
- Job recommendation display area

---

## `public/style.css`

Contains the styling and layout of the web application.

It is responsible for:

- Page layout
- Colors
- Fonts
- Buttons
- Forms
- Job recommendation cards
- Responsive design

---

## `public/script.js`

Contains the frontend JavaScript functionality.

It is responsible for:

- Handling user interactions
- Reading the selected candidate
- Sending requests to the backend
- Receiving API responses
- Displaying recommended jobs on the webpage

---

## `server.js`

Contains the backend implementation using Node.js and Express.js.

It is responsible for:

- Starting the web server
- Serving frontend files
- Creating REST API endpoints
- Connecting to Neo4j
- Processing requests
- Sending responses to the frontend
- Managing environment variables

---

## `package.json`

Contains the project information, scripts, and required dependencies used by the application.

The dependencies may include:

- Express.js
- Neo4j driver
- dotenv
- CORS
  
---

Install all dependencies using:

npm install

# ⚙️ Installation and Setup

Follow these steps to run the Job Recommendation App on your local computer.

## 1. Clone the Repository

Clone the GitHub repository using:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL

# 📦 Install Dependencies

Install all the required Node.js packages using:

```bash
npm install

# 🔐 Configure Environment Variables

Create a `.env` file in the root directory of the project.

Add your Neo4j database details:

```env
NEO4J_URI=your_neo4j_uri
NEO4J_USERNAME=your_neo4j_username
NEO4J_PASSWORD=your_neo4j_password

# 🗄️ Neo4j Database

This project uses **Neo4j** as a graph database to store and manage relationships between candidates, skills, jobs, and companies.

Neo4j is suitable for this project because job recommendations depend on relationships between a candidate's skills and the skills required for different jobs.

## 📊 Database Entities

The main entities used in the application are:

- 👤 Candidate
- 🛠️ Skill
- 💼 Job
- 🏢 Company

## 🔗 Database Relationships

The relationships between the entities can be represented as:

```text
Candidate
    │
    │ HAS_SKILL
    ↓
  Skill
    │
    │ REQUIRED_FOR
    ↓
   Job
    │
    │ OFFERED_BY
    ↓
 Company

# ▶️ Running the Application

Follow the steps below to run the Job Recommendation App on your local computer.

## 1. Start the Backend Server

Open the project folder in **Visual Studio Code**.

Open the terminal and run:

```bash

node server.js
You should see:

Job Recommendation App running at http://localhost:3000

Then open your browser:

http://localhost:3000/public/index.html

The Job Recommendation App should now be displayed.

🔌 API Endpoints

Test API

GET /api/test

Example:

http://localhost:3000/api/test

This endpoint can be used to verify that the backend server is working.

Job Recommendations API

GET /api/recommendations

Example:

http://localhost:3000/api/recommendations

This endpoint retrieves job recommendation data from the backend/database.

🗄️ Database

This project uses Neo4j as the database.

Neo4j is a graph database that is useful for representing relationships between:

```text
Candidate
   │
   ├── HAS_SKILL ──► Skill
   │
   └── MATCHES ────► Job
                         │
                         ├── Requires ──► Skill
                         │
                         └── Belongs ───► Company
The graph structure makes it possible to find relationships between candidate skills and job requirements.

🔄 Application Workflow

The application works approximately as follows:

1. User opens the application
          ↓
2. Candidate is selected
          ↓
3. Frontend sends request to backend
          ↓
4. Express receives the request
          ↓
5. Backend communicates with Neo4j
          ↓
6. Neo4j retrieves relevant job information
          ↓
7. Backend sends job recommendations
          ↓
8. Frontend displays recommended jobs
```

🖥️ Running the Frontend

The frontend is served directly by the Express server from the public folder.

The application uses:

app.use(express.static(path.join(__dirname, "public")));

Therefore, the recommended way to access the application is:

http://localhost:3000/

You do not need to use VS Code's Go Live option when running the complete application through Express.

📱 Accessing the Application on Mobile

The application can also be accessed from a mobile device during development.

Make sure:

Your computer and mobile phone are connected to the same Wi-Fi network.

The Express server is running.

The server listens on 0.0.0.0.

Example:

app.listen(PORT, "0.0.0.0", () => {

    console.log(`Job Recommendation App running at http://localhost:${PORT}`);
    
});
Find your computer's local IPv4 address using:

ipconfig

Then open the following on your phone:

http://YOUR_COMPUTER_IP:3000/

🔒 Security

Sensitive information should never be committed to GitHub.

The .gitignore file should contain:

node_modules/

.env
A .env.example file can be provided for other developers:

NEO4J_URI=
NEO4J_USERNAME=
NEO4J_PASSWORD=

🚀 Future Enhancements

The project can be further improved by adding:

🔎 Job search and filtering

📍 Location-based job recommendations

🎯 Skill-based matching percentage

👤 User registration and login

📄 Resume upload

🤖 Machine learning-based recommendations

🎓 Learning Outcomes

Through this project, the following skills were developed:

HTML webpage development

CSS styling and responsive design

JavaScript programming

DOM manipulation

REST API integration

Node.js development

Express.js backend development

Neo4j database integration

Environment variable management

Frontend-backend communication

Git and GitHub usage

Debugging and testing web applications

👩‍💻 Author

Kavya Sandhu

B.Tech Graduate | Fresher

Skills

HTML

CSS

JavaScript

React.js
Node.js
Express.js
Java
Neo4j
Git & GitHub
