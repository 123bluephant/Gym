import mongoose from "mongoose";

const dietPlanSchema = new mongoose.Schema(
  {
    title: String,
    goal: String,
    bodyType: [String], 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "GymOwner" },

    meals: [
      {
        name: String,
        items: [String],
        calories: Number,
        macros: {
          protein: Number,
          carbs: Number,
          fats: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("DietPlan", dietPlanSchema);
