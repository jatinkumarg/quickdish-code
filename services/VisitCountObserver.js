class VisitCountObserver {
    constructor() {
        this.visitCount = 0;
    }

    // update visit count
    update(visitCount) {
        this.visitCount = visitCount;
    }

    // get visit count
    getVisitCount() {
        return this.visitCount;
    }
}

module.exports = VisitCountObserver;
