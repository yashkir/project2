var express = require('express');
var router = express.Router();
var transactionsCtrl = require('../controllers/transactions');

router.get('/', transactionsCtrl.index);
router.post('/', transactionsCtrl.create);

module.exports = router;
