var Transaction = require('../models/transaction');
var Ledger = require('../models/ledger');
var Entry = require('../models/entry');
var debug = require('debug')('transactions');

const DEFAULT_COMMODITY = '$';

async function index(req, res, next) {
  try {
    // Deep populate the ledger
    let ledger = await Ledger.findById(req.session.activeLedger)
      .populate({
        path: 'transactions',
        populate: { path: 'entries' },
      })
      .exec()

    let transactions = ledger.transactions;

    res.render('transactions/index', {
      title: 'Transactions',
      transactions,
      ledger: ledger || 'none'
    });
  } catch(err) {
    next(err);
  }
};

async function create(req, res, next) {
  try {
    // TODO this check should be applied to all ledger read/writes
    if (!req.user.ledgers.includes(req.session.activeLedger)) {
      throw new Error('User does not own active Ledger');
    }
    let ledger = await Ledger.findById(req.session.activeLedger)
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

    ledger.transactions.push(newTransaction);

    await newTransaction.save();
    await ledger.save();

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
