/*jshint esversion:6 */
const router = require('express').Router();
const Campground = require('../models/campground');
const upload = require('../middleware/upload');
const isLoggedIn = require('../middleware/isLoggedIn');
const isOwner = require('../middleware/isOwner');
const fs = require('fs');

let options = {
  campgrounds: '', 
  title:'',
  caption:'',
  link: '',
  linkCaption: ''
}
//Get camp grounds
router
  .get("/", (req, res, next) => {
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
  .get("/new", isLoggedIn, (req, res) => {
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
    console.log(req.file.filename)
      return Campground
        .create(req.body.campground)
          .then(result => {
            result.author.id = req.user._id;
            result.author.username = req.user.username;
            result.save();
            res.redirect(`${req.baseUrl}/${result._id}`);
          })
          .catch(err => {
            next(err);
          });
  })
  //Show camp
  .get("/:id", (req, res, next) => {
    return Campground
      .findById(req.params.id,{__v:false}).populate("comments").exec()
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
  .get('/:id/edit', isLoggedIn, isOwner(Campground), (req, res, next) => {
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
      .findByIdAndUpdate(req.params.id, req.body.campground)
        .then(result => {
          res.redirect(`${req.baseUrl}/${result._id}`);
        })
        .catch(err => {
          next(err);
        });
  })
  .delete('/:id', isLoggedIn, isOwner(Campground), (req, res, next) => {
    return Campground
      .findByIdAndRemove(req.params.id)
        .then(result => {
          fs.unlink(`./uploads/${result.image}`, err => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Successfully deleted ${result.image}`);
            }
          });
          res.redirect(req.baseUrl);
        })
        .catch(err => {
          next(err);
        });
  })

module.exports = router;