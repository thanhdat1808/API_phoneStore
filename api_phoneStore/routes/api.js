var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth')
const adminController = require('../controllers/admin')
const iphoneController = require('../controllers/iphone')
const userController = require('../controllers/user')
const verifyToken = require('../middlewares/verification/verifyToken');
const admin = require('../controllers/admin');

/* GET home page. */
// Auth
router.route('/register').post(authController.register)
router.route('/login').post(authController.login)
// User
router.route('/getUser/:id').get(verifyToken, userController.getUser)
router.route('/changeUser').post(verifyToken, userController.changeUser)
router.route('/changePassword').post(verifyToken, userController.changePassword)
router.route('/changeAddress').post(verifyToken, userController.changeAddress)
// Admin
router.route('/getAllUser').get(adminController.getAllUser)
router.route('/addProduct').post(adminController.addProduct)
router.route('/changeProduct').post(adminController.changeProduct)
router.route('/deleteProduct').post(adminController.deleteProduct)
router.route('/addOder').post(adminController.addOder)
//Get product
router.route('/iphone/getFeaturedProduct').get(iphoneController.getDataFeatured)

router.route('/getprice/:id/:memory').get(iphoneController.getPrice)
router.route('/iphone/:id').get(iphoneController.getDetail)
router.route('/iphone').get(iphoneController.getData)

module.exports = router;
