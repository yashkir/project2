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

entrySchema.methods.getFormattedAmount = function() {
  if (typeof this.amount !== 'number') {
    return '';
  }
    
  if (this.amount < 0) {
    return `<span class="red-text">${this.commodity}${(this.amount * -1).toFixed(2)}</span>`;
  } else {
    return `${this.commodity}${this.amount.toFixed(2)}`;
  }
}

let transactionSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  entries: {
    type: [entrySchema],
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
