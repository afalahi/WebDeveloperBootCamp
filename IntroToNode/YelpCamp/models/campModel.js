/*jshint esversion:6*/
const database= require('../config/database');

const campSchema = new database.Schema({
    name: {
        type: String, 
        required: true
    },
    image: String,
});
module.exports = database.model('campgrounds', campSchema);;