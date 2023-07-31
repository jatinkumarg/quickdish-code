class RecipeSearch {
    // initialize recipe search
    initRecipeSearch(RecipeSearch) {
        this.RecipeSearch = RecipeSearch;
    }

    // search recipe by name
    search(recipeList, keyword) {
        return recipeList.filter(recipe => recipe.name.toLowerCase().includes(keyword.toLowerCase()));
    }
}

module.exports = RecipeSearch;
