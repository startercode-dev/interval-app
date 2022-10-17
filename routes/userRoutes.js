const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);
router.patch('/updateMe', userController.updateMe);
router.patch('/updateMyPassword', authController.updatePassword);

// ADMIN
router
    .route('/')
    .get(
        authController.protect,
        authController.restrictTo('admin'),
        userController.getAllUser
    );

// router.route('/:id').get(authController.protect, userController.getUser);

module.exports = router;
