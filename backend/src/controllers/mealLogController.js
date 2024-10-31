import mongoose from 'mongoose';
import MealLog from '../models/MealLog.js'; 
import { validationResult } from 'express-validator'; 
import cloudinary from '../config/cloudinary.js';

// Create a new meal log
export const createMealLog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, mealType, mealDescription, calories, macronutrients } = req.body;
  const imageFile = req.file; // Assuming you are using multer for file uploads
console.log(req.body)
  // Check for required fields
  if (!userId || !mealType || !mealDescription || !calories || !macronutrients) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the mealType is valid
    const validMealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    if (!validMealTypes.includes(mealType)) {
      return res.status(400).json({ message: 'Invalid meal type' });
    }

    let imageUrl = null;

    // Upload image to Cloudinary if provided
    if (imageFile) {
      imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              return reject(new Error('Cloudinary upload error'));
            }
            resolve(result.secure_url);
          }
        );
        uploadStream.end(imageFile.buffer);
      });
    }

    // Create a new Meal Log
    const newMealLog = new MealLog({
      userId,
      mealType,
      mealDescription,
      calories,
      macronutrients,
      imageUrl,
    });

    // Save to the database
    const savedMealLog = await newMealLog.save();
    res.status(201).json({ message: 'Meal log created successfully', mealLog: savedMealLog });
  } catch (error) {
    console.error("Error creating meal log:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all meal logs
export const getAllMealLogs = async (req, res) => {
  try {
    const mealLogs = await MealLog.find().populate('userId', 'username'); // Populate user details
    res.status(200).json(mealLogs);
  } catch (error) {
    console.error("Error fetching meal logs:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a meal log by ID
export const getMealLogById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid meal log ID' });
  }

  try {
    const mealLog = await MealLog.findById(id).populate('userId', 'username');
    if (!mealLog) {
      return res.status(404).json({ message: 'Meal log not found' });
    }
    res.status(200).json(mealLog);
  } catch (error) {
    console.error("Error fetching meal log:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a meal log
export const updateMealLog = async (req, res) => {
  const { id } = req.params;
  const { mealType, mealDescription, calories, macronutrients } = req.body;
  const imageFile = req.file;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid meal log ID' });
  }

  try {
    const mealLog = await MealLog.findById(id);
    if (!mealLog) {
      return res.status(404).json({ message: 'Meal log not found' });
    }

    // Update fields
    if (mealType) mealLog.mealType = mealType;
    if (mealDescription) mealLog.mealDescription = mealDescription;
    if (calories) mealLog.calories = calories;
    if (macronutrients) mealLog.macronutrients = macronutrients;

    // Upload new image if provided
    if (imageFile) {
      const imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              return reject(new Error('Cloudinary upload error'));
            }
            resolve(result.secure_url);
          }
        );
        uploadStream.end(imageFile.buffer);
      });
      mealLog.imageUrl = imageUrl;
    }

    // Save updated meal log
    const updatedMealLog = await mealLog.save();
    res.status(200).json({ message: 'Meal log updated successfully', mealLog: updatedMealLog });
  } catch (error) {
    console.error("Error updating meal log:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a meal log
export const deleteMealLog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid meal log ID' });
  }

  try {
    const mealLog = await MealLog.findByIdAndDelete(id);
    if (!mealLog) {
      return res.status(404).json({ message: 'Meal log not found' });
    }
    res.status(200).json({ message: 'Meal log deleted successfully' });
  } catch (error) {
    console.error("Error deleting meal log:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
