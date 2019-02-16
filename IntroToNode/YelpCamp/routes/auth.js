const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');
const clsFlash = require('../middleware/clsflash');
const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: "https://dev-451953.oktapreview.com",
  token: process.env.OKTA_TOKEN
})
const options = {
  title: '',
  caption: '',
  link: '',
  linkCaption: '',
}
router
  .get('/', (req, res) => {
    res.redirect('/');
  })
  .get('/register',clsFlash, (req, res) => {
    options.title ='Register';
    options.caption = 'New User Registration';
    options.link = '/campgrounds';
    options.linkCaption = 'Back to Home';
    options.body = ''
    options.errors= ''
    res.render('auth/register', options);
  })
  .post('/register', async (req, res, next) => {
    try {
      await client.createUser({
        profile: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          login: req.body.email,
        },
        groupIds: [
          "00gj0t0ieicAW2Iss0h7"
        ],
        credentials: {
          password: {
            value: req.body.password,
          },
        },
      })
  
      res.redirect('/campgrounds')
    } catch ({ errorCauses }) {
      const errors = errorCauses.reduce((summary, { errorSummary }) => {
        if (/Password/.test(errorSummary)) {
          return Object.assign({ password: errorSummary })
        }
  
        const [ , field, error ] = /^(.+?): (.+)$/.exec(errorSummary)
        return Object.assign({ [field]: error }, summary)
      }, {})

      // req.flash('danger', errors)
      // res.redirect('register')
      res.render('auth/register', { title:options.title ='Register', errors, body: req.body })
    }
  })
  
  // .post('/register', (req, res, next) => {
  //   User.register(new User({
  //     username: req.body.username,
  //     givenName: req.body.givenName,
  //     sn: req.body.sn,
  //     uid: req.body.username
  //   }), req.body.password, (err, user) => {
  //     if (err) {
  //       req.flash('danger', err.message);
  //       return res.redirect('register');
  //     }
  //     passport.authenticate("local")(req, res, () => {
  //       req.flash('success', `Registration successful. Welcome ${user.givenName}`);
  //       res.redirect('/campgrounds');
  //     });
  //   });
  // })

  // .get('/login', isLoggedIn, clsFlash, (req, res, next) => {
  //   options.title ="Login";
  //   options.caption = "Enter User name and Password";
  //   options.link = '/auth/register';
  //   options.linkCaption = "New User? Click here to register";
  //   res.render('auth/login', options);
  // })
  // .post('/login', (req, res, next) => {
  //   passport.authenticate('local', (err, user, info) => {
  //     if (err) {
  //       return next(err);
  //     }
  //     if (!user) {
  //       req.flash('warning', info.message)
  //       return res.redirect('/auth/login');
  //     }
  //     req.logIn(user, (err) => {
  //       if (err) {
  //         return next(err);
  //       }
  //       res.redirect(req.session.returnTo || '/campgrounds');
  //       delete req.session.returnTo;
  //     });
  //   })(req, res, next);
  // })
  .get('/logout', (req, res) => {
    req.logOut();
    req.flash('info', 'You logged out');
    res.redirect('/');
  });
//if user is already logged in redirect back
// function isLoggedIn(req, res, next) {
//   if (!req.user) {
//     return next();
//   } else {
//     req.flash('info', `You've already logged in`); 
//     res.redirect('/campgrounds');
//   }
// };
module.exports = router;