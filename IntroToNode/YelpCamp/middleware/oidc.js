require('dotenv').config();
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;
const rp = require('request-promise')
const moment = require('moment');
const oidc = new ExpressOIDC({
  issuer:"https://login.isengard.us/oauth2/default",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: "http://localhost/auth/callback",
  scope: "openid profile groups",
  routes: {
    login: {
      path: '/auth/login',
      viewHandler: (req, res, next) => {
        const baseUrl =  "https://login.isengard.us"
        res.render('auth/login', {
          csrfToken: req.csrfToken(),
          baseUrl: baseUrl
        });
      }
    },
    callback: {
      path: '/auth/callback',
      handler: (req, res, next) => {
        console.log(req.userContext)
        rp.get({
          uri: `https://login.isengard.us/api/v1/apps/${process.env.CLIENT_ID}/users/${req.userContext.userinfo.sub}`,
          json:true,
          headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`},
        }).then(results => {
          // let lastLogin = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
          let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          rp.post({
            uri: `https://login.isengard.us/api/v1/apps/${process.env.CLIENT_ID}/users/${results.id}`,
            json:true,
            headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`},
            body: {profile: {
              last_login: weekDays[moment().day()]
            }}
          })
          if(results.profile.last_login) {
            req.flash('success', `Welcome Back ${req.userContext.userinfo.name} Your last login was ${results.profile.last_login}`);
          } else {
            req.flash('success', `Welcome ${req.userContext.userinfo.name}`);
          }
          res.redirect('/campgrounds')
        })
      },
      // afterCallback: '/campgrounds'
      // defaultRedirect: '/campgrounds'
    },
    logout: {
      path: '/auth/logout'
    }

  }
});

module.exports = oidc;