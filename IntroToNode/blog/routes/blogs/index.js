const express = require('express');
const router = express.Router();
const blog = require('../../models/blog');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect("/blogs");
});
//Get Blogs
router.get("/blogs", function(req,res,next){
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
router.get("/blogs/new", function(req,res,next){
    res.render("new", {title: "New Blog"})
});
//Create blog
router.post("/blogs", function(req, res, next){
	blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new", {title: "New Blog"})
		} else {
			res.redirect("/blogs");
		}
	});
});
module.exports = router;