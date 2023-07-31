const Recipe = require("../models/Recipe");

function getFoodRecipeViewCount(id) {
    const recipe = Recipe.findOne({ id: id });
    return recipe?.viewCount;
}

async function updateFoodRecipeViewCount(id) {
    const recipe = await Recipe.findOne({ id: id });
    if (recipe?.id) {
        recipe.viewCount += 1;
        await recipe.save();
    }
}

async function getFoodRecipe(id) {
    const recipe = await Recipe.findOne({ id: id });
    return recipe;
}

async function getFoodRecipes() {
    const recipes = await Recipe.find({});
    return recipes;
}

async function createRecipe(meal) {
    try {
        // check if recipe already exists in database
        const recipe = await getFoodRecipe(meal?.idMeal);
        if (recipe?.id) {
            await updateFoodRecipeViewCount(meal?.idMeal);
            return recipe;
        }
        // create new recipe
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal['strIngredient' + i];
            const measure = meal['strMeasure' + i];
            if (ingredient && measure) {
                ingredients.push({ name: ingredient, measure: measure });
            }
        }
        const newRecipe = new Recipe({
            id: meal.idMeal,
            name: meal.strMeal,
            category: meal.strCategory,
            area: meal.strArea,
            instructions: meal.strInstructions,
            imageLink: meal.strMealThumb,
            ingredients: ingredients,
            viewCount: 0,
        });
        await newRecipe.save();
        return newRecipe;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}

async function getMostViewedRecipes() {
    // query to sort recipes by number of views by most viewed
    const result = await Recipe.aggregate([
        {
            $group: {
                _id: '$id',
                totalCounts: { $sum: '$viewCount' },
            },
        },
        {
            $sort: { totalCounts: -1 },
        },
        {
            $lookup: {
                from: 'recipes',
                localField: '_id',
                foreignField: 'id',
                as: 'recipeData',
            },
        }
    ]);

    return result;
}

module.exports = {
    getFoodRecipeViewCount, createRecipe, getMostViewedRecipes, getFoodRecipes
}