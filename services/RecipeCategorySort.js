const RecipeSort = require('./RecipeSort');

class RecipeCategorySort extends RecipeSort {
    // initialize recipe sort
    initRecipeSort(RecipeSort) {
        this.RecipeSort = RecipeSort;
    }
}

module.exports = RecipeCategorySort;