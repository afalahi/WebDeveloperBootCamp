/*jshint esversion:6 */
const express = require('express');
const router = express.Router();
//temp array
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
//Get camp grounds
router.get("/", function(req, res, next){
    res.render("campgrounds", 
    {
        campgrounds: campgrounds, 
        title:'Campgrounds',
        caption:'View our amazing campgrounds from all over the world',
        link: '/campgrounds/new',
        linkCaption: 'Add new campgrounds'
    });
});

router.post("/", function(req, res, next){
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    let name = req.body.campName;
    let image = req.files.campImage;
    let imageName = name;
    let ext = "."+image.mimetype.split("/")[1];

    //check for white space in name
    function hasWhiteSpace(str) {
        let test = /\s/g.test(str);
        if(test){
            str = str.replace(/\s+/g, '');
            return str;
        }
        return str;
      }
    imageName = hasWhiteSpace(imageName);

    let path = './public/images/'+imageName+ext;
    image.mv(path, function(err) {
        if (err){
            return res.status(500).send(err);
        }
        var newCampgrounds = {
            name: name,
            image: '/images/'+imageName+ext
        };
        campgrounds.push(newCampgrounds);
        res.redirect("/campgrounds");
      });
});

module.exports = router;