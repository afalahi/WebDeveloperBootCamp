const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.MONGO_DB_URI}/yelpcamp`, function(err){
    if(err){
        throw err.message;
    }
});
module.exports = mongoose