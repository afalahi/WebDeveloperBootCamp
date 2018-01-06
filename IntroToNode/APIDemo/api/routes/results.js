/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const request = require("request");

var baseUrl = "http://omdbapi.com";
var endPoint= "/?s=";
var apiKey = "&apikey=thewdb";
router.get("/", function(req, res){
    var search = req.query.search;
    var fullUrl = baseUrl+endPoint+search+apiKey;
    request(fullUrl, function(error, response, body){
        if (!error && response.statusCode==200) {
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});
module.exports = router;
