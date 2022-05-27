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
        const admin = await admins.findOne({ username: req.body.username });
        if (!admin) return res.status(422).send('Username is not correct');

        const checkPassword = await bcrypt.compare(req.body.password, admin.password);

        if (!checkPassword) return res.status(422).send('Email or Password is not correct');

        const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET, { expiresIn: "100h" });

        const id = admin._id
        res.send({ token, id });
    }
    async changePassword(req, res) {
        const find = await admins.findOne({ _id: req.body.id });
        const checkOldPassword = await bcrypt.compare(req.body.old_password, find.password);
        if (!checkOldPassword) return res.status(422).send('Mật khẩu cũ không chính xác');
        const checkNewPassword = await bcrypt.compare(req.body.new_password, find.password);
        if (checkNewPassword) return res.status(422).send('Mật khẩu mới không được giống mật khẩu cũ');
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
                res.send('Cập nhật mật khẩu thành công')
            })
            .catch(err => {
                res.send('error')
            })
    }
    async addProduct(req, res) {
        console.log(req.body);
        const data = req.body.data
        const dataproduct = new product({
            name: data.name,
            type: data.type,
            chip: data.chip,
            display: data.display,
            os: data.os,
            backcamera: data.backcamera,
            frontcamera: data.frontcamera,
            ram: data.ram,
            sim: data.sim,
            pin: data.pin,
            images: data.images,
            description: data.description,
            view: data.view,
            sale: data.sale
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
        product.deleteOne({ _id: req.body.id }).then(() => {
            res.send("success")
        })
            .catch(err => {
                res.send("error")
            })
    }
    getAllUser = async (req, res, next) => {
        user.find({})
            .then(users => {
                res.send(users)
            })
            .catch(next)

    }
    async addOrder(req, res) {
        console.log(req.body);
        const dataOrder = new order({
            idUser: req.body.idUser,
            total: req.body.total,
            detail: req.body.detail,
            status: req.body.status
        });

        try {
            const newOrder = await dataOrder.save();
            await res.send("add success")
        } catch (err) {
            res.status(400).send('error');
        }
    }
    async getOrder(req, res) {
        order.find({})
            .then(orders => {
                res.send(orders)
            })
            .catch(error => {
                res.send('error')
            })
    }
    async changeStatusOrder(req, res) {
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
    listOrder = async (req, res, next) => {
        order.find({})
            .then(orders => {
                res.send(orders)
            })
            .catch(next)
    }
    async getRevenue(req, res) {
        order.find({ _id: req.body.id, status: 4 })
            .then(orders => {
                res.send(orders)
            })
            .catch(error => {
                res.send('error')
            })
    }
    async filterOrder(req, res) {
        let limit = {}
        let query = {}
        if (req.body.date_start != "") {
            limit.$gte = new Date(req.body.date_start)
        }
        if (req.body.date_end != "") {
            limit.$lt = new Date(req.body.date_end)
        }
        if (limit.$gte || limit.$lt) {
            query = { createAt: limit }
        }
        order.find(query).then(orders => {
            res.send(orders)
        })
            .catch(error => {
                res.send('error')
            })
    }
}
module.exports = new controller_admin
