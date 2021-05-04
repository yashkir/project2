var express = require('express');
var router = express.Router();
var connectEnsureLogin = require('connect-ensure-login');
var reportsCtrl = require('../controllers/reports');

router.get('/', connectEnsureLogin.ensureLoggedIn(), reportsCtrl.index);
router.get('/networth', connectEnsureLogin.ensureLoggedIn(), reportsCtrl.showNetworth);

module.exports = router;
