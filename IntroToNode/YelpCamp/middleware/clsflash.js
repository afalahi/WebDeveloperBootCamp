module.exports = function(req, res, next) {
  if (req.session.flash == 'undefined'){
    req.session.flash = req.flash()
    return next()
  }
  req.session.flash = []
  next()
}