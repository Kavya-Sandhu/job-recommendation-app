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