/*jshint esversion:6 */
const express = require('express');
const router = express.Router();

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

router.post("/", function(req, res, next){
    let name = req.body.name;
    let image = req.body.image;
});

module.exports = router;