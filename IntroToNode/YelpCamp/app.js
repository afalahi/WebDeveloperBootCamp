/* jshint esversion:6 */
require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const flash = require('flash');
const database = require('./config/database');
const User = require('./models/user');
const locals = require('./middleware/locals');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser("this is my secret phrase for express session"));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js/lib', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect css bootstrap
let maxAge = 100*10*60*60*5;
//Passport Config
app.use(require("express-session")({
  secret: "this is my secret phrase for express session",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: maxAge //age is in milliseconds. converting to hours for simplicity --> 5 hours
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(locals);
//Use Routes from /routes/index.js
app.use(require('./routes'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{
    title:err.message,
    caption:'Something went wrong',
    link: req.baseUrl,
    linkCaption: 'Back'
  });
  delete req.session.flash;
});
module.exports = app;