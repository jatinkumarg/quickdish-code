class UserVisitsObserver {
    // initialize observers and visit count
    constructor() {
        this.observers = [];
        this.visitCount = 0;
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

    // notify observers with visit count
    notify() {
        this.observers.forEach(observer => observer.update(this.visitCount));
    }

    // add visit count
    addVisitCount(visitCount) {
        this.visitCount = visitCount;
        this.notify();
    }
}

module.exports = UserVisitsObserver;
