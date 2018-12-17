/*jshint esversion:6*/
const db = require('../config/database');

const campSchema = new db.Schema({
  name: {
    type: String, 
    required: true
  },
  image: String,
  description: String,
  author: {
    type: db.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {toJSON: {virtuals: true}});

campSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'discussion_id',
  justOne: false
})

module.exports = db.model('Campground', campSchema);