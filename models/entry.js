var mongoose = require('mongoose')

entrySchema = new mongoose.Schema({
  account: {
    type: String,
    required: true, //TODO foreign key
  },
  amount: {
    type: Number,
    required: true,
  },
  commodity: String,
});

module.exports = mongoose.model('Entry', entrySchema);
