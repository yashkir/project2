var Ledger = require('../models/ledger');

function throwIfCantModify(user, ledgerId) {
  if (!user?.ledgers.includes(ledgerId)) {
    throw new Error("Access Denied");
  }
}

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

async function _delete(req, res, next) {
  try {
    throwIfCantModify(req.user, req.params.id);
    if (!req.user.ledgers.includes(req.params.id)) {
      throw new Error('User does not own this Ledger');
    }
    await Ledger.deleteOne({ _id: req.params.id });
    res.redirect('/ledgers');
  } catch(err) {
    next(err);
  }
}

function select(req, res) {
  throwIfCantModify(req.user, req.params.id);
  req.session.activeLedger = req.params.id;
  res.redirect('/transactions');
}

module.exports = {
  index,
  create,
  delete: _delete,
  select,
  throwIfCantModify,
}
