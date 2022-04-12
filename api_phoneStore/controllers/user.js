const user = require('../models/account')
const bcrypt = require('bcryptjs')

class userController{
    getUser = async (req,res, next) => {
        user.findOne({_id:req.params.id})
            .then(users =>{
                res.send(users)
            })
            .catch(next)
        
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
            console.error(err)
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
            console.error(err)
        })
    }
}

module.exports = new userController