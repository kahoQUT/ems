# Employee Management System (EMS)

A full-stack web application for managing employees, departments, and salaries. Built with Node.js, Express, MongoDB, and React.

---

## Features

- User Authentication (JWT-based)
- CRUD Operations for Employees
- Responsive Frontend UI
- Unit & Integration Testing (Mocha + Chai + Sinon)

---

## Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Frontend    | React, Axios, React Router    |
| Backend     | Node.js, Express              |
| Database    | MongoDB (via Mongoose)        |
| Auth        | JWT, bcrypt                   |
| Testing     | Mocha, Chai, Sinon            |
| Dev Tools   | PM2, dotenv, ESLint           |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ems.git
cd ems
```

### 2. Update Connection String in App
Copy .env.example file code to .env file. If .env file is not available, please create a
new one in root of the backend folder. Assign your connection string to
MONGO_URI variable
```bash
MONGO_URI=<YOUR MONGODB CONNECTION STRING>
JWT_SECRET=2J8zqkP7VN6bxzg+Wy7DQZsd3Yx8mF3Bl0kch6HYtFs=
PORT=5001
```

### 3. Install dependencies
```bash
npm run install-all
```

### 4. Run the project
```bash
npm start OR npm run dev
```
Check Frontend which runs on http://localhost:3000