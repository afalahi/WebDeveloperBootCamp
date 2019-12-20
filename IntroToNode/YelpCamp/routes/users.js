/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
// const User = require('../models/user');
// const isLoggedIn = require('../middleware/isLoggedIn');
const oidc = require('../middleware/oidc');
const rp = require('request-promise')
const isAdmin = require('../middleware/isAdmin');


router.use( oidc.ensureAuthenticated(), isAdmin)
/* GET users listing. */
router.get('/', (req, res, next) => {
  rp.get({
    uri: `https://login.isengard.us/api/v1/apps/${process.env.CLIENT_ID}/users`,
    json:true,
    headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`}
  }).then(results => {
    // console.log(results);
    res.render('users/index', {
      users: results,
      link: "/users/new",
      linkCaption: "Add new user"
    });
  }).catch(err => {
    next(err);
  })
});

router.get("/new", (req, res, next) => {
  rp.get({
    uri: `https://login.isengard.us/api/v1/apps/${process.env.CLIENT_ID}/groups`,
    json:true,
    headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`}
  }).then(groups => {
    console.log(groups)
    let promises = [];
    [...groups].forEach(group => {
      promises.push(rp.get({
        uri: `https://login.isengard.us/api/v1/groups/${group.id}`,
        json: true,
        headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`}
      }))
    })
    return promises
   }).all(results => {
     return results;
   }).then(results =>  {
    res.render('users/new', {
      link:'/users',
      groups: results
    });
   }).catch(err => {
     next(err);
   })
});

router.post("/", (req, res, next) => {
  req.body.user.profile.login = req.body.user.profile.email;
  rp.post({
    uri: `https://login.isengard.us/api/v1/users`,
    headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`, "content-type": "application/json", accept:"application/json"},
    body: req.body.user,
    json: true
  }).then(results => {
    [...req.body.groups].forEach(group =>{
      rp.put({
        uri: `https://login.isengard.us/api/v1/groups/${group}/users/${results.id}`,
        headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`, "content-type": "application/json", accept:"application/json"},
        json:true
      }).then(() => {
        res.redirect(`/users/${results.id}`);
      }).catch(err => {
        next(err);
      })
    });
  }).catch(err => {
    next(err);
  })
});

router.get("/:id", (req, res, next) => {
  rp.get({
    uri: `https://login.isengard.us/api/v1/apps/${process.env.CLIENT_ID}/users/${req.params.id}`,
    json:true,
    headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`}
  }).then(results => {
    rp.get({
      uri: `https://login.isengard.us/api/v1/users/${req.params.id}/groups`,
      json:true,
      headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`}
    }).then(groups => {
      res.render('users/show', {usr: results, groups: groups, caption: results.profile.name, link: "/users"});
    })
  }).catch(err => {
    next(err);
  })
});

router.get("/:id/edit", (req, res, next) => {
  rp.get({
    uri: `https://login.isengard.us/api/v1/apps/${process.env.CLIENT_ID}/users/${req.params.id}`,
    json:true,
    headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`}
  }).then(results => {
    res.render('users/edit', {usr: results, caption: results.profile.name, link: `/users/${req.params.id}`});
  }).catch(err => {
    next(err);
  })
});

router.get("/:id/groups", (req, res, next) => {
  rp.get({
    uri: `https://login.isengard.us/api/v1/users/${req.params.id}/groups`,
    json:true,
    headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`}
  })
  .then(currentGroups => {
    rp.get({
      uri: `https://login.isengard.us/api/v1/apps/${process.env.CLIENT_ID}/groups`,
      json:true,
      headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`}
    })
    .then(groups => {
      let gindex = [...currentGroups].reduce((acc, cur) => {
        acc[cur.id] = cur; 
        return acc}, {}
        );
      let unique = [...groups].filter(obj => !gindex[obj.id])
      return unique
    })
    .then(results => {
      let promises = [];
      [...results].forEach(result =>{
        promises.push(rp.get({
          uri: `https://login.isengard.us/api/v1/groups/${result.id}`,
          json: true,
          headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`}
        }))
      })
      return promises
    }).all(results => {
      return results
    })
    .then(results => {
      res.render('users/groups', {groups: results, current: currentGroups, caption: "groups", link: `/users/${req.params.id}`})
    })
  }).catch(err => {
    next(err);
  })
});

router.put("/:id", (req, res, next) => {
  rp.post({
    uri: `https://login.isengard.us/api/v1/apps/${process.env.CLIENT_ID}/users/${req.params.id}`,
    json:true,
    headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`},
    body: req.body.user
  }).then(results => {
    res.redirect(`/users/${results.id}`)
  }).catch(err => {
    next(err);
  })
})

router.put("/:id", (req, res, next) => {
  rp.post({
    uri: `https://login.isengard.us/api/v1/apps/${process.env.CLIENT_ID}/users/${req.params.id}`,
    json:true,
    headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`},
    body: req.body.user
  }).then(results => {
    res.redirect(`/users/${results.id}`)
  }).catch(err => {
    next(err);
  })
})

router.delete("/:id", (req, res, next) =>{
  rp.delete({
    uri: `https://login.isengard.us/api/v1/users/${req.params.id}`,    
    json:true,
    headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`}
  }).then(() => {
    rp.delete({
      uri: `https://login.isengard.us/api/v1/users/${req.params.id}`,    
      json:true,
      headers: {Authorization: `SSWS ${process.env.OKTA_TOKEN}`}
    }).then(() => {
      res.redirect('/users');
    })
  })  
})
module.exports = router;