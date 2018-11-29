const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');

const options = {
  title: '',
  caption: '',
  link: '',
  linkCaption: '',
}

router
  .get('/', (req, res) => {
    res.redirect('/')
  })

  .get('/register', (req, res) => {
    options.title ='Register';
    options.caption = 'New User Registration',
    options.link = '/campgrounds'
    options.linkCaption = 'Back to Home'
    res.render('auth/register', options);
  })
  .post('/register', (req, res, next) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
      if (err) {
        console.log(err);
        return res.redirect('register');
      }
      passport.authenticate("local")(req, res, () => {
        res.redirect('/campgrounds')
      })
    });
  })

  .get('/login', (req, res, next) => {
    options.title ="Login";
    options.caption = "Enter User name and Password",
    options.link = '/auth/register'
    options.linkCaption = "New User? Click here to register"
    res.render('auth/login', options);
  })
  .post('/login', passport.authenticate('local', {successRedirect: '/campgrounds', failureRedirect:'/auth/login'}), (req, res) => {
  })
  .get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/campgrounds')
  });

module.exports = router;