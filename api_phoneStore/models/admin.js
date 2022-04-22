var mongoose = require('../connection');

var Schema = mongoose.Schema;

var adminSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
  });
var admin = mongoose.model('admins', adminSchema);

module.exports = admin;