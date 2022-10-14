const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const data = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data,
        });
    });

exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);

        const data = await query;

        if (!data) {
            return next(new AppError('no data found', 404));
        }

        res.status(200).json({
            status: 'success',
            data,
        });
    });

exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!data) {
            return next(new AppError('no data found', 404));
        }

        res.status(200).json({
            status: 'success',
            data,
        });
    });

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const data = await Model.findByIdAndDelete(req.params.id);

        if (!data) {
            return next(new AppError('no data found', 404));
        }

        res.status(204).json({
            status: 'success',
            msg: 'deleted',
            data: null,
        });
    });

// ADMIN
exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        const data = await Model.find();

        res.status(200).json({
            status: 'success',
            results: data.length,
            data,
        });
    });
