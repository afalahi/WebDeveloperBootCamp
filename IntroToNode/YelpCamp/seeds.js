const db = require('./config/database');
const Campground = require('./models/campModel');
const Comment = require('./models/comment-model');

const data = [
    {
        name: "Cloud Rest",
        image: "https://pixabay.com/get/eb30b60921f3063ed1534705fb0938c9bd22ffd41cb3134792f7c571a2/dark-2576977_1920.jpg",
        description:"A business big enough that it could be listed on the NASDAQ goes belly up. Disappears! It ceases to exist without me. No, you clearly don't know who you're talking to, so let me clue you in. I am not in danger, Skyler. I AM the danger! A guy opens his door and gets shot and you think that of me? No. I am the one who knocks!"
    },    
    {
        name: "Desert Mesa",
        image: "https://pixabay.com/get/e837b1072af4003ed1534705fb0938c9bd22ffd41cb313449cf1c17ca1/tent-1208201_1920.jpg",
        description:"A business big enough that it could be listed on the NASDAQ goes belly up. Disappears! It ceases to exist without me. No, you clearly don't know who you're talking to, so let me clue you in. I am not in danger, Skyler. I AM the danger! A guy opens his door and gets shot and you think that of me? No. I am the one who knocks!"
    },
    {
        name: "Canyon Floor",
        image: "https://pixabay.com/get/eb30b90821f6073ed1534705fb0938c9bd22ffd41cb313449cf1c07faf/camp-2587926_1920.jpg",
        description:"A business big enough that it could be listed on the NASDAQ goes belly up. Disappears! It ceases to exist without me. No, you clearly don't know who you're talking to, so let me clue you in. I am not in danger, Skyler. I AM the danger! A guy opens his door and gets shot and you think that of me? No. I am the one who knocks!"
    }
]
function seedDb() {
    //remove all campgrounds
    Campground.remove({}, err =>{
        if(err){
            throw err;
        }
        console.log("removed campgrounds");
        Comment.remove({}, err =>{
            if(err){
                throw err;
            }
            console.log("Removed Comments")
        })
            //add a few campgrounds
        data.forEach(seed =>{
            Campground.create(seed, (err,campground) =>{
                if(err){
                    throw err;
                } 
                else{
                    console.log("added a campground");
                    //add comments
                    Comment.create({
                        text: "This place is great, but wish there was internet",
                        author:"Homer"
                    }, (err,comment) => {
                        if(err){
                            throw err;
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Added new comment");
                        }
                    });
                }
            });
        });
    });
}
module.exports = seedDb;