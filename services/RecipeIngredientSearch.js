const RecipeSearch = require('./RecipeSearch');

class RecipeIngredientSearch extends RecipeSearch {
    // initialize recipe search
    initRecipeSearch(RecipeSearch) {
        this.RecipeSearch = RecipeSearch;
    }

    // search recipe by ingredient
    search(recipeList, keyword) {
        return recipeList.filter(recipe => recipe?.ingredients[0]?.name.toLowerCase().includes(keyword.toLowerCase()));
    }
}

module.exports = RecipeIngredientSearch;
