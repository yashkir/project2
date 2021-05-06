var mongoose = require('mongoose')

let ledgerSchema = new mongoose.Schema({
  name: String,
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  transactions: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'
  }],
},
{
  timestamps: true
});

module.exports = mongoose.model('Ledger', ledgerSchema);
