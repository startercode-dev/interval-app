const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAppPage = catchAsync(async (req, res, next) => {
    if (req.user) {
        const user = await User.findById(req.user.id).populate({
            path: 'presets',
        });

        return res.status(200).render('app', {
            user,
        });
    }

    res.status(200).render('app');
});

exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'Log in',
    });
};
