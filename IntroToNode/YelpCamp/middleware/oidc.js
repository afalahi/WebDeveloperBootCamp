require('dotenv').config();
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;
const rp = require('request-promise')
const moment = require('moment');
const oidc = new ExpressOIDC({
  issuer:"https://dev-451953.oktapreview.com/oauth2/default",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: "http://localhost/auth/callback",
  scope: "openid profile groups",
  routes: {
    login: {
      path: '/auth/login',
      viewHandler: (req, res, next) => {
        const baseUrl =  "https://dev-451953.oktapreview.com"
        res.render('auth/login', {
          csrfToken: req.csrfToken(),
          baseUrl: baseUrl
        });
      }
    },
    callback: {
      path: '/auth/callback',
      handler: (req, res, next) => {
        rp.get({
          uri: `https://dev-451953.oktapreview.com/api/v1/apps/${process.env.CLIENT_ID}/users/${req.userContext.userinfo.sub}`,
          json:true,
          headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`},
        }).then(results => {
          // let lastLogin = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
          let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          rp.post({
            uri: `https://dev-451953.oktapreview.com/api/v1/apps/${process.env.CLIENT_ID}/users/${results.id}`,
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
      // defaultRedirect: '/campgrounds'
    }
  }
});

module.exports = oidc;