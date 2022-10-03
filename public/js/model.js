import $ from 'jquery';

export const state = {
    setting: {},
    isStopped: true,
    isPaused: false,
};

export const updateTime = () => {
    state.setting = {
        numExercises: +$('#numExercises').val() ? +$('#numExercises').val() : 1,
        timeExercise: +$('#timeExercise').val(),
        restExercise: +$('#restExercise').val(),
        numSets: +$('#numSets').val() ? +$('#numSets').val() : 1,
        restSet: +$('#restSet').val(),
    };
};
