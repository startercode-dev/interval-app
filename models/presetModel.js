const mongoose = require('mongoose');

const presetSchema = new mongoose.Schema({
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
});

const Preset = mongoose.model('preset', presetSchema);

module.exports = Preset;
