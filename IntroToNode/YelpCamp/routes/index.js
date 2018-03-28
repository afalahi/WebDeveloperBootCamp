/*jshint esversion:6*/
const express = require('express');
const router = express.Router();

//Routes
router.use('/users', require('./users'));
router.use('/campgrounds', require('./campgrounds'));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', 
  {
    title: 'Yelp Camp',
    caption:'We are glad you visited. View our amazing campgrounds',
    link: '/campgrounds',
    linkCaption: 'View Campgrounds'
  });
});

module.exports = router;
