import mongoose from "mongoose";

const foodEntrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    per100g: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fats: Number,
      fiber: Number,
      sugar: Number,
    },
    servings: { type: Number, default: 1 },
    calculated: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fats: Number,
      fiber: Number,
      sugar: Number,
    },
  },
);

const dailyFoodPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weekStartDate: { type: Date, required: true },  
  plan: {
    Monday: {
      Breakfast: [foodEntrySchema],
      Lunch: [foodEntrySchema],
      Dinner: [foodEntrySchema],
    },
    Tuesday: {
      Breakfast: [foodEntrySchema],
      Lunch: [foodEntrySchema],
      Dinner: [foodEntrySchema],
    },
    Wednesday: {
      Breakfast: [foodEntrySchema],
      Lunch: [foodEntrySchema],
      Dinner: [foodEntrySchema],
    },
    Thursday: {
      Breakfast: [foodEntrySchema],
      Lunch: [foodEntrySchema],
      Dinner: [foodEntrySchema],
    },
    Friday: {
      Breakfast: [foodEntrySchema],
      Lunch: [foodEntrySchema],
      Dinner: [foodEntrySchema],
    },
    Saturday: {
      Breakfast: [foodEntrySchema],
      Lunch: [foodEntrySchema],
      Dinner: [foodEntrySchema],
    },
    Sunday: {
      Breakfast: [foodEntrySchema],
      Lunch: [foodEntrySchema],
      Dinner: [foodEntrySchema],
    },
  },

}, { timestamps: true });

const dailyFoodLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },

    meals: {
      breakfast: [foodEntrySchema],
      lunch: [foodEntrySchema],
      dinner: [foodEntrySchema],
      snacks: [foodEntrySchema],
    },
    bmi: { type: Number, default: 0 },
    totalGoalCalories: { type: Number },
    totalCalories: { type: Number, default: 0 },
    totalProtein: { type: Number, default: 0 },
    totalCarbs: { type: Number, default: 0 },
    totalFats: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const DailyPlan = mongoose.model("DailyPlan", dailyFoodPlanSchema);
const DailyFoodLog = mongoose.model("DailyFoodLog", dailyFoodLogSchema);

export { DailyPlan, DailyFoodLog };
