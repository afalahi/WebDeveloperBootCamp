const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/YelpCamp', function(err){
    if(err){
        throw err.message;
    }
});
module.exports = mongoose