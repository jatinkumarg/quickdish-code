const { updateVisitorCount } = require("../methods/Misc");

const aboutView = async (req, res) => {
    const visitCountObserver = req.app.locals.visitCountObserver;
    const userVisitsObserver = req.app.locals.userVisitsObserver;

    // update visitor count in db
    const result = await updateVisitorCount();
    const visitCounter = result?.visitorCount;
    console.log('Visitor count updated:', visitCounter);

    // update observer visit count
    userVisitsObserver.addVisitCount(visitCounter);
    const visitCount = visitCountObserver.getVisitCount();
    console.log('Observer visit count:', visitCount);

    const user = await req?.user;
    res.render("about", { user: user, visitCount: visitCount });
};

module.exports = {
    aboutView,
};