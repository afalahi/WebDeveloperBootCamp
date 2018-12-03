  /*jshint esversion:6 */
const router = require('express').Router({mergeParams:true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const isLoggedIn = require('../middleware/isLoggedIn');
const isOwner = require('../middleware/isOwner');

router.use(isLoggedIn)

router
  .get('/new', (req, res) => {
    res.render('comments/new' , {
      id: req.params.id,
      title:"Add new comment",
      caption: "Add comment",
      link: "/campgrounds",
      linkCaption: "Back to Campgrounds"
    });
  })
  //Post Comment
  .post('/', (req, res) => {
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
      .findByIdAndUpdate(req.params.cid, req.body.comment)
        .then(result => {
          result.save()
          res.redirect('..')
        })
        .catch(err => {
          next(err);
        });
  })
  .delete('/:cid', isLoggedIn, isOwner(Comment), (req, res, next) => {
    return Comment
      .findOneAndRemove(req.params.cid)
        .then(results => {
          console.log(req.originalUrl)
          res.redirect(`/campgrounds/${req.params.id}`);
        })
        .catch(err => {
          next(err);
        });
  })

  module.exports = router;