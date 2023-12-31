var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  meal: Boolean,
  qrcode: Boolean,
  qrlink: String,
  mealHistory: [Date],
}, { collection: "users"});

let userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;