import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fats: {
    type: Number,
    required: true,
  },
  fiber: {
    type: Number,
    required: true,
  },
  sugar: {
    type: Number,
    required: true,
  },
  serving: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'fruits',
      'vegetables',
      'grains',
      'proteins',
      'dairy',
      'nuts',
      'beverages',
      'snacks',
      'meals',
      'fast-food',
    ],
  },
}, {
  timestamps: true,
});

export default mongoose.model('FoodItem', foodItemSchema);
