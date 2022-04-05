var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth')
const adminController = require('../controllers/admin')
const iphoneController = require('../controllers/iphone')
const verifyToken = require('../middlewares/verification/verifyToken')

/* GET home page. */
router.route('/register').post(authController.register)
router.route('/login').post(authController.login)

router.route('/addproduct').post(adminController.addproduct)

router.route('/iphone/getFeaturedProduct').get(iphoneController.getDataFeatured)

router.route('/getprice/:id/:memory').get(iphoneController.getPrice)
router.route('/iphone/:id').get(iphoneController.getDetail)

module.exports = router;
