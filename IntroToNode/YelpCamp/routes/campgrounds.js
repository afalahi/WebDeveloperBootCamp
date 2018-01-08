var express = require('express');
var router = express.Router();

//Get camp grounds
router.get("/", function(req, res, next){
    var campgrounds = [
        {
            name: "Cherry Hill Park", 
            image: "/images/CherryHillPark.jpeg"
        },
        {
            name: "Fort Hunt Park", 
            image: "/images/FortHuntPark.jpeg"
        },
        {
            name: "Oxon Cove Park & Oxon Hill Farm", 
            image: "/images/OxonCovePark.jpeg"
        }
    ];
    res.render("campgrounds", {campgrounds: campgrounds, title:'Campgrounds'});
});

module.exports = router;