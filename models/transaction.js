var mongoose = require('mongoose')

transactionSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  entry: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Entry' }],
});

module.exports = mongoose.model('Transaction', transactionSchema);
