// models/Profile.js
import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true},
  age: { type: Number, min: 0 },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
});

export default mongoose.model('Profile', ProfileSchema);
