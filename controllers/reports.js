var Ledger = require('../models/ledger');

function index(req, res, next) {
  res.render('reports/index', { title: 'Reports' });
}

async function showNetworth(req, res, next) {
  try {
    let ledger = await Ledger.findById(req.session.activeLedger)
      .populate({
        path: 'transactions',
        populate: {
          path: 'entries',
        }
      })
      .exec();

    let netWorth = 0;
    // TODO simply selects second row, FIXME
    for (transaction of ledger.transactions) {
      netWorth += transaction.entries[1].amount;
    }

    res.render('reports/networth', {
      title: 'Reports - Net Worth',
      netWorth
    });
  } catch(err) {
    next(err);
  }
}

module.exports = {
  index,
  showNetworth,
}
