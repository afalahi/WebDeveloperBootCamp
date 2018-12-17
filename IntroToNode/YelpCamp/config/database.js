const mongoose = require('mongoose');
const connection = mongoose.connection
const connect = function() {
    mongoose.connect(`mongodb://${process.env.MONGO_DB_URI}/yelpcamp`, {useNewUrlParser: true, autoReconnect: true});
}
let isConnectedBefore = false;

connection.on('connecting', () => {
    console.log('connecting to MongoDB...');
});

connection.on('error', (err) => {
    console.log(err.message)
});

connection.on('disconnected', () => {
    console.log('disconnected')
    if (!isConnectedBefore) {
        connect();
    }
});

connection.on('connected', () => {
    isConnectedBefore = true;
    console.log('Connected to Server')
});

connection.once('open', () => {
    console.log('MongoDB connection opened!');
});

connection.on('reconnected',  () => {
    console.log('MongoDB reconnected!');    
});

process.on('SIGINT', () => {
    mongoose.connection.close(function () {
        console.log('Forced to close the MongoDB connection');
        process.exit(0);
    });
});

connect()
module.exports = mongoose;