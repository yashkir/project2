var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  ledgers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ledger'
  }],
},
{
  timestamps: true
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
