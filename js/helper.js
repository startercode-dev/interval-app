import * as model from "./model.js";

export const calcTime = function () {
    const { numExercises, timeExercise, restExercise, numSets, restSet } =
        model.state.setting;

    return numSets > 1
        ? ((timeExercise + restExercise) * numExercises - restExercise) *
              numSets +
              (numSets * restSet - restSet)
        : (timeExercise + restExercise) * numExercises - restExercise;
};

export const formatTime = function (s) {
    const mins = Math.floor(s / 60);
    let secs = s % 60;
    if (secs < 10) secs = `0${secs}`;
    return `${mins}:${secs}`;
};
