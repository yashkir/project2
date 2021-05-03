var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  ledgers: {
    type: String, //TODO set foreign reference here
  },
},
{
  timestamps: true
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
