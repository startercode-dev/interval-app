const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAppPage = catchAsync(async (req, res, next) => {
    if (req.user) {
        const user = await User.findById(req.user.id).populate({
            path: 'presets',
        });

        return res.status(200).render('app', {
            user,
            title: 'timer',
        });
    }

    res.status(200).render('app', {
        title: 'timer',
    });
});

exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'log in',
    });
};

exports.getSignupForm = (req, res) => {
    res.status(200).render('signup', {
        title: 'sign up',
    });
};

exports.getForgotPasswordForm = (req, res) => {
    res.status(200).render('forgotPassword', {
        title: 'forgot password',
    });
};

exports.getResetPasswordForm = (req, res) => {
    res.status(200).render('resetPassword', {
        title: 'reset password',
    });
};

exports.getAccount = (req, res) => {
    res.status(200).render('account', {
        title: 'my account',
    });
};
