/*jshint esversion:6 */
const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

//Camp Model
const campSchema = new Schema({
    name: {type: String, required: true},
    image: String,
    description: String
});
const Campground = mongoose.model('Campground', campSchema);

//Get camp grounds
router.get("/", function(req, res, next){
    Campground.find({}, function(err, result){
        if(err) {
            console.log(err);
        } 
        else {
            res.render("campgrounds", {
                campgrounds: result, 
                title:'Campgrounds',
                caption:'View our amazing campgrounds from all over the world',
                link: '/campgrounds/new',
                linkCaption: 'Add new campgrounds'
            });
        }
    });
});
//Display form for adding new campground
router.get("/new", function(req, res, next){
    res.render("newCampgrounds", 
    {
        title:'New Camp',
        caption:'Add New Campgrounds',
        link: '/campgrounds',
        linkCaption: 'Back to Campgrounds'
    });
});
//create new camp
router.post("/", function(req, res, next){
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    let name = req.body.campName;
    let image = req.files.campImage;
    let desc = req.body.description;
    let imageName = hasWhiteSpace(name);
    let ext = "."+image.mimetype.split("/")[1];

    //check for white space in name
    function hasWhiteSpace(str) {
        let whiteSpace = /\s/g.test(str);
        if(whiteSpace){
            str = str.replace(/\s+/g, '');
            return str;
        }
        return str;
      }
    // imageName = hasWhiteSpace(imageName);

    let path = './public/images/'+imageName+ext;
    image.mv(path, function(err) {
        if (err){
            return res.status(500).send(err);
        }
        let newCampgrounds = {
            name: name,
            image: '/images/'+imageName+ext,
            description: desc
        };
        Campground.create(newCampgrounds, function(err, result){
            if(err) {
                console.log(err);
            } 
            else {
                console.log("newly created campground");
                console.log(result);
                res.redirect("/campgrounds");
            }
        });
        
      });
});
//Show camp
router.get("/:id", function(req, res){
    Campground.findById(req.params.id, function(err, result){
        if (err) {
            console.log(err);
        }
        else {
            res.render("CampView", {
                campground:result,
                title:result.name,
                caption: "You're currently viewing "+result.name,
                link: "/campgrounds",
                linkCaption: "Back to Campgrounds"

            });
        }
    });
    
})
module.exports = router;