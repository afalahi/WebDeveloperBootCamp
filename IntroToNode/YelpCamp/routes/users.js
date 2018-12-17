/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  return User
    .find({}, {_id: false, __v: false, hash: false, salt: false})
      .then(results => {
        res.send(results);
      })
      .catch(err => {
        next(err);
      })
});

module.exports = router;
