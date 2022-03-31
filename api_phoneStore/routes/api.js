var express = require('express');
var router = express.Router();
const auth_Controller = require('../controllers/auth')
const verifyToken = require('../middlewares/verification/verifyToken')
/* GET home page. */
router.route('/register').post(auth_Controller.register)
router.route('/login').post(auth_Controller.login)
router.route('/home').post(
    verifyToken,
    function(req, res) {
        res.send("home")
    }
)

module.exports = router;
