import express from 'express';
import { getUser } from '../controllers/userController.js';
const router = express.Router();

// Route to get a user by ID
router.get('/:id', getUser);

export const userRoutes = router;
