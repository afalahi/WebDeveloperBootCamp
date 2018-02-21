const express = require('express');
const router = express.Router();
const blog = require('../../models/blog');

router.get("/new", function(req,res,next){
    res.render("new")
});