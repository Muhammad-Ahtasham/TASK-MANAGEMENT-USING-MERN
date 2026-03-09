# Task Management App using MERN Stack
<img width="1346" height="605" alt="image" src="https://github.com/user-attachments/assets/782e2f85-f47c-4e1c-9570-b3cb5f404fbc" />


This is a simple Task Management application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
It allows users to register, log in, reset passwords securely, and perform full CRUD operations on tasks.

---

## Features

- 🔐 **User Authentication** with JWT (JSON Web Tokens)  
- 🔄 **Password Reset** functionality via email with token verification  
- 📋 **Task Management**: Create, Read, Update, Delete (CRUD) tasks  
- 🚀 Smooth integration between frontend (React) and backend (Express.js)  
- 🛠️ Real-time feedback using toast notifications (react-toastify)  
- 🗃️ Data stored securely in MongoDB using Mongoose  
- 📧 Tested API endpoints using Postman  
- 🗂️ MongoDB Compass used for database management and inspection

<img width="1349" height="610" alt="image" src="https://github.com/user-attachments/assets/055795ee-2d4d-4406-98c5-4cb749916bd7" />

---

## Getting Started

### Prerequisites

- Node.js and npm installed  
- MongoDB installed or MongoDB Atlas account  
- Git installed  

### Installation

1. Clone the repo:

git clone https://github.com/Muhammad-Ahtasham/TASK-MANAGEMENT-USING-MERN
Install dependencies for both backend and frontend:


cd backend
npm install

cd ../frontend
npm install
Setup environment variables for backend (e.g. .env file):


PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
Run the backend server:



cd backend
npm start
Run the frontend app:


cd frontend
npm start
Usage
Register a new user account

Log in with credentials

Create, update, delete tasks

Use password reset via email if needed

Tools & Technologies Used
MongoDB & Mongoose

Express.js

React.js with React Router

Node.js

JWT Authentication

Nodemailer (for password reset emails)

React-Toastify (for notifications)

Postman (API testing)

MongoDB Compass (Database management)

Contribution
Feel free to fork this repo and submit pull requests if you'd like to contribute!

Acknowledgements
Thanks to the MERN stack community and all the helpful resources online!
