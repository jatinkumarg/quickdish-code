const RecipeSearch = require('./RecipeSearch');

class RecipeAreaSearch extends RecipeSearch {
    // initialize recipe search
    initRecipeSearch(RecipeSearch) {
        this.RecipeSearch = RecipeSearch;
    }

    // search recipe by area
    search(recipeList, keyword) {
        return recipeList.filter(recipe => recipe.area.toLowerCase().includes(keyword.toLowerCase()));
    }
}

module.exports = RecipeAreaSearch;