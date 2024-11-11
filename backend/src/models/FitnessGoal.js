const mongoose = require('mongoose');

// Define FitnessGoal Schema
const fitnessGoalSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referring to the User model
    required: true
  },
  goalType: {
    type: String,
    required: true,
    enum: ['Weight Loss', 'Strength', 'Endurance', 'Flexibility', 'Muscle Gain'],
  },
  targetValue: {
    type: Number,
    required: true,  // Target goal value (e.g., weight in kg, max reps, etc.)
  },
  currentValue: {
    type: Number,
    required: true,  // Current progress value
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,  // Progress percentage (0 - 100)
  },
  status: {
    type: String,
    enum: ['In Progress', 'Completed', 'Failed'],
    default: 'In Progress',
  },
});

const FitnessGoal = mongoose.model('FitnessGoal', fitnessGoalSchema);

module.exports = FitnessGoal;
