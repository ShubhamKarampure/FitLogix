import express from 'express';
import multer from 'multer';
import {
  createMealLog,
  getAllMealLogs,
  getMealLogById,
  updateMealLog,
  deleteMealLog
} from '../controllers/mealLogController.js';
import { body, param } from 'express-validator';

const router = express.Router();
const upload = multer(); 

// Validation rules for meal logs
const mealLogValidation = [
  body('userId').isMongoId().withMessage('User ID must be a valid MongoDB ID'),
  body('mealType').isIn(['Breakfast', 'Lunch', 'Dinner', 'Snack']).withMessage('Invalid meal type'),
  body('mealDescription').notEmpty().withMessage('Meal description is required'),
  body('calories').isNumeric().withMessage('Calories must be a number'),
  body('macronutrients').notEmpty().withMessage('Macronutrients are required'),
];

// Meal Log routes
router.post('/', upload.single('image'), mealLogValidation, createMealLog);
router.get('/', getAllMealLogs);
router.get('/:id', [param('id').isMongoId().withMessage('Invalid meal log ID')], getMealLogById);
router.put('/:id', upload.single('image'), mealLogValidation.concat([param('id').isMongoId().withMessage('Invalid meal log ID')]), updateMealLog);
router.delete('/:id', [param('id').isMongoId().withMessage('Invalid meal log ID')], deleteMealLog);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

export const mealLogRoutes = router;
