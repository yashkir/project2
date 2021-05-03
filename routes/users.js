var express = require('express');
var router = express.Router();
var connectEnsureLogin = require('connect-ensure-login');

var usersCtrl = require('../controllers/users.js');

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', usersCtrl.register);
router.post('/login', usersCtrl.login);
router.post('/register', usersCtrl.createAccount);

router.get('/users/private', connectEnsureLogin.ensureLoggedIn(), function(req, res, next) {
  res.send('private resource');
});

module.exports = router;
