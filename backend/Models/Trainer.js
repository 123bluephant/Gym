// models/Trainer.ts or Trainer.js
import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    image: { type: String },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    experience: { type: Number, required: true },
    currentClients: { type: Number, default: 0 },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Available", "Unavailable"],
      required: true,
    },
    specializations: [{ type: String }],
    bio: { type: String },
    gymOwner: { type: mongoose.Schema.Types.ObjectId, ref: "GymOwner" },
  },
  { timestamps: true }
);

export default mongoose.model("Trainer", trainerSchema);
