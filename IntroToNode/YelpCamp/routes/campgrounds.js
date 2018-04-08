/*jshint esversion:6 */
const router = require('express').Router();
const Campground = require('../models/campground');
const Comment = require('../models/comment');

//Get camp grounds
router.get("/", function(req, res){
    Campground.find({}, function(err, result){
        if(err) {
            throw err;
        } 
        else {
            res.render("campgrounds/index", {
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
router.get("/new", function(req, res){
    res.render("campgrounds/new", 
    {
        title:'New Camp',
        caption:'Add New Campgrounds',
        link: '/campgrounds',
        linkCaption: 'Back to Campgrounds'
    });
});
//create new camp
router.post("/", function(req, res){
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
                res.redirect("/campgrounds");
            }
        });
        
      });
});
//Show camp
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, result){
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/show", {
                campground:result,
                title:result.name,
                caption: "You're currently viewing "+result.name,
                link: "/campgrounds",
                linkCaption: "Back to Campgrounds"

            });
        }
    });
});
//New Comment
router.get('/:id/comments/new', (req, res)=>{
    res.render('comments/new' , {
        id: req.params.id,
        title:"Add new comment",
        caption: "Add comment",
        link: "/campgrounds",
        linkCaption: "Back to Campgrounds"

    });
});
//Post Comment
router.post('/:id/comments', (req, res)=>{
    return Comment
        .create(req.body.comment)
        .then( comment => {
            return Campground
                .findById(req.params.id)
                .then(campground =>{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+req.params.id)
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