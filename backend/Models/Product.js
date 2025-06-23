import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    description: String,
    price: Number,
    imageUrl: String,
    stock: Number,
    discount: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "GymOwner" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
