var express = require('express');
var router = express.Router();
const auth_Controller = require('../controllers/auth')
/* GET home page. */
router.route('/register').post(auth_Controller.register)
router.route('/login').post(auth_Controller.login)

module.exports = router;
