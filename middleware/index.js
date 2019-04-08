function requiresLogin(req, rest, next){
    if (req.session && req.session.user_id) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

function loggedOut(req, res, next) {
    if (req.session && req.session.userId) {
        return res.redirect('/profile');
    }
    return next();
}

module.exports.requiresLogin = requiresLogin;
module.exports.loggedOut = loggedOut;