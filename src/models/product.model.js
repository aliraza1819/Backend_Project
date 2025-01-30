import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    image: { type: String, default: null },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
