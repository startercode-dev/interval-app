const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'need name cuh'],
            trim: true,
        },

        email: {
            type: String,
            required: [true, 'need email cuh'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'not valid email'],
            trim: true,
        },

        password: {
            type: String,
            required: [true, 'need password dumbass'],
            minlength: 2,
            select: false,
        },

        passwordConfirm: {
            type: String,
            required: [true, 'need to confirm'],
            validate: {
                // ONLY WORKS IN CREATE AND SAVE
                validator: function (el) {
                    return el === this.password;
                },
                msg: 'password dont match cuh',
            },
        },

        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },

        active: {
            type: Boolean,
            default: true,
            select: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.virtual('presets', {
    ref: 'Preset',
    foreignField: 'user',
    localField: '_id',
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
});

userSchema.methods.correctPassword = async function (
    inputPassword,
    userPassword
) {
    return await bcrypt.compare(inputPassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
