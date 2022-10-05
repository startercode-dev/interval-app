import * as model from './model.js';

export const calcTime = function () {
    const { numExercise, timeExercise, restExercise, numSet, restSet } =
        model.state.setting;

    return numSet > 1
        ? ((timeExercise + restExercise) * numExercise - restExercise) *
              numSet +
              (numSet * restSet - restSet)
        : (timeExercise + restExercise) * numExercise - restExercise;
};

export const formatTime = function (s) {
    const mins = Math.floor(s / 60);
    let secs = s % 60;
    if (secs < 10) secs = `0${secs}`;
    return `${mins}:${secs}`;
};
