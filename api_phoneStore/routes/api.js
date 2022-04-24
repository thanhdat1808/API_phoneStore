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
router.route('/getUser/:id').get(verifyToken.User, userController.getUser)
router.route('/changeUser').post(verifyToken.User, userController.changeUser)
router.route('/changePassword').post(verifyToken.User, userController.changePassword)
router.route('/changeAddress').post(verifyToken.User, userController.changeAddress)
router.route('/changeAvatar').post(verifyToken.User, userController.changeAvatar)
router.route('/getOrderUser/:id').get(verifyToken.User, userController.getOrderUser)
router.route('/addOrder').post(verifyToken.User, adminController.addOrder)
router.route('/cancelOrder').post(verifyToken.User, userController.cancelOrder)
// Admin
router.route('/admin/login').post(adminController.login)
router.route('/admin/changePassword').post(verifyToken.Admin, adminController.changePassword)
router.route('/getAllUser').get(verifyToken.Admin, adminController.getAllUser)
router.route('/addProduct').post(verifyToken.Admin, adminController.addProduct)
router.route('/changeProduct').post(verifyToken.Admin, adminController.changeProduct)
router.route('/deleteProduct').post(verifyToken.Admin, adminController.deleteProduct)
router.route('/listOrder').get(verifyToken.Admin, adminController.listOrder)
router.route('/getRevenue').post(verifyToken.Admin, adminController.getRevenue)
router.route('/changeStatusOrder').post(verifyToken.Admin, adminController.changeStatusOrder)
//Get product
router.route('/iphone/getFeaturedProduct').get(iphoneController.getDataFeatured)
router.route('/getprice/:id/:memory').get(iphoneController.getPrice)
router.route('/iphone/:id').get(iphoneController.getDetail)
router.route('/iphone').get(iphoneController.getData)

module.exports = router;
