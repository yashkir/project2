var passport = require('passport');
var User = require('../models/user');

function showLogin(req, res) {
  res.render('login', { title: 'Register or Log In', info: req.query.info });
}

function login(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.redirect('/login?info=' + info);
    }

    req.logIn(user, function(err) {
      if (err) return next(err);

      return res.redirect('/');
    });
  })(req, res, next);
}

function logout(req, res) {
  req.logout();
  res.redirect('/');
}

function register(req, res, next) {
  newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      return next(err);
    }

    return res.redirect('/');
  });
}

function show(req, res) {
  res.render('users/show', { title: req.user.username, user: req.user });
}


module.exports = {
  showLogin,
  login,
  logout,
  register,
  show,
}
