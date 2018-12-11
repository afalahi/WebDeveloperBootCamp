function locals(req, res, next) {
  res.locals.user =  req.user;
  res.locals.title = "Yelp Camp"
  next();
}
module.exports = locals;