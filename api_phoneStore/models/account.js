var mongoose = require('../connection');

var Schema = mongoose.Schema;

var accSchema = new Schema({
    username: String,
    password: String
  });
var account = mongoose.model('accounts', accSchema);

module.exports = account;