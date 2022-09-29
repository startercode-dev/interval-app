const mongoose = require('mongoose');

const presetSchema = new mongoose.Schema(
    {
        numExercise: {
            type: Number,
            required: true,
            default: 1,
        },

        timeExercise: {
            type: Number,
            required: [true, 'must have exercise time'],
        },

        restExercise: Number,

        numSet: {
            type: Number,
            required: true,
            default: 1,
        },

        restSet: Number,

        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'must belong to a user'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

presetSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'email',
    });

    next();
});

const Preset = mongoose.model('preset', presetSchema);

module.exports = Preset;
