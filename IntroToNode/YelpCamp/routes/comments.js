  /*jshint esversion:6 */
const router = require('express').Router({mergeParams:true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');
// const isLoggedIn = require('../middleware/isLoggedIn');
const oidc = require('../middleware/oidc');
const isOwner = require('../middleware/isOwner');

router.use(oidc.ensureAuthenticated())

router
  .get('/', (req, res, next) => {
    res.redirect(`/campgrounds/${req.params.id}`)
  })
  //Post Comment
  .post('/', (req, res) => {
    if (req.body.comment.text.length == 0) {
      req.flash('warning', `Sorry, but comments cannot be empty`);
      return res.redirect('back');
    }
    return Comment
      .create(req.body.comment)
        .then( result => {
          result.author.id = req.userContext.userinfo.sub;
          result.author.name = req.userContext.userinfo.name
          result.discussion_id = req.params.id
          result.save()
        })
        .then(result => {
          req.flash('success', 'Your comments were posted')
          res.redirect(`/campgrounds/${req.params.id}`)
        })
        .catch(err =>{
            throw err;
        });
  })
  .get('/:cid/edit', isOwner(Comment), (req, res, next) => {
    return Comment
      .findById(req.params.cid)
        .then(result => {
          // console.log(result._id)
          res.render('comments/edit', {
            comment: result,
            title:"edit comment",
            caption: "edit comment",
            link: req.baseUrl.substring(0,req.baseUrl.lastIndexOf("/")),
            linkCaption: "Back",
            id: req.params.id
          })
        })
        .catch(err => {
          next(err);
        })
  })
  .put('/:cid', oidc.ensureAuthenticated(), isOwner(Comment), (req, res, next) => {
    return Comment
      .findOneAndUpdate({_id:req.params.cid}, req.body.comment)
        .then(result => {
          result.save();
          res.redirect('..');
        })
        .catch(err => {
          next(err);
        });
  })
  .delete('/:cid', oidc.ensureAuthenticated(), isOwner(Comment), (req, res, next) => {
    return Comment
      .findOneAndDelete({_id: req.params.cid})
        .then(comment => {
          req.flash('success', 'comment deleted');
          res.redirect(`/campgrounds/${req.params.id}`);
        })
        .catch(err => {
          next(err);
        });
  })

  module.exports = router;