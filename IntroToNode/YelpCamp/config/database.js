const mongoose = require('mongoose');
const dbUri = process.env.MLAB_URI,
      dbUser = process.env.DB_USER,
      dbPass=process.env.DB_PASS
mongoose.connect('mongodb://'+dbUser+':'+dbPass+'@'+dbUri+'/yelpcamp', function(err){
    if(err){
        throw err.message;
    }
});
module.exports = mongoose