const product = require('../models/Iphone')
const user = require('../models/account')
const order = require('../models/order')
const admins = require('../models/admin')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

class controller_admin {
    async login(req, res) {
        const admin = await admins.findOne({username: req.body.username});
        if (!admin) return res.status(422).send('Username is not correct');
        
        const checkPassword = await bcrypt.compare(req.body.password, admin.password);
        
        if (!checkPassword) return res.status(422).send('Email or Password is not correct');
        
        const token = jwt.sign({_id: admin._id}, process.env.TOKEN_SECRET, { expiresIn: "1h" });

        const id = admin._id
        res.send({token, id});
    }
    async changePassword(req, res) {
        const find = await admins.findOne({_id: req.body.id});
        const checkOldPassword = await bcrypt.compare(req.body.old_password, find.password);
        if (!checkOldPassword) return res.status(422).send('Old password is not correct');
        const checkNewPassword = await bcrypt.compare(req.body.new_password, find.password);
        if (checkNewPassword) return res.status(422).send('The new password must not be the same as the old password');
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.new_password, salt);
        admins
        .findOneAndUpdate(
            {
                _id: req.body.id
            }, 
            {
                password: hashPassword
            },
            {
            new: true,                       
            runValidators: true
            })
        .then(doc => {
            res.send('update success')
        })
        .catch(err => {
            res.send('error')
        })
    }
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
    async addOrder(req, res) {
        console.log(req.body);
        const dataOder = new oder({
            idUser: req.body.idUser,
            total: req.body.total,
            detail: req.body.detail,
            status: req.body.status
        });
    
        try {
            const newOder = await dataOder.save();
            await res.send("add success")
        } catch (err) {
            res.status(400).send('error');
        }
    }
    async getOder(req, res) {
        order.find({})
            .then(oders =>{
                res.send(oders)
            })
            .catch(error => {
                res.send('error')
            })
    }
    async changeStatusOder(req, res) {
        order
        .findOneAndUpdate(
            {
                _id: req.body.id
            }, 
            {
                status: req.body.status
            },
            {
            new: true,                       
            runValidators: true
            })
        .then(doc => {
            res.send('update success')
        })
        .catch(err => {
            res.send('error')
        })
    }
    listOder = async (req,res, next) => {
        order.find({})
            .then(oders =>{
                res.send(oders)
            })
            .catch(next)
    }
    async getRevenue(req, res) {
        order.find({_id:req.body.id, status: 5})
            .then(oders => {
                res.send(oders)
            })
            .catch(error => {
                res.send('error')
            })
    }
}
module.exports = new controller_admin
