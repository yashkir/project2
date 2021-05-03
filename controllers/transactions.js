let Transaction = require('../models/transaction');
let Entry = require('../models/entry');

const DEFAULT_COMMODITY = '$';

function index(req, res, next) {
  res.render('transactions/index', { title: 'Transactions' });
};

async function create(req, res, next) {
  try {
    let newTransaction = await Transaction.create({
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
    next(err);
  }
};

module.exports = {
  index,
  create
}
