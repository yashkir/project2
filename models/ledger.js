var mongoose = require('mongoose')

ledgerSchema = new mongoose.Schema({
  name: String,
  description: String,
  transactions: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'
  }],
},
{
  timestamps: true
});

module.exports = mongoose.model('Ledger', ledgerSchema);
