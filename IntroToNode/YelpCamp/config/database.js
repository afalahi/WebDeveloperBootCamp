const mongoose = require('mongoose');
const connection = mongoose.connection

connection.on('connecting', () => {
    console.log('connecting to MongoDB...');
});

connection.on('error', (err) => {
    console.log(err.message)
    // mongoose.disconnect();
});

connection.on('connected', () => {
    console.log('Connected to Server')
});

connection.once('open', () => {
    console.log('MongoDB connection opened!');
});

connection.on('reconnected',  () => {
    console.log('MongoDB reconnected!');    
});

connection.on('disconnected', () => {
    console.log('disconnected')
});

mongoose.connect(`mongodb://${process.env.MONGO_DB_URI}/yelpcamp`, {useNewUrlParser: true, autoReconnect: true})

module.exports = mongoose;