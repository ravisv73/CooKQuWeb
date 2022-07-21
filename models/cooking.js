import mongoose from "mongoose";

const cookingSchema = new mongoose.Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    groups: [
        {
            title: {type: String,},
            steps: 
            [
                {
                    step: {type: String, },
                    instruction: {type: String,},
                },
            ],
        }
    ],
}, {
    timestamps: true
});

const Cooking = mongoose.models.Cooking || mongoose.model('Cooking', cookingSchema);


export default Cooking;