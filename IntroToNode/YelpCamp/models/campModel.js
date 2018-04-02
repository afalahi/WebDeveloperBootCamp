/*jshint esversion:6*/
const db = require('../config/database');

const campSchema = new db.Schema({
    name: {
        type: String, 
        required: true
    },
    image: String,
    description: String,
    comments: [
        {
            type: db.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
module.exports = db.model('Campground', campSchema);;