import express from 'express';
import { body, param } from 'express-validator';
import {
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
} from '../controllers/userController.js';

const router = express.Router();

// Get a user by ID
router.get('/:id', [param('id').isMongoId().withMessage('Invalid user ID')], getUser);

// Update a user by ID
router.put(
    '/:id',
    [
        param('id').isMongoId().withMessage('Invalid user ID'),
        body('email').optional().isEmail().withMessage('Invalid email format'),
        body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    updateUser
);

// Delete a user by ID
router.delete('/:id', [param('id').isMongoId().withMessage('Invalid user ID')], deleteUser);

// Get all users
router.get('/', getAllUsers);

export const userRoutes = router;
