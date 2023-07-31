class RecipeSort {
    // initialize recipe sort
    initRecipeSort(RecipeSort) {
        this.RecipeSort = RecipeSort;
    }

    // sort recipe list
    sort(recipeList, field, order = 'asc') {
        if (recipeList?.length == 0) {
            return [];
        }

        return recipeList.sort((a, b) => {
            const aVal = a[field]?.toLowerCase();
            const bVal = b[field]?.toLowerCase();
            return order === 'asc' ? compareString(aVal, bVal) : -compareString(aVal, bVal);
        });
    }
}

// compare string
function compareString(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

module.exports = RecipeSort;
