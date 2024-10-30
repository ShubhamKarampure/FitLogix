import express from 'express';
import multer from 'multer';
import { createProfile } from '../controllers/profileController.js';

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

const router = express.Router();

router.post('/setup', upload.single('avatar'), createProfile);

export const profileRoutes = router;
