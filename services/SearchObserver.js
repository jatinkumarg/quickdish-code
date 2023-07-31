class SearchObserver {
    // initialize observers and search keyword list
    constructor() {
        this.observers = [];
        this.searchKeywordList = [];
    }

    // attach observer
    attach(observer) {
        this.observers.push(observer);
    }

    // detach observer
    detach(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    // notify observers with search keyword list
    notify() {
        this.observers.forEach(observer => observer.update(this.searchKeywordList));
    }

    // add keyword to search keyword list
    addSearchKeyword(keyword) {
        this.searchKeywordList.push(keyword);
        this.notify();
    }
}

module.exports = SearchObserver;
