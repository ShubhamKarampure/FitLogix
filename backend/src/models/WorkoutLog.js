import { Schema, model } from 'mongoose';

// Define the workout schema
const workoutSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    exercise: {
      type: String,
      required: true
    },
    sets: {
      type: Number,
      required: true
    },
    reps: {
      type: [Number], 
      required: true
    },
    weight: {
      type: [Number], 
      required: true
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps automatically
);

// Create a model for the workout log
const WorkoutLog = model('WorkoutLog', workoutSchema);

export default WorkoutLog;
