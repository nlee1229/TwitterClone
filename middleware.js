exports.requireLogin = (req, res, next) => {
    if (req.session && req.session.user) { // checking if this session property is set & if user property is set. If both are set, then user is logged in 
        return next(); // carry on and do the next step in the cycle. If it hits next(), it will then fire the app.js function and go to home page
    }
    else {
        return res.redirect('/login');
    }
}