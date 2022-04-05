var mongoose = require('../connection');

const Schema = mongoose.Schema

const UserSchema = new Schema({
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
        required:true
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

})

module.exports = mongoose.model('users',UserSchema)