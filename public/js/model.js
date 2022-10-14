import $ from 'jquery';

export const state = {
    setting: {},
    isStopped: true,
    isPaused: false,
};

export const updateTime = () => {
    state.setting = {
        numExercise: +$('#numExercise').val() ? +$('#numExercise').val() : 1,
        timeExercise: +$('#timeExercise').val(),
        restExercise: +$('#restExercise').val(),
        numSet: +$('#numSet').val() ? +$('#numSet').val() : 1,
        restSet: +$('#restSet').val(),
    };
};
