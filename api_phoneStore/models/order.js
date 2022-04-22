var mongoose = require('../connection');

const Schema = mongoose.Schema

const OrderSchema = new Schema({
    idUser:{
        type:String,
        required:true
    },
    total:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        max:5,
        min:1,
        default:1,
        required:true
    },
    detail:{
        type: Array,
        required: true
    },
    createAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model('orders',OrderSchema)