var mongoose = require('mongoose')

let entrySchema = new mongoose.Schema({
  account: {
    type: String,
  },
  amount: {
    type: Number,
  },
  commodity: String,
});

let transactionSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  entries: {
    type: [entrySchema],
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
