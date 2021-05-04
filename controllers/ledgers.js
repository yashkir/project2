var Ledger = require('../models/ledger');

async function index(req, res, next) {
  try {
    let ledgers = await Ledger.find({ owner: req.user._id })
    res.render("ledgers/index", { title: 'Ledgers', ledgers });
  } catch(err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    let newLedger = new Ledger(req.body);

    newLedger.owner = req.user;
    req.user.ledgers.push(newLedger);

    await newLedger.save()
    await req.user.save();
  } catch(err) {
    return next(err);
  }

  res.redirect('/ledgers');
}

function _delete(req, res) {
  res.send("empty route");
}

module.exports = {
  index,
  create,
  delete: _delete,
}
