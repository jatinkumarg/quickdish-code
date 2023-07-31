const RecipeSort = require('./RecipeSort');

class RecipeAreaSort extends RecipeSort {
    // initialize recipe sort
    initRecipeSort(RecipeSort) {
        this.RecipeSort = RecipeSort;
    }
}

module.exports = RecipeAreaSort;