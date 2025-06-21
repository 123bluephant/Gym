import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location:{
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fitnessGoals:{
    type: [String],
    required: true,
  },
  membershipPlan:{
    type: String,
    required: true,
  }
},{timestamps:true});

export default mongoose.model('User', UserSchema)
