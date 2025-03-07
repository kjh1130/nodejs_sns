exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('Log in is needed');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('Logged in');
        res.redirect(`/?error=${message}`);
    }
};