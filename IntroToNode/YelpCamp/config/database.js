const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.MONGO_DB_URI}/yelpcamp`)
    .then(() => {
        console.log(`connection success`)
    })
    .catch(err => {
        throw err
    });

module.exports = mongoose;