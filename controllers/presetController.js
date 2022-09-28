const Preset = require('../models/presetModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createPreset = catchAsync(async (req, res, next) => {
    const newPreset = await Preset.create(req.body);

    res.status(201).json({
        data: {
            preset: newPreset,
        },
    });
});

exports.updatePreset = catchAsync(async (req, res, next) => {
    const preset = await Preset.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!preset) {
        return next(new AppError('no preset found', 404));
    }

    res.status(200).json({
        msg: 'updated',
        data: preset,
    });
});

exports.deletePreset = catchAsync(async (req, res, next) => {
    const preset = await Preset.findByIdAndDelete(req.params.id);

    if (!preset) {
        return next(new AppError('no preset found', 404));
    }

    res.status(204).json({
        msg: 'deleted',
    });
});

exports.getAllPreset = catchAsync(async (req, res, next) => {
    const presets = await Preset.find();

    res.status(200).json({
        data: {
            results: presets.length,
            preset: presets,
        },
    });
});
