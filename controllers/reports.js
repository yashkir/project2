var Ledger = require('../models/ledger');

function index(req, res, next) {
  res.render('reports/index', { title: 'Reports' });
}

async function showNetworth(req, res, next) {
  try {
    let ledger = await Ledger.findById(req.session.activeLedger)
      .populate('transactions')
      .exec();

    let totals = {};

    /* Total up all the amounts per account and per commodity
     * TODO - handle empty entry.amount values */
    for (transaction of ledger.transactions) {
      for (entry of transaction.entries) {
        if (!totals[entry.account]) {
          totals[entry.account] = {};
        }
        if (!totals[entry.account][entry.commodity]) {
          totals[entry.account][entry.commodity] = 0;
        }

        totals[entry.account][entry.commodity] += entry.amount;
      }
    }

    res.render('reports/networth', {
      title: 'Reports - Net Worth',
      totals,
    });
  } catch(err) {
    next(err);
  }
}

module.exports = {
  index,
  showNetworth,
}
