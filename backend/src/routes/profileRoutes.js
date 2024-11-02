import express from 'express';
import multer from 'multer';
import { body, param } from 'express-validator';
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} from '../controllers/profileController.js';

// Set up Multer for file uploads
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

const router = express.Router();

// Create a new profile with avatar upload
router.post(
  '/',
  upload.single('avatar'), // Upload avatar image
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    body('weight').isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
    body('height').isFloat({ min: 0 }).withMessage('Height must be a positive number'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
  ],
  createProfile
);

// Get a profile by user ID
router.get('/:userId', 
  [param('userId').isMongoId().withMessage('Invalid user ID')],
  getProfile
);

// Update a profile by user ID
router.put(
  '/:userId',
  [
    param('userId').isMongoId().withMessage('Invalid user ID'),
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    body('weight').optional().isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
    body('height').optional().isFloat({ min: 0 }).withMessage('Height must be a positive number'),
    body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
  ],
  updateProfile
);

// Delete a profile by user ID
router.delete('/:userId', 
  [param('userId').isMongoId().withMessage('Invalid user ID')],
  deleteProfile
);

export const profileRoutes = router;
