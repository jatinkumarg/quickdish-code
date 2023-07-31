const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    area: {
        type: String,
    },
    instructions: {
        type: String,
    },
    imageLink: {
        type: String,
    },
    ingredients: [
        {
            name: { type: String },
            measure: { type: String }
        }
    ],
    viewCount: {
        type: Number,
        default: 0,
    }
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;