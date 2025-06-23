import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  duration: Number, 
  goal: String,
  equipment: [String],
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"]
  },
  tasks: [
    {
      title: String,
      duration: Number,
      description: String
    }
  ],

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "GymOwner" },
  stats: {
    completions: { type: Number, default: 0 }
  }
}, { timestamps: true });

export default mongoose.model("Workout", workoutSchema);
