import mongoose from "mongoose";


const userWorkoutProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  workoutId: { type: mongoose.Schema.Types.ObjectId, ref: "Workout", required: true },
  completedTasks: [
    {
      taskIndex: Number, 
      completedAt: Date
    }
  ],
  fullyCompleted: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model("UserWorkoutProgress", userWorkoutProgressSchema);
