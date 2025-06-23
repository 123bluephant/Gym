import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  dob: {
    type: String, // you can use Date if needed
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  fitnessGoals: {
    type: [String],
    required: true,
  },
  periodTrackingOptIn: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "gym_owner", "admin"],
    default: "user",
  },
  membershipPlan: {
    type: String,
    required: false,  
  },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
