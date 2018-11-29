const db = require('../config/database');
const passportMongoose = require('passport-local-mongoose');

const UserSchema = new db.Schema({
  username: String,
  password: String
});

UserSchema.plugin(passportMongoose, {
  saltlen: 64,
  iterations: 100000,
  attemptsField: "failedAttempts",
  lastLoginField: 'lastLogin',
  usernameLowerCase: true
})
module.exports = db.model('User', UserSchema);