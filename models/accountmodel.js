var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
  username: String,
  password: String,
  permissions: String
}, { collection: "accounts"});

let accountModel = mongoose.model('accountModel', accountSchema);

module.exports = accountModel;