import mongoose, { Model, Schema } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    images: [{ type: String, required: true }],
});

const Product = mongoose.model("Product", productSchema);
export { Product };
