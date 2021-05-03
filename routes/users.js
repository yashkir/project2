var express = require('express');
var router = express.Router();
var connectEnsureLogin = require('connect-ensure-login');

var usersCtrl = require('../controllers/users.js');

router.get('/login', usersCtrl.showLogin);
router.post('/login', usersCtrl.login);
router.post('/register', usersCtrl.register);

router.get('/users/private', connectEnsureLogin.ensureLoggedIn(), function(req, res, next) {
  res.send('private resource');
});

module.exports = router;
