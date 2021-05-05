var mongoose = require('mongoose')

entrySchema = new mongoose.Schema({
  account: {
    type: String,
  },
  amount: {
    type: Number,
  },
  commodity: String,
});

transactionSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  entries: {
    type: [entrySchema],
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
