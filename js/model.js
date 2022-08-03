export const state = {
    setting: {},
};

export const updateTime = () => {
    state.setting = {
        numExercises:
            $("#numExercises").val() * 1 ? $("#numExercises").val() * 1 : 1,
        timeExercise: $("#timeExercise").val() * 1,
        restExercise: $("#restExercise").val() * 1,
        numSets: $("#numSets").val() * 1 ? $("#numSets").val() * 1 : 1,
        restSet: $("#restSet").val() * 1,
    };
    // console.log(state.setting);
};
