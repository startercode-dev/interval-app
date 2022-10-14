const Preset = require('../models/presetModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const crudHandler = require('./crudHandlers');
const User = require('../models/userModel');

exports.setUserId = (req, res, next) => {
    // nested routes, for the required User field to create a preset
    if (!req.body.user) req.body.user = req.user.id;

    next();
};

exports.checkMaxPreset = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate({
        path: 'presets',
    });

    if (user.presets.length >= 5) {
        return next(
            new AppError(
                'reached max 5 presets, please delete a preset before saving a new one',
                400
            )
        );
    }
    next();
});

exports.createPreset = crudHandler.createOne(Preset);
exports.getPreset = crudHandler.getOne(Preset);
exports.updatePreset = crudHandler.updateOne(Preset);
exports.deletePreset = crudHandler.deleteOne(Preset);

exports.getAllPreset = crudHandler.getAll(Preset);
