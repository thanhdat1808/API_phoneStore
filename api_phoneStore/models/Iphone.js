var mongoose = require('../connection');

const Schema = mongoose.Schema

const iPhoneSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    display:{
        type:String,
        required:true,
    },
    os:{
        type:String,
        required:true,
    },
    backcamera:{
        type:String,
        required:true,
    },
    frontcamera:{
        type:String,
        required:true,
    },
    type:{
        type:Array,
        required:true,
    },
    chip: {
        type:String,
        required:true,
    },
    ram:{
        type:String,
        required:true,
    },
    sim:{
        type:String,
        required:true,
    },
    pin:{
        type:String,
        required:true,
    },
    images:{
        type:Array,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    view:{
        type:Number,
        required:true,
    },
    sale:{
        type:Number,
        required: true,
        max: 100,
        min:0,
        default:100
    }
})

module.exports = mongoose.model('iphones',iPhoneSchema);