# ConvoX – Real-Time Chat & Social Platform

**ConvoX** is a modern full-stack social chat application built with **Node.js**, **Express**, **MongoDB**, and **React**. It provides a seamless communication experience featuring real-time chat, video calling, and a friends system, all wrapped in a sleek, customizable UI.

---

## 🚀 Key Features

- 🔐 **Authentication with JWT** – Secure signup/login flows using JSON Web Tokens.
- 📄 **Onboarding Flow** – Guided user experience from signup to full access.
- 👥 **Friends System** – Add, remove, and manage your connections.
- 💬 **Real-Time Chat** – Instant messaging powered by WebSockets.
- 📹 **Video Calling** – Peer-to-peer video communication with integrated WebRTC.
- 🎨 **32 UI Themes** – Personalized interface with extensive theme options.
- 🚨 **Protected Routes** – Role-based access control and route guarding.
- 🛠️ **Custom Hooks & Best Practices** – Clean, maintainable, and reusable code architecture.
- 🧪 **API Testing** – Built-in tools and scripts for testing backend endpoints.

---

## 🛠️ Tech Stack

| Layer        | Technologies                     |
|--------------|----------------------------------|
| Frontend     | React, Tailwind CSS, TanStack Query |
| Backend      | Node.js, Express                 |
| Database     | MongoDB                          |
| Auth         | JWT-based authentication         |

---

## 📁 Project Structure

```bash
convox/
├── frontend/                 # Frontend (React)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── constants/        # important constants
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page-level components
│   │   ├── lib/              # API service handlers
│   │   ├── store/            # Theme management
│   │   └── App.tsx
│   ├── .env                  # Environment variables
│   └── tailwind.config.js    # Tailwind CSS configuration
│
├── backend/                  # Backend (Node.js + Express)
│   ├── src/                  
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Auth and error handling
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API endpoints
│   │   ├── lib/              # Utility functions
│   │   └── server.js         # Entry point
│   ├── .env                  # Environment variables
├── package.json              # Project dependencies
└── .gitignore
```
## 🚀 Getting Started

### 1️⃣ Clone the Repository

bash  
git clone https://github.com/ymshreyas/ConvoX.git  
cd ConvoX

### 2️⃣ Install Dependencies
#### Frontend
cd frontend  
npm install
#### Backend
cd backend  
npm install

### 3️⃣ Configure Environment Variables
#### backend 
PORT = 5000  
MONGODB_URI = your_mongodb_connection_string  
STREAM_API_KEY = your_stream_api_key  
STREAM_API_SECRET = your_stream_api_secret  
CLIENT_URL = http://localhost:5173  
JWT_SECRET_KEY = your_jwt_secret  

#### frontend
VITE_STREAM_API_KEY = your_vite_stream_api_key


### 4️⃣ Run the Development Server
#### Frontend
cd frontend    
npm run dev
#### Backend
cd backend  
npm run dev

Open http://localhost:3000 in your browser to see the application.

## 📈 Future Enhancements
 - 🧠 AI Chat Integration – Smart assistant to help with replies and suggestions.
 - 🌐 Multilingual Support – Global accessibility through language localization.
 - 📱 Mobile App – Native Android and iOS applications.
 - 🔔 Push Notifications – Real-time alerts across devices.
