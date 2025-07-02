import mongoose from "mongoose";

const foodEntrySchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  category: { type: String },
  per100g: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    fiber: Number,
    sugar: Number,
  },
  servings: { type: Number, required: true },
  calculated: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    fiber: Number,
    sugar: Number,
  }
}, { _id: false });

const dailyFoodLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true }, // store one log per date

  meals: {
    breakfast: [foodEntrySchema],
    lunch: [foodEntrySchema],
    dinner: [foodEntrySchema],
    snacks: [foodEntrySchema],
  },

  totalCalories: { type: Number, default: 0 },
  totalProtein: { type: Number, default: 0 },
  totalCarbs: { type: Number, default: 0 },
  totalFats: { type: Number, default: 0 },

}, { timestamps: true });

export default mongoose.model("DailyFoodLog", dailyFoodLogSchema);
