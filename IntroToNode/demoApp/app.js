/*jshint esversion: 6 */
var express = require("express");
var app = express();
app.get("/", function(req, res){
    res.send("Hi there");
});
app.get("/bye", function(req, res){
    res.send("good bye");
})
app.listen(8080);