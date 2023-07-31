const RecipeSearch = require('./RecipeSearch');

class RecipeCategorySearch extends RecipeSearch {
    // initialize recipe search
    initRecipeSearch(RecipeSearch) {
        this.RecipeSearch = RecipeSearch;
    }

    // search recipe by category
    search(recipeList, keyword) {
        return recipeList.filter(recipe => recipe.category.toLowerCase().includes(keyword.toLowerCase()));
    }
}

module.exports = RecipeCategorySearch;