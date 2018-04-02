const db = require('../config/database');

const commentSchema = new db.Schema({
    text:String,
    author:String,
    created: {
        type: Date,
        default: Date.now
    }
});
module.exports = db.model("Comment", commentSchema);