var mongoose = require('../connection');

var Schema = mongoose.Schema;

var accSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true,
        unique:false
    },
    gender:{
        type:String,
        required:true
    },
    birthday:{
        type:Date,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
  });
var account = mongoose.model('accounts', accSchema);

module.exports = account;