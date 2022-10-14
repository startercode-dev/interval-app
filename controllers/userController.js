const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const crudHandler = require('./crudHandlers');

// ADMIN
exports.getAllUser = crudHandler.getAll(User);
// exports.getUser = crudHandler.getOne(User, { path: 'presets' });

// USER
exports.updateMe = catchAsync(async (req, res, next) => {
    // create error for password change
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError('not for password updates, use /updateMyPassword', 400)
        );
    }

    // filter unwanted fields
    const filteredBody = filterObj(req.body, 'name', 'email');

    // update user
    const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updateUser,
        },
    });
});

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};
