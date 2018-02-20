const db = require('../config/db');

const blogSchema = new db.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date, 
        default:Date.now
    }
});

const Blog = db.model("Blog", blogSchema);

module.exports = Blog;