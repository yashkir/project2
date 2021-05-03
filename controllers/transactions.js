var Transaction = require('../models/transaction');
var Entry = require('../models/entry');
var debug = require('debug')('transactions');

const DEFAULT_COMMODITY = '$';

function index(req, res, next) {
  Transaction.find({})
    .populate('entries')
    .exec()
    .then(transactions => {
      res.render('transactions/index', {
        title: 'Transactions',
        transactions,
      });
    })
    .catch(err => next(err));
};

async function create(req, res, next) {
  try {
    let newTransaction = new Transaction({
      name: req.body.name,
      date: req.body.date,
      entries: []
    });

    // TODO this is hardcoded to 2 lines, make it variable
    for (let i = 1; i <= 2; i++) {
      let entry = await Entry.create({
        account: req.body['account-' + i],
        amount: req.body['amount-' + i],
        commodity: DEFAULT_COMMODITY,
      });

      newTransaction.entries.push(entry);
    }

    await newTransaction.save();
    res.redirect('/transactions');
  } catch (err) {
    // Send them back if it's a validation error
    if (err.name === 'ValidationError') {
      debug(err);
      res.redirect('/transactions?info=ValidationError');
    } else {
      next(err);
    }
  }
};

module.exports = {
  index,
  create
}
