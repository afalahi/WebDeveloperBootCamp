/*jshint esversion: 6 */
const express =  require("express");
const app = express();
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});
app.get("/speak/:animal", function(req,res){
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig: "Oink",
        cow: "Moo!",
        dog: "Woof Woof!",
        cat: "Meow",
        shark: "Jaws music"
    };
    var sound = sounds[animal];
    if(!sounds[animal]){
        res.send("Sorry, animal sound not supported");
    }else{
        res.send("The " + animal + " says "+"'"+sound+"'");
    }
});
app.get("/repeat/:message/:times", function(req,res){
    var message = req.params.message;
    var times = parseInt(req.params.times);
    var result = message;
    for (let i = 0; i < times-1; i++) {
         result+=" "+message;
    }
    res.send(result);
});
app.get("*", function(req, res){
    res.send("Sorry, page not found...What are you doing with your life");
});
app.listen(80);