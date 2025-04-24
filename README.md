# 🚀 DSA Learning Platform

A comprehensive and user-friendly platform to learn and practice **Data Structures & Algorithms (DSA)**. Organized topic-wise with progress tracking, difficulty filters, and curated resources to enhance your learning journey.

---

## ✨ Features

- ✅ Topic-wise DSA problem categorization  
- 📈 User progress tracking  
- 🎯 Filter problems by difficulty (Easy, Medium, Hard)  
- 📚 Curated resource links (LeetCode, YouTube tutorials, articles)  
- 🔐 Secure user authentication using JWT  
- 📱 Responsive UI for all screen sizes  

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js  
- Tailwind CSS  
- React Router  
- React Icons  

### 🔹 Backend
- Node.js  
- Express.js  
- MongoDB (via MongoDB Atlas)  
- JWT for Authentication  

---

## ⚙️ Getting Started

### 📋 Prerequisites

- Node.js (v14+)
- MongoDB
- npm or yarn

---

### 🧩 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/dsa-learning-platform.git
cd dsa-learning-platform

## Environment Variables

### Backend
Create a `.env` file in the `server/` directory with:
```bash
MONGODB_URI=<your MongoDB connection string>
JWT_SECRET=<your JWT secret>
CLIENT_URLS=http://localhost:5173,https://your-netlify-app.netlify.app
PORT=5000
```

### Frontend
Create a `.env` file in the `client/` directory with:
```bash
VITE_API_URL=https://your-render-app.onrender.com
```
