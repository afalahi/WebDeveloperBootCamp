const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.MONGO_DB_URI}/yelpcamp`, {useNewUrlParser: true})
    .then(result => {
        console.log("connected to mongo")
    })
    .catch(err => {
        console.log(err)
    });

module.exports = mongoose;