const express = require('express');
const router = express.Router();
const blog = require('../../models/blog');
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
/* GET home page. */
router.get('/', function(req, res) {
	res.redirect("/blogs");
});
//Get Blogs
router.get("/blogs", function(req,res){
	blog.find({}, 
		function(err,result){
			if(err){
				throw err;
			}
			else{
				res.render('index', {title: "Express", blogs: result});
			}
		}
	);
});
//NEW Blog
router.get("/blogs/new", function(req,res){
    res.render("new", {title: "New Blog"})
});
//Create blog
router.post("/blogs", upload.single('image') , function(req, res){
	req.body.blog.title = req.sanitize(req.body.blog.title);
	req.body.blog.body = req.sanitize(req.body.blog.body);
	req.body.blog.image = '/images/'+ req.file.filename
	blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new", {title: "New Blog"})
		} else {
			res.redirect("/blogs/"+newBlog._id);
		}
	});
});
// VIEW BLOG
router.get("/blogs/:id", function(req, res){
	let id = req.params.id;
	blog.findById(id, function(err, result){
		if(err){
			res.render("/");
		}
		else{
			res.render('view', {
				title:result.title,
				blog: result
			});
		}
	});
});
// EDIT ROUTE
router.get("/blogs/:id/edit", function(req, res){
	blog.findById(req.params.id, function(err, result){
		if(err){
			res.redirect("/blogs");
		} else{
			res.render('edit', {
				title:result.title,
				blog:result
			});
		}
	});
});
//UPDATE ROUTE
router.put("/blogs/:id", upload.single("image"), function(req, res){
	req.body.blog.title = req.sanitize(req.body.blog.title);
	req.body.blog.body = req.sanitize(req.body.blog.body);
	if(req.file){
		req.body.blog.image = '/images/'+ req.file.filename
	}
	blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, result){
		if (err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});
// DELETE ROUTE
router.delete("/blogs/:id", function(req, res){
	blog.findByIdAndRemove(req.params.id, function(err){
		if (err) {
			res.redirect("/blogs/" + req.params.id);
		} else {
			res.redirect("/blogs")
		}
	})
});
module.exports = router;