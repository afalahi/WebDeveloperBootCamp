const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blog', function(err){
    if(err){
        throw err;
    }
});
module.exports = mongoose