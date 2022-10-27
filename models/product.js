import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    recipeSlug: { type: String, required: true },
    masalaRecipeSlug: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    image: { type: String, required: true },
    recipe_url: { type: String, required: true },
    price: { type: String, required: true },
    cuisine: { type: String, required: true },
    rating: { type: String, required: true, default: 0 },
    numReviews: { type: String, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    status: { type: String, required: true, default: "Not Available" },
    description: { type: String, required: true },
    version: { type: Number, required: true },
    release: { type: String, required: true },
    releaseStatus: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
