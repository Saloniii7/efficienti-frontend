module.exports.isloggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnto = req.originalUrl
        req.flash('error', 'Please login first!')
        return res.redirect('/login')
    }

    next()
}