const mainView = (req, res) => {
    const dbLogger = req.app.locals.dbLogger;
    req.user.exec()
        .then(user => {
            // log user sign-in event
            dbLogger.log(`#${user?._id}: ${user?.name} just signed in.`);

            res.render("main", {
                user: user
            });
        })
        .catch(error => {
            console.log(error);
            dbLogger.log(`Error: user sign-in event.`);
        });
};

module.exports = {
    mainView,
};