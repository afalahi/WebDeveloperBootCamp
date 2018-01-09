var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing', 
  {
    title: 'Yelp Camp',
    caption:'We are glad you visited. View our amazing campgrounds',
    link: '/campgrounds',
    linkCaption: 'View Campgrounds'
  });
});

module.exports = router;
