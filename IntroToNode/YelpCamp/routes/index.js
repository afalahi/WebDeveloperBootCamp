/*jshint esversion:6*/
const router = require('express').Router();

//Routes
router.use('/users', require('./users'));
router.use('/campgrounds', require('./campgrounds'));
router.use('/campgrounds/:id/comments', require('./comments'));
router.use('/auth', require('./auth'))
/* GET home page. */
router.get('/', function(req, res) {
  delete req.session.flash
  res.render('index', 
  {
    title: 'Yelp Camp',
    caption:'We are glad you visited. View our amazing campgrounds',
    link: '/campgrounds',
    linkCaption: 'View Campgrounds'
  });
});

module.exports = router;