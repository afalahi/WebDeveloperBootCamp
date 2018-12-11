  /*jshint esversion:6 */
const router = require('express').Router({mergeParams:true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const isLoggedIn = require('../middleware/isLoggedIn');
const isOwner = require('../middleware/isOwner');

router.use(isLoggedIn)

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
        .then( comment => {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save()
          return Campground
            .findById(req.params.id)
              .then(campground => {
                campground.comments.push(comment);
                campground.save();
                req.flash('success', 'Your comments were posted')
                res.redirect(`/campgrounds/${req.params.id}`)
              })
              .catch(err =>{
                  throw err;
              });
        })
        .catch(err =>{
            throw err;
        });
  })
  .get('/:cid/edit',isOwner(Comment), (req, res, next) => {
    return Comment
      .findById(req.params.cid)
        .then(result => {
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
  .put('/:cid',isLoggedIn, isOwner(Comment), (req, res, next) => {
    return Comment
      .findOneAndUpdate(req.params.cid, req.body.comment)
        .then(result => {
          result.save();
          res.redirect('..');
        })
        .catch(err => {
          next(err);
        });
  })
  .delete('/:cid', isLoggedIn, isOwner(Comment), (req, res, next) => {
    return Comment
      .findOneAndRemove(req.params.cid)
        .then(comment => {
          return Campground
            .findOneAndUpdate(req.params.id, {$pull: {comments: comment._id}})
              .then(result => {
                req.flash('success' , 'comment deleted');
                res.redirect(`/campgrounds/${req.params.id}`);
              })
              .catch(err => {
                next(err);
              });
        })
        .catch(err => {
          next(err);
        });
  })

  module.exports = router;