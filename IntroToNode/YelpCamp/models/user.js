const db = require('../config/database');
const passportMongoose = require('passport-local-mongoose');

const UserSchema = new db.Schema({
  givenName: String,
  sn: String,
  uid: String,
  location: String,
  title: String,
  department: String,
  username: String,
  password: String
}, {toJSON: {virtuals: true}});

UserSchema.plugin(passportMongoose, {
  saltlen: 64,
  iterations: 100000,
  attemptsField: "failedAttempts",
  lastLoginField: 'lastLogin',
  usernameLowerCase: true
});
UserSchema.virtual('fullName')
  .get(function() {
    return `${this.givenName} ${this.sn}`
  })
module.exports = db.model('User', UserSchema);