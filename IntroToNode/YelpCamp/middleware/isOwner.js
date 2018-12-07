function isOwner(model){
  return function (req, res, next) {
    return model
      .findById(req.params.cid||req.params.id)
        .then(result => {
          if(result.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash('warning', `Sorry ${req.user.username} you don't have permissions to perform this action`);
            res.redirect(`/campgrounds/${req.params.id}`);
          }
        })
        .catch(err => {
          req.flash('danger', `Something went wrong: ${err.message}`);
          return next(err);
        });
  }
}
module.exports = isOwner