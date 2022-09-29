const Preset = require('../models/presetModel');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');
const crudHandler = require('./crudHandlers');

exports.setUserId = (req, res, next) => {
    // nested routes, for the required User field to create a preset
    if (!req.body.user) req.body.user = req.user.id;

    next();
};

exports.createPreset = crudHandler.createOne(Preset);
exports.getPreset = crudHandler.getOne(Preset);
exports.updatePreset = crudHandler.updateOne(Preset);
exports.deletePreset = crudHandler.deleteOne(Preset);

exports.getAllPreset = crudHandler.getAll(Preset);
