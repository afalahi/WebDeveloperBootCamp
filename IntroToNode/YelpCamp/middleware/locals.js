function locals(req, res, next) {
  res.locals.user = req.userContext;
  res.locals.title = "Yelp Camp"
  res.locals.caption = req.path.substr(1)
  res.locals.linkCaption = "Back"
  res.locals.link = "/"
  next();
}
module.exports = locals;