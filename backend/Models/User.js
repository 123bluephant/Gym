import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    dob: { type: String, required: true },
    height: { type: Number},
    weight: { type: Number},
    location: { type: String},
    fitnessGoals: { type: [String]},
    periodTrackingOptIn: { type: Boolean, default: false },
    Primarygoal:{ type: String},
    role: {
      type: String,
      default: "user",
    },
    weeklyAvaliable:{
      type:String
    },
    targetWeight:{ type: String},
    membershipPlan: { type: String },
    streak: { type: Number, default: 0 },
    joinDate: { type: Date },
    endDate: { type: Date },
    assignedWorkouts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Workout" },
    ],
    assignedDietPlans: [
      { type: mongoose.Schema.Types.ObjectId, ref: "DietPlan" },
    ],
    purchasedItems: [
      {
        dobproductId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        purchasedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
