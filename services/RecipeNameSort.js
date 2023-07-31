const RecipeSort = require('./RecipeSort');

class RecipeNameSort extends RecipeSort {
    // initialize recipe sort
    initRecipeSort(RecipeSort) {
        this.RecipeSort = RecipeSort;
    }
}

module.exports = RecipeNameSort;
