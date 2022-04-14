const product = require('../models/Iphone')
const user = require('../models/account')

class controller_admin {
    async addProduct(req, res) {
        console.log(req.body);
        const dataproduct = new product({
            name: req.body.name,
            type: req.body.type,
            chip: req.body.chip,
            display: req.body.display,
            os: req.body.os,
            backcamera: req.body.backcamera,
            frontcamera: req.body.frontcamera,
            ram: req.body.ram,
            sim: req.body.sim,
            pin: req.body.pin,
            images: req.body.images,
            description: req.body.description,
            view: req.body.view,
            sale: req.body.sale
        });
    
        try {
            const newProduct = await dataproduct.save();
            await res.send("add success")
        } catch (err) {
            res.status(400).send(err);
        }
    }
    async changeProduct(req, res) {
        product
        .findOneAndUpdate(
            {
                _id: req.body.id
            }, 
            {
                name: req.body.name,
                type: req.body.type,
                chip: req.body.chip,
                display: req.body.display,
                os: req.body.os,
                backcamera: req.body.backcamera,
                frontcamera: req.body.frontcamera,
                ram: req.body.ram,
                sim: req.body.sim,
                pin: req.body.pin,
                images: req.body.images,
                description: req.body.description
            },
            {
            new: true,                       
            runValidators: true
            })
        .then(doc => {
            res.send("success")
        })
        .catch(err => {
            res.send("error")
        })
    }
    async deleteProduct(req, res) {
        product.deleteOne({_id:req.body.id}).then(() => {
            res.send("success")
        }) 
        .catch(err => {
            res.send("error")
        })
    }
    getAllUser = async (req,res, next) => {
        user.find({})
            .then(users =>{
                res.send(users)
            })
            .catch(next)
        
    }
}
module.exports = new controller_admin
