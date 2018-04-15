/*jshint esversion:6 */
const router = require('express').Router();
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const multer = require('multer');
//MULTER CONFIG
const storage = multer.diskStorage(
	{  
		destination: function (req, file, cb) {
			cb(null, './public/images')
		},
		filename: function(req, file, callback) {
			callback(null,Date.now()+'-'+file.originalname);
		}
	}
);
const upload = multer({storage:storage});

//Get camp grounds
router.get("/", (req, res) =>{
    return Campground
        .find({},{__v:false})
        .then(result => {
        res.render("campgrounds/index", {
            campgrounds: result, 
            title:'Campgrounds',
            caption:'View our amazing campgrounds from all over the world',
            link: req.baseUrl+'/new',
            linkCaption: 'Add new campgrounds',
            cache:true
        });
    })
    .catch(err =>{
        throw err;
    });
});
//Display form for adding new campground
router.get("/new", (req, res) => {
    res.render("campgrounds/new", 
    {
        title:'New Camp',
        caption:'Add New Campgrounds',
        link: req.baseUrl,
        linkCaption: 'Back to Campgrounds'
    });
});
//create new camp
router.post("/", upload.single('image'), (req, res) => {
    req.body.campground.image = '/images/' + req.file.filename
    return Campground
        .create(req.body.campground)
        .then(result => {
            res.redirect(req.baseUrl+'/'+result._id)
        })
        .catch(err => {
            throw err;
        });
});
//Show camp
router.get("/:id", (req, res) => {
    return Campground
        .findById(req.params.id).populate("comments").exec()
        .then(result => {
            res.render("campgrounds/show", {
                campground:result,
                title:result.name,
                caption: "You're currently viewing "+ result.name,
                link: req.baseUrl,
                linkCaption: "Back to Campgrounds"

            });
        })
        .catch(err => {
            throw err;
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
                .then(campground => {
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