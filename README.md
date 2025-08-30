🧠 Second Brain

"Because sometimes your brain has too many tabs open."

Second Brain is a TypeScript-powered MERN stack project that helps you store and organize all your important stuff in one place.
Whether it’s text, YouTube videos, tweets, links, or tasks—you can save it here.

🚀 Highlight Feature: You can even share your entire brain with friends.

✨ Features

Save text, links, YouTube videos, tweets, and tasks

Organize your knowledge in one clean space

Share your whole “brain” with others

Built fully with TypeScript + MERN stack

📂 Project Structure
SECOND BRAIN
├── client      # Frontend (React + TypeScript + Vite)
│   ├── public
│   └── src
│   └── .env
├── server      # Backend (Node.js + Express + MongoDB + TypeScript)
│   ├── src
│   │   ├── config
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   └── utils
│   └── .env

⚙️ Setup Instructions
1. Clone the repo
git clone https://github.com/bMadhavvarma/second_brain

cd second-brain

3. Install dependencies

For both client and server:

cd client
npm install
cd ../server
npm install

3. Setup environment variables

Frontend (client/.env)

VITE_BACKEND_URL=http://localhost:5000


Backend (server/.env)

MONGO_URL=your-mongodb-url
PORT=5000
JWT_SECRET=supersecretkey123


(Note: Replace your-mongodb-url with your own MongoDB connection string)

4. Run the project

Start the backend:

cd server
npm run dev


Start the frontend:

cd client
npm run dev


The app will be available at:
👉 Frontend: http://localhost:5173
👉 Backend: http://localhost:5000

🛠️ Tech Stack

Frontend: React, TypeScript, Vite

Backend: Node.js, Express, TypeScript

Database: MongoDB

Auth: JWT

📌 Notes

This is my first TypeScript project, so feedback is welcome 🙌

The app currently runs locally.
