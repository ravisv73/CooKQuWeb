import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    unit: {type: String,  required: true},
    description: {type: String, required: true},
  });

//const Ingredient = mongoose.models.Ingredient || mongoose.model('Ingredient', ingredientSchema);


const masalaRecipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    category: {type: String, required: true},
    servings: {type: Number, required: true},
    meatWeight: {type: Number, required: true},
    riceWeight: {type: Number, required: true},
    weightUnit: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    ingredients: [ingredientSchema],
}, {
    timestamps: true
});

const MasalaRecipe = mongoose.models.MasalaRecipe || mongoose.model('MasalaRecipe', masalaRecipeSchema);


export default MasalaRecipe;