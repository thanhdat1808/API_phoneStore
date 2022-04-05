const Iphone = require('../models/Iphone')

class IphoneController{
    getData = async (req,res, next) =>{
        Iphone.find({})
            .then(iphones =>{
                iphones = iphones.map(iphone => iphone.toObject())
                res.send(iphones)
            })
            .catch(next)
        
    }
    getDetail = async (req,res,next) =>{
        Iphone.findById(req.params.id)
            .then(iphones =>{
                res.send(iphones.toJSON())
            })
            .catch(next)
    }
    getDataFeatured = async (req,res, next) =>{
        Iphone.find({})
            .sort({view : -1})
            .limit( 4 )
            .then(iphones =>{
                res.send(iphones)
            })
            
            .catch(next)
        
    }
    async getPrice(req, res, next) {
        console.log(req.params.memory);
        Iphone.findById(req.params.id)
        .then(iphones =>{
            res.send(iphones.type[req.params.memory].price)
        })
        .catch(next)
    }
}

module.exports = new IphoneController