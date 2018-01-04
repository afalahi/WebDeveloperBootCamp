/*jshint esversion: 6 */
const express =  require("express");
const app = express();
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});
app.get("/speak/:animal", function(req,res){
    var animal = req.params.animal;
    if(animal ==="cow") {
        res.send("The " + animal + "says 'Moo'");
    }
    else if (animal==="dog") {
        res.send("The " + animal + " says 'Woof Woof!'");        
    }
    else if (animal==="pig"){
        res.send("The " + animal + "says 'Oink'");        
    }
    else {
        res.send("Sorry, page not found...What are you doing with your life");
    }
});
app.get("/repeat/:string/:num", function(req,res){
    var string = req.params.string;
    var num = parseInt(req.params.num);
    var value = string;
    for (let i = 0; i < num-1; i++) {
         value+=" "+string;
    }
    res.send(value);
});
app.get("*", function(req, res){
    res.send("Sorry, page not found...What are you doing with your life");
});
app.listen(8080);