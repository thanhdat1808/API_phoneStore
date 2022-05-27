const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const account = require('../models/account');
const validator = require('../middlewares/validation/validator');

const dotenv = require('dotenv');

dotenv.config();

class controller_auth {
    async register(req, res) {
        console.log(req.body);
        const { error } = validator.registerValidator(req.body);

        if (error) {
            console.log(error);
            return res.status(422).send(error.details[0].message);
        }
        const checkUserExist = await account.findOne({ username: req.body.username });

        if (checkUserExist) return res.status(422).send('Người dùng đã tồn tại');

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const user = new account({
            username: req.body.username,
            password: hashPassword,
            fullname: req.body.fullname,
            avatar: "https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744004?k=20&m=1016744004&s=612x612&w=0&h=Z4W8y-2T0W-mQM-Sxt41CGS16bByUo4efOIJuyNBHgI=",
            gender: req.body.gender,
            birthday: req.body.birthday,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            address: req.body.address
        });

        try {
            const newacc = await user.save();
            if (newacc) {
                await res.send("register success")
            }
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
    async login(req, res) {
        console.log(req.body);
        const user = await account.findOne({ username: req.body.username });
        console.log(user);
        if (!user) return res.status(422).send('Tên đăng nhập không tồn tại');

        const checkPassword = await bcrypt.compare(req.body.password, user.password);

        if (!checkPassword) return res.status(422).send('Mật khẩu không chính xác');

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "10000h" });
        console.log("okeee")
        const id = user._id
        res.send({ token, id });
    }
}

module.exports = new controller_auth
