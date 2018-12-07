const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.MONGO_DB_URI}/yelpcamp`, {useNewUrlParser: true})
    mongoose.connection.on('connected', () => {
        console.log('Connected to Server')
    });
    mongoose.connection.on('disconnected', () => {
        console.log('disconnected')
    });
    mongoose.connection.on('error', (err) => {
        console.log(err.message)
    });
module.exports = mongoose;