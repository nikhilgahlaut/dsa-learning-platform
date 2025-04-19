# DSA Learning Platform

A comprehensive platform for learning Data Structures and Algorithms, featuring topic-wise organization, progress tracking, and curated resources.

## Features

- Topic-wise organization of DSA problems
- Progress tracking for completed problems
- Difficulty-based filtering
- Resource links (LeetCode, YouTube tutorials, articles)
- User authentication
- Responsive design

## Tech Stack

- **Frontend:**
  - React
  - Tailwind CSS
  - React Router
  - React Icons

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dsa-learning-platform.git
cd dsa-learning-platform
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Start the development servers:
```bash
# Start backend server (from server directory)
npm run dev

# Start frontend server (from client directory)
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Deployment

- Frontend is deployed on Vercel
- Backend is deployed on Render
- Database is hosted on MongoDB Atlas

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 