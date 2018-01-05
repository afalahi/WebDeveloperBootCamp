/*jshint esversion: 6 */
//constructors 
const path = require ('path');
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));
app.set("view engine", "ejs");

//routs
app.get("/", function(req, res){
    res.render("home");
});

app.get("/love/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

app.get("/posts", function (req, res) {
    var posts = 
    [
        {
            title: "post 1",
            author: "Ali"
        },
        {
            title: "My adorable pet bunny",
            author: "Ali"
        },
        {
            title: "can you believe this pomskey!",
            Author: "Ali"
        }
    ];
    res.render("posts",{posts: posts});
});

//server
app.listen(80);
