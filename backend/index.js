import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRoutes } from './src/routes/authRoutes.js';
import { userRoutes } from './src/routes/userRoutes.js';
import { profileRoutes } from './src/routes/profileRoutes.js';
import { mealLogRoutes } from './src/routes/mealLogRoutes.js';
import { verifyToken } from './src/middleware/authMiddleware.js';

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL, // Your frontend URL, e.g., 'http://localhost:5173'
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'], // Allowed methods
};

// Middleware setup
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Define your routes
app.use('/api/v1/auth', authRoutes); // Authentication routes for login/register
app.use('/api/v1/users', verifyToken, userRoutes); // General user management
app.use('/api/v1/profile', verifyToken, profileRoutes); // Profile actions for the authenticated user
app.use('/api/v1/meals', verifyToken, mealLogRoutes); // Meal logging for the authenticated user

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
