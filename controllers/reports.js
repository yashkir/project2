var Ledger = require('../models/ledger');

async function getTotals(ledgerId, startDate=null, endDate=null) {
  let ledger = await Ledger.findById(ledgerId)
    .populate('transactions')
    .exec();

  let totals = {};

  /* Total up all the amounts per account and per commodity
   * TODO - handle empty entry.amount values */
  for (transaction of ledger.transactions) {
    if ((startDate && startDate >= transaction.date) ||
        (endDate && endDate <transaction.date)) {
      continue;
    }

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

  return totals;
}

function index(req, res, next) {
  res.render('reports/index', { title: 'Reports' });
}

async function showNetworth(req, res, next) {
  try {
    let totals = await getTotals(req.session.activeLedger);

    res.render('reports/networth', {
      title: 'Reports - Net Worth',
      totals,
    });
  } catch(err) {
    next(err);
  }
}

async function showMonthly(req, res, next) {
  try {
    let now = new Date();
    let startDate = new Date();

    startDate.setDate(-31);
    let endDate = now;

    let totals = await getTotals(req.session.activeLedger, startDate, endDate);

    res.render('reports/monthly', {
      title: 'Reports - Monthly',
      startDate,
      endDate,
      totals
    });
  } catch(err) {
    next(err);
  }
}

module.exports = {
  index,
  showNetworth,
  showMonthly,
}
