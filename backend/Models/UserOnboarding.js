const mongoose = require("mongoose");

const userOnboardingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 13,
    max: 120,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  fitnessGoals: [
    {
      type: String,
      enum: [
        "Lose Weight",
        "Build Muscle",
        "Stay Fit & Active",
        "Try New Gyms",
        "Improve Stamina",
        "Learn Group Workouts",
        "De-Stress from Work",
      ],
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
userOnboardingSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("UserOnboarding", userOnboardingSchema);