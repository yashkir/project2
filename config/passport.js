var passport = require('passport');
var User = require('../models/user');

console.log(User.createStrategy());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
