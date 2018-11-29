/*jshint esversion:6 */
const router = require('express').Router();
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const upload = require('../middleware/upload');
const isLoggedIn = require('../middleware/isLoggedIn');

router.use(isLoggedIn)

let options = {
  campgrounds: '', 
  title:'',
  caption:'',
  link: '',
  linkCaption: ''
}
//Get camp grounds
router
  .get("/", (req, res) => {
    return Campground
      .find({})
        .then(result => {
          options.campgrounds = result
          options.title = 'Campgrounds'
          options.caption = 'View our amazing campgrounds from all over the world'
          options.link = `${req.baseUrl}/new`
          options.linkCaption = 'Add new campgrounds'
          res.render("campgrounds/index", options);
        })
        .catch(err => {
          throw err;
        });
  })
  //Display form for adding new campground
  .get("/new", (req, res) => {
    res.render("campgrounds/new", {
      title:'New Camp',
      caption:'Add New Campgrounds',
      link: req.baseUrl,
      linkCaption: 'Back to Campgrounds'
    });
  })
  //create new camp
  .post("/", upload.single('image'), (req, res, next) => {
    req.body.campground.image = `/images/${req.file.filename}`
      return Campground
        .create(req.body.campground)
          .then(result => {
            res.redirect(`${req.baseUrl}/${result._id}`)
          })
          .catch(err => {
            next(err)
          });
  })
  //Show camp
  .get("/:id", (req, res) => {
    return Campground
      .findById(req.params.id,{__v:false}).populate("comments").exec()
        .then(result => {
          res.render("campgrounds/show", {
            campground:result,
            title:result.name,
            caption: `You're currently viewing${result.name}`,
            link: req.baseUrl,
            linkCaption: "Back to Campgrounds"
          });
        })
        .catch(err => {
            throw err;
        });
  })
  //New Comment
  .get('/:id/comments/new', (req, res)=>{
    res.render('comments/new' , {
      id: req.params.id,
      title:"Add new comment",
      caption: "Add comment",
      link: "/campgrounds",
      linkCaption: "Back to Campgrounds"
    });
  })
  //Post Comment
  .post('/:id/comments', (req, res)=>{
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