const RecipeSort = require('./RecipeSort');

class RecipeIngredientSort extends RecipeSort {
    // initialize recipe sort
    initRecipeSort(RecipeSort) {
        this.RecipeSort = RecipeSort;
    }
}

module.exports = RecipeIngredientSort;