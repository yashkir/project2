var express = require('express');
var router = express.Router();
var ledgersCtrl = require('../controllers/ledgers');

router.delete('/:id', ledgersCtrl.delete);
router.get('/', ledgersCtrl.index);
router.post('/', ledgersCtrl.create);
router.get('/:id', ledgersCtrl.select);

module.exports = router;
