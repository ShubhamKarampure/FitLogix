// src/routes/authRoutes.js
import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, checkAuth, logoutUser } from '../controllers/authController.js';

const router = express.Router();

// Validation rules for registration
const registrationValidation = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Validation rules for login
const loginValidation = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').exists().withMessage('Password is required'),
];

// Registration route
router.post('/register', registrationValidation, registerUser);

// Login route
router.post('/login', loginValidation, loginUser);

// Check authentication route
router.get('/status', checkAuth);

// Logout route
router.post('/logout', logoutUser); 

export const authRoutes = router;
