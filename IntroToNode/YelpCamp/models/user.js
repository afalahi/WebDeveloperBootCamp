const db = require('../config/database');
const passportMongoose = require('passport-local-mongoose');
const UserSchema = new db.Schema({
    name:{
        firstName:String,
        lastName:String
    }
});
UserSchema.plugin(passportMongoose);
module.exports = db.model('User', UserSchema);