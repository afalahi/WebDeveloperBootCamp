/*jshint esversion:6*/
const Camp = require('../models/campModel');

Camp.create({
    name: "Camp David",
    imagePath: "/images/MountVernon.jpeg"
}, function(err, camp){
    if(err){
        console.log(err);
    } else{
        console.log("newly created campground");
        console.log(camp);
    }
});
