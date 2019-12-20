const OktaJwtVerifier = require('@okta/jwt-verifier');

const jwtVerify = new OktaJwtVerifier({
  issuer:"https://login.isengard.us/oauth2/default",
  clientId: process.env.CLIENT_ID
});
function isAdmin(req, res, next){
  let user  = req.userContext
  jwtVerify.verifyAccessToken(user.tokens.access_token)
    .then(result => {
      console.log(result)
      if(result.claims.admin) {
        return next();
      }
      req.flash('warning', `Sorry ${user.userinfo.given_name} you don't have permissions to perform this action`);
      res.redirect(`/campgrounds`);
    }).catch(err => {
      next(err);
    })
}

module.exports = isAdmin