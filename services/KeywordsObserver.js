class KeywordsObserver {
    // initialize search keyword list
    constructor() {
        this.searchKeywordList = [];
    }

    // update search keyword list
    update(searchKeywordList) {
        this.searchKeywordList = searchKeywordList;
    }

    // get search keyword list
    getSearchKeywordList() {
        return this.searchKeywordList;
    }
}

module.exports = KeywordsObserver;


