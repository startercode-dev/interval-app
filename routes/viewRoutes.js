const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getAppPage);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSignupForm);
router.get('/forgotPassword', viewController.getForgotPasswordForm);
router.get('/resetPassword/:token', viewController.getResetPasswordForm);

module.exports = router;
