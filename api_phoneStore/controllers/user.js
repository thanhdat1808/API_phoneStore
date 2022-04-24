const user = require('../models/account')
const bcrypt = require('bcryptjs')
const order = require('../models/order')

class userController{
    getUser = async (req,res, next) => {
        user.findOne({_id:req.params.id})
            .then(users =>{
                res.send(users)
            })
            .catch(error => {
                res.send("error")
            })   
    }
    changeUser(req, res) {
        user
        .findOneAndUpdate(
            {
                _id: req.body.id
            }, 
            {
                fullname: req.body.fullname,
                gender: req.body.gender,
                birthday: req.body.birthday,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                address: req.body.address
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
    async changePassword(req, res) {
        const findUser = await user.findOne({_id: req.body.id});
        const checkOldPassword = await bcrypt.compare(req.body.old_password, findUser.password);
        if (!checkOldPassword) return res.status(422).send('Old password is not correct');
        const checkNewPassword = await bcrypt.compare(req.body.new_password, findUser.password);
        if (checkNewPassword) return res.status(422).send('The new password must not be the same as the old password');
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.new_password, salt);
        user
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
    changeAddress(req, res) {
        user
        .findOneAndUpdate(
            {
                _id: req.body.id
            }, 
            {
                address: req.body.address
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
    async changeAvatar(req, res) {
        user
        .findOneAndUpdate(
            {
                _id: req.body.id
            }, 
            {
                avatar: req.body.avatar
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
    async getOrderUser(req, res) {
        order.find({idUser:req.params.id})
            .then(orders => {
                res.send(orders)
            })
            .catch(err => {
                res.send('Error')
            })
    }
    async cancelOrder(req, res) {
        order
        .findOneAndUpdate(
            {
                _id: req.body.id
            }, 
            {
                status: 5
            },
            {
            new: true,                       
            runValidators: true
            })
        .then(doc => {
            res.send('cancel success')
        })
        .catch(err => {
            res.send('error')
        })
    }
    async getOrderUser(req, res) {
        order.find({idUser: req.params.id_user})
        .then(orders => {
            res.send(orders)
        })
        .catch(error => {
            res.send('error')
        })
    }
}

module.exports = new userController
