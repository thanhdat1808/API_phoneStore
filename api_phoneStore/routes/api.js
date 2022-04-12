var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth')
const adminController = require('../controllers/admin')
const iphoneController = require('../controllers/iphone')
const userController = require('../controllers/user')
const verifyToken = require('../middlewares/verification/verifyToken')

/* GET home page. */
router.route('/register').post(authController.register)
router.route('/login').post(authController.login)

router.route('/getUser/:id').get(verifyToken, userController.getUser)
router.route('/changeUser').post(verifyToken, userController.changeUser)
router.route('/changePassword').post(verifyToken, userController.changePassword)

router.route('/addproduct').post(adminController.addproduct)

router.route('/iphone/getFeaturedProduct').get(iphoneController.getDataFeatured)

router.route('/getprice/:id/:memory').get(iphoneController.getPrice)
router.route('/iphone/:id').get(iphoneController.getDetail)
router.route('/iphone').get(iphoneController.getData)

module.exports = router;
