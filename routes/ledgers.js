var express = require('express');
var router = express.Router();
var ledgersCtrl = require('../controllers/ledgers');
var connectEnsureLogin = require('connect-ensure-login');

router.get('/', connectEnsureLogin.ensureLoggedIn(), ledgersCtrl.index);
router.post('/',  connectEnsureLogin.ensureLoggedIn(), ledgersCtrl.create);

module.exports = router;
