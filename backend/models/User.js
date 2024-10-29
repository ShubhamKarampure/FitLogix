// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    jwtToken: { type: String },

    // Linking other models
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    fitnessGoals: { type: mongoose.Schema.Types.ObjectId, ref: 'FitnessGoals' },
    preferences: { type: mongoose.Schema.Types.ObjectId, ref: 'Preferences' },

    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
