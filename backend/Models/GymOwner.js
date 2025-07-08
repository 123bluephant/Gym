import mongoose from "mongoose";

const gymOwnerSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    gymName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    dob: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    bio: { type: String },
    established: { type: String },
    hours: { type: String },

    membershipPlans: [
      {
        name: String,
        price: String,
        features: [String],
      },
    ],
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
    },

    role: {
      type: String,
      default: "gym_owner",
    },
    allmembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    activeMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    workoutsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
    dietPlansCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "DietPlan" }],
    productsPublished: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export default mongoose.model("GymOwner", gymOwnerSchema);
