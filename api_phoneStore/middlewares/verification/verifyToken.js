const jwt = require('jsonwebtoken');
const account = require('../../models/account');

module.exports = (req, res, next) => {
    const token = req.params.token || req.body.token;
    console.log(token);
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = account.findOne({_id: verified._id});
        if(user) next();
        else res.send("Err")
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
};