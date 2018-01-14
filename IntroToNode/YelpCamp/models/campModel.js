/*jshint esversion:6*/
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const campSchema = new Schema({
    name: {type: String, required: true},
    imagePath: String,
});

const Camp = mongoose.model('Camp', campSchema);
module.exports = Camp;