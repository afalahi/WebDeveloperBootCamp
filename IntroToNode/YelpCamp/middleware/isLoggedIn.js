function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('danger', 'You need to be logged in to perform this action');
  req.session.returnTo = req.originalUrl;
  res.redirect('/auth/login');
}
module.exports = isLoggedIn;