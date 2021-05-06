var express = require('express');
var router = express.Router();
var reportsCtrl = require('../controllers/reports');

router.get('/', reportsCtrl.index);
router.get('/networth', reportsCtrl.showNetworth);

module.exports = router;
