import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authRoutes from './routes/auth.js';
import { router as dsaRoutes } from './routes/dsaRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Add CLIENT_URLS array for CORS origins (supports comma-separated list)
const CLIENT_URLS = process.env.CLIENT_URLS
  ? process.env.CLIENT_URLS.split(',')
  : [process.env.CLIENT_URL || 'http://localhost:5173'];

// CORS configuration
app.use(cors({
    origin: CLIENT_URLS,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'DSA Learning Platform API is running.' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dsa', dsaRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa-platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 