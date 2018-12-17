/*jshint esversion:6 */
const router = require('express').Router();
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const upload = require('../middleware/upload');
const isLoggedIn = require('../middleware/isLoggedIn');
const isOwner = require('../middleware/isOwner');
const clsFLash = require('../middleware/clsFlash');
const fs = require('fs');

let options = {
  campgrounds: '', 
  caption:'',
  link: '',
  linkCaption: ''
}
//Get camp grounds
router
  .get("/", clsFLash, (req, res, next) => {
    return Campground
      .find({})
        .then(result => {
          options.campgrounds = result;
          options.title = 'Campgrounds';
          options.caption = 'View our amazing campgrounds from all over the world';
          options.link = `${req.baseUrl}/new`;
          options.linkCaption = 'Add new campgrounds';
          res.render("campgrounds/index", options);
        })
        .catch(err => {
          next(err);
        });
  })
  //Display form for adding new campground
  .get("/new", isLoggedIn, clsFLash, (req, res) => {
    res.render("campgrounds/new", {
      title:'New Camp',
      caption:'Add New Campgrounds',
      link: req.baseUrl,
      linkCaption: 'Back to Campgrounds'
    });
  })
  //create new camp
  .post("/", isLoggedIn, upload.single('image'), (req, res, next) => {
    req.body.campground.image = `/${req.file.filename}`;
      return Campground
        .create(req.body.campground)
          .then(result => {
            result.author = req.user._id;
            result.save();
            req.flash('success', "Your campground was published");
            res.redirect(`${req.baseUrl}/${result._id}`);
          })
          .catch(err => {
            req.flash('danger', `${err}`);
            next(err);
          });
  })
  //Show camp
  .get("/:id", clsFLash, (req, res, next) => {
    return Campground
      .findById(req.params.id, {__v:false})
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            model: 'User'
          }
        })
        .populate('author')
          .exec()
            .then(result => {
              res.render("campgrounds/show", {
                campground:result,
                title:result.name,
                caption: `You're currently viewing ${result.name}`,
                link: req.baseUrl,
                linkCaption: "Back to Campgrounds"
              });
            })
            .catch(err => {
              next(err);
            });
  })
  .get('/:id/edit', isLoggedIn, isOwner(Campground), clsFLash, (req, res, next) => {
    return Campground
      .findById(req.params.id)
        .then(result => {
          res.render('campgrounds/edit', {
            campground: result,
            title: result.name,
            caption: `Editing ${result.name}`,
            link: `${req.baseUrl}/${req.params.id}`,
            linkCaption: 'Go back'
          });
        })
        .catch(err => {
          next(err);
        });
  })
  .put('/:id', isLoggedIn, isOwner(Campground), upload.single('image'), (req, res, next) => {
    if (req.file) {
      req.body.campground.image = `/${req.file.filename}`;
    }
    return Campground
      .findOneAndUpdate({_id: req.params.id}, req.body.campground)
        .then(result => {
          req.flash('success', 'your edits were published');
          res.redirect(`${req.baseUrl}/${result._id}`);
        })
        .catch(err => {
          next(err);
        });
  })
  .delete('/:id', isLoggedIn, isOwner(Campground), (req, res, next) => {
    return Campground
      .findOneAndDelete({_id: req.params.id})
        .then(result => {
          fs.unlink(`./uploads/${result.image}`, err => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Successfully deleted ${result.image}`);
            }
          });
          return result
        })
        .then(result => {
          return Comment
            .find({discussion_id: result._id})
              .then(result => {
                result.forEach(comment => {
                  comment.remove();
                });
              })
              .catch(err => {
                next(err);
              });
        })
        .then(result => {
          req.flash('success', 'deleted campground');
          res.redirect(req.baseUrl);
        })
        .catch(err => {
          next(err);
        });
  })
module.exports = router;