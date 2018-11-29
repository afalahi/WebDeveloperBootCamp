  /*jshint esversion:6 */
const router = require('express').Router();
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const isLoggedIn = require('../middleware/isLoggedIn');

router.use(isLoggedIn)

router
  .get('/:id/new', (req, res)=>{
    res.render('comments/new' , {
      id: req.params.id,
      title:"Add new comment",
      caption: "Add comment",
      link: "/campgrounds",
      linkCaption: "Back to Campgrounds"
    });
  })
  //Post Comment
  .post('/:id', (req, res) => {
    return Comment
      .create(req.body.comment)
        .then( comment => {
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
  });

  module.exports = router;