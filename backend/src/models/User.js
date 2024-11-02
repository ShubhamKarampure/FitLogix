// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },

    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    meallog: { type: mongoose.Schema.Types.ObjectId, ref: 'MealLog' },
    fitnessGoals: { type: mongoose.Schema.Types.ObjectId, ref: 'FitnessGoals' },
    preferences: { type: mongoose.Schema.Types.ObjectId, ref: 'Preferences' },

    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
