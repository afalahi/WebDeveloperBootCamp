const express = require('express');
const router = express.Router();
const blog = require('../../models/blog')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect("/blogs");
});

router.get("/blogs", function(req,res,next){
	res.render('index');
});
module.exports = router;
