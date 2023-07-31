const RecipeSearch = require('./RecipeSearch');
class RecipeNameSearch extends RecipeSearch {
    // initialize recipe search
    initRecipeSearch(RecipeSearch) {
        this.RecipeSearch = RecipeSearch;
    }
}

module.exports = RecipeNameSearch;
