"use strict";

export const state = {
    setting: {},
    isStopped: true,
    isPaused: false,
};

export const updateTime = () => {
    state.setting = {
        numExercises:
            $("#numExercises").val() * 1 ? $("#numExercises").val() * 1 : 1,
        timeExercise: $("#timeExercise").val() * 1, // ? $("#timeExercises").val() * 1 : 0,
        restExercise: $("#restExercise").val() * 1, // ? $("#restExercises").val() * 1 : 0,
        numSets: $("#numSets").val() * 1 ? $("#numSets").val() * 1 : 1,
        restSet: $("#restSet").val() * 1, // ? $("#restSet").val() * 1 : 0,
    };
};
