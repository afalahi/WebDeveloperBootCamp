const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router
  .get('/', (req, res) => {
    res.render('auth/register', {
      title:'Register',
      caption:'New User Registration',
      link: req.baseUrl,
      linkCaption: 'Back to Home'
    });
  })
  .post('/', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
      if (err) {
        console.log(err);
        return res.render('auth/register')
      }
      passport.authenticate("local")(req, res, () => {
        res.redirect('campgrounds')
      })
    });
  });
  

module.exports = router;