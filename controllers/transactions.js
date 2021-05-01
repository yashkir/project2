function index(req, res, next) {
  res.render('transactions/index', { title: 'Transactions' });
};

function create(req, res, next) {
  //TODO create stuff here
  res.redirect('/transactions');
};

module.exports = {
  index,
  create
}
