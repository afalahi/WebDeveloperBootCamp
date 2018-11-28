const db = require('../config/database');
const passportMongoose = require('passport-local-mongoose');

const UserSchema = new db.Schema({
  username: String,
  password: String
});

UserSchema.plugin(passportMongoose)
module.exports = db.model('User', UserSchema);