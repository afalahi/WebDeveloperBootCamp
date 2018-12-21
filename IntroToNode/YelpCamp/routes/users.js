/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const isLoggedIn = require('../middleware/isLoggedIn');

/* GET users listing. */
router.get('/',isLoggedIn, (req, res, next) => {
  return User
    .find({}, {_id: false, __v: false, hash: false, salt: false})
      .then(results => {
        res.render('users/index', {users: results.sort()});
      })
      .catch(err => {
        next(err);
      });
});

module.exports = router;