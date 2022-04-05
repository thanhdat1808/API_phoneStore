const product = require('../models/Iphone')

class controller_admin {
    async addproduct(req, res) {
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
}
module.exports = new controller_admin
