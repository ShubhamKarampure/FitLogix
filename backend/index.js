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


// Middleware setup

app.use(cookieParser());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Define your routes
app.use('/api/v1/auth', authRoutes); // Authentication routes for login/register
app.use('/api/v1/users', verifyToken, userRoutes); // General user management
app.use('/api/v1/profile', verifyToken, profileRoutes); // Profile actions for the authenticated user
app.use('/api/v1/meals', verifyToken, mealLogRoutes); // Meal logging for the authenticated user

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

export default app;

