var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next){
    res.render("newCampgrounds", 
    {
        title:'New Camp',
        caption:'Add New Campgrounds',
        link: '/campgrounds',
        linkCaption: 'Back to Campgrounds'
    });
});

module.exports = router;
