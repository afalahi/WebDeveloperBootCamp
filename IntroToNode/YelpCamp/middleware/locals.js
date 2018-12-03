function locals(req, res, next) {
  res.locals.user =  req.user;
  // res.locals.flashError = req.flash('error');
  // res.locals.flashSuccess = req.flash('success');
  // res.locals.flashInfo = req.flash('info');
  // res.locals.flashWarning = req.flash('warning');
  // res.locals.flash = {
  //   info: req.flash('info'),
  //   error: req.flash('error'),
  //   success: req.flash('success'),
  //   warning: req.flash('warning')
  // }
  next();
}

module.exports = locals;