const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const presetController = require('../controllers/presetController');

router
    .route('/')
    .get(
        authController.protect,
        authController.restrictTo('admin'),
        presetController.getAllPreset
    )
    .post(authController.protect, presetController.createPreset);

router
    .route('/:id')
    .patch(presetController.updatePreset)
    .delete(presetController.deletePreset);

module.exports = router;
