var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  ledgers: {
    type: String, //TODO set foreign reference here
  },
});

module.exports = mongoose.model('User', userSchema);
