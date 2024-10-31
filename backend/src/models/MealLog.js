import mongoose from 'mongoose';
const mealLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user who logged the meal
    required: true,
    ref: 'User' 
  },
  mealType: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], 
    required: true
  },
  mealDescription: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  macronutrients: {
    protein: {
      type: Number,
      required: true
    },
    carbohydrates: {
      type: Number,
      required: true
    },
    fats: {
      type: Number,
      required: true
    }
  },
  imageUrl: {
    type: String,
    required: false 
  },
  dateLogged: {
    type: Date,
    default: Date.now 
  }
});

export default mongoose.model('MealLog', mealLogSchema);

