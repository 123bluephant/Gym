import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  permissions: [{ type: String }],
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
