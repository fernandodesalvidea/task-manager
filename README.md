# 📝 Momentum Task Manager

# ⚡ Live Demo
Check out the live app here: https://momentum-3huo.onrender.com/

Momentum is a sleek, full-stack task manager built with the MERN stack (MongoDB, Express, React, Node.js). Designed to help you organize your day, prioritize tasks, and get things done efficiently, Momentum combines simplicity with powerful features—all wrapped in a modern, responsive UI.

# 🚀 Features

User Authentication: Register, login, and secure your account with JWT tokens.

Task CRUD: Create, read, update, and delete tasks easily.

Task Completion: Mark tasks as complete and clear them all at once with one click.

Priority Levels: Assign priorities to tasks for better organization.

Modals for UX: Smooth, interactive modals for editing and confirming actions.

# 🛠 Tech Stack

Frontend: React, Axios

Backend: Node.js, Express.js, MongoDB (Atlas), JWT Authentication

Deployment: Render (backend + frontend)

Styling: CSS Modules

# 📸 Screenshots
<img width="1439" height="699" alt="Screenshot 2025-09-19 at 2 57 16 PM" src="https://github.com/user-attachments/assets/3a80ab0c-efc6-4cd9-b309-7bc70fb0d89d" />
<img width="1423" height="697" alt="Screenshot 2025-09-19 at 2 57 53 PM" src="https://github.com/user-attachments/assets/0d16155b-8485-4411-9d04-61f9f6387e9c" />
<img width="1433" height="688" alt="Screenshot 2025-09-19 at 2 58 22 PM" src="https://github.com/user-attachments/assets/cd7da972-99ea-4bb5-978e-2ef699cb2d20" />
<img width="683" height="193" alt="Screenshot 2025-09-19 at 2 59 13 PM" src="https://github.com/user-attachments/assets/a1d10d86-b01f-47fa-810b-3e5fee0bbc41" />






💻 Getting Started

Follow these steps to run the project locally:

# 1. Clone the repository
git clone https://github.com/fernandodesalvidea/momentum-task-manager.git
cd momentum-task-manager

# 2. Backend Setup
cd backend
npm install


Create a .env file in /backend:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Start the backend:

npm run dev

# 3. Frontend Setup
cd ../frontend
npm install


Create a .env file in /frontend:

REACT_APP_API_URL=http://localhost:4000


Start the frontend:

npm start


Open http://localhost:3000
 to see it in action.

# 🔒 Authentication Flow

User registers with email and password.

Server generates a JWT access token.

Frontend stores token in localStorage.

Authenticated routes fetch tasks using token verification.

# 🎯 Future Improvements

Add drag-and-drop task reordering.

Implement due dates and reminders.

Dark mode and customizable themes.

Analytics: task completion rates over time.


# 📄 License

This project is MIT licensed.
