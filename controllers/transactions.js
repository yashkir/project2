var Transaction = require('../models/transaction');
var Ledger = require('../models/ledger');
var debug = require('debug')('transactions');
var ledgersCtrl = require('./ledgers');

const DEFAULT_COMMODITY = '$';

/* Helper Functions */

function transactionFromForm(body) {
  let transaction = {
    name: body.name,
    date: body.date,
    entries: []
  };

  /* Here we keep grabbing rows until account-i is undefined */
  for (let i = 0; body['account-' + i]; i++) {
    let entry = {
      account: body['account-' + i],
      amount: body['amount-' + i],
      commodity: DEFAULT_COMMODITY,
    };

    transaction.entries.push(entry);
  }

  return transaction;
}

var dummyTransaction;
(async function() {
  dummyTransaction = await new Transaction({
    name: '',
    description: '',
    date: new Date(),
    entries: [
      {account: null, amount: null},
      {account: null, amount: null}
    ],
  }).save()
})()

/* Route functions */

async function index(req, res, next) {
  try {
    // Deep populate the ledger
    ledgersCtrl.throwIfCantModify(req.user, req.session.activeLedger);
    let ledger = await Ledger.findById(req.session.activeLedger)
      .populate({
        path: 'transactions',
        populate: { path: 'entries' },
      })
      .exec()

    let transactions = ledger.transactions;

    res.render('transactions/index', {
      title: 'Transactions',
      formTransaction: dummyTransaction,
      transactions,
      ledger: ledger || 'none'
    });
  } catch(err) {
    next(err);
  }
};

async function create(req, res, next) {
  try {
    ledgersCtrl.throwIfCantModify(req.user, req.session.activeLedger);

    let ledger = await Ledger.findById(req.session.activeLedger)
    let newTransaction = new Transaction({
      name: req.body.name,
      date: req.body.date,
      entries: []
    });

    // TODO this is hardcoded to 2 lines, make it variable
    for (let i = 0; i <= 1; i++) {
      let entry = {
        account: req.body['account-' + i],
        amount: req.body['amount-' + i],
        commodity: DEFAULT_COMMODITY,
      };

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

async function edit(req, res) {
  try {
    let transaction = await Transaction.findById(req.params.id)

    res.render('transactions/edit', {
      title: 'Transactions - Edit Transaction',
      transaction,  
    });
  } catch(err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    await Transaction.findByIdAndUpdate(req.params.id, transactionFromForm(req.body));
    res.redirect('/transactions');
  } catch(err) {
    next(err);
  }
}

async function _delete(req, res, next) {
  try {
    let ledger = await Ledger.findOne({ transactions: req.params.id });
    if (!ledger.owner._id.equals(req.user._id)) {
      throw new Error('You do not own this transaction\'s ledger!');   
    }
    await Transaction.findByIdAndDelete(req.params.id)
    res.redirect('/transactions');
  } catch(err) {
    next(err);
  }
}

module.exports = {
  index,
  create,
  edit,
  update,
  delete: _delete,
}
