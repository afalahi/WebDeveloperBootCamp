function isOwner(model){
  return function (req, res, next) {
    return model
      .findById(req.params.cid||req.params.id)
        .then(result => {
          if(result.author.id.equals(req.user._id)) {
            next();
          } else {
            res.redirect(`/campgrounds/${req.params.id}`);
          }
        })
        .catch(err => {
          next(err);
        });
  }
}
module.exports = isOwner