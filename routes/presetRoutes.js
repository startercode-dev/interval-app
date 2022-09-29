const express = require('express');
const authController = require('../controllers/authController');
const presetController = require('../controllers/presetController');

const router = express.Router();

router.use(authController.protect);

router
    .route('/')
    .get(authController.restrictTo('admin'), presetController.getAllPreset)
    .post(presetController.setUserId, presetController.createPreset);

router
    .route('/:id')
    .get(presetController.getPreset)
    .patch(presetController.updatePreset)
    .delete(presetController.deletePreset);

module.exports = router;
