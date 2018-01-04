/*jshint esversion: 6 */
const path = require ('path');
const express = require("express");
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
console.log(__dirname);
app.get("/", function(req, res){
    res.render("home.ejs");
});

app.listen(80);