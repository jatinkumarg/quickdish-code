const checkRoute = (req, res, next) => {
    try {
        // check if user is authenticated
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/signin');
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

module.exports = {
    checkRoute,
};