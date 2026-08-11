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

📂 Project Structure

job-recommendation-app/
│
├── public/
|
│   ├── index.html
|
│   ├── style.css
|
│   └── script.js
│
├── server.js
|
├── package.json
|
├── package-lock.json
|
├── .env
|
├── .gitignore
|
└── README.md

public/index.html
Contains the structure of the Job Recommendation application's user interface.
public/style.css
Contains the styling and layout of the application.
public/script.js
Contains the frontend JavaScript logic and communication with the backend API.
server.js
Contains the Node.js/Express backend server, API routes, Neo4j database connection, and static file configuration.
.env
Stores environment variables such as database credentials.

⚙️ Installation and Setup
1. Clone the Repository
git clone YOUR_GITHUB_REPOSITORY_URL
Move into the project directory:
cd job-recommendation-app
2. Install Dependencies
Run:
npm install
This installs the required Node.js packages.

▶️ Running the Application
Start the backend server using:
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
