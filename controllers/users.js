var passport = require('passport');
var User = require('../models/user');

function register(req, res) {
  res.render('login', { title: 'Register or Log In', info: req.query.info });
}

function createAccount(req, res, next) {
  User.register(new User({username: req.body.username}), req.body.password, (err) => {
    if (err) {
      next(err);
    }

    res.redirect('/');
  });
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

module.exports = {
  register,
  login,
  createAccount,
}
