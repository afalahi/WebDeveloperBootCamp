/*jshint esversion: 6 */
//constructors 
const path = require ('path');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));
app.set("view engine", "ejs");
var friends=["Ali", "Mike", "Russ", "Edgar", "Tamir"];
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

app.post("/addfriend", function(req, res){
    var friend = req.body.friend;
    friends.push(friend);
    res.redirect("/friends");
});

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});

//server
app.listen(80);
