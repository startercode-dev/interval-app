import 'core-js/stable';
import 'regenerator-runtime/runtime';
import $ from 'jquery';
import * as model from './model.js';
import settingView from './views/settingView.js';
import timerView from './views/timerView.js';
import infoView from './views/infoView.js';
import loginView from './views/loginView.js';
import signupView from './views/signupView.js';
import accountView from './views/accountView.js';
import { login, logout } from './login.js';
import { calcTime, formatTime } from './helper.js';
import { createPreset } from './createPreset.js';
import { getPreset } from './getPreset.js';
import { updateSettings } from './updateSettings.js';
import { deletePreset } from './deletePreset.js';
import { updatePreset } from './updatePreset.js';
import { signup } from './signup.js';

let title;
let deletePresetId;
let updatePresetId;

// *********************
// TIMER CONTROL
// *********************
const controlUpdateViews = function () {
    model.updateTime();

    timerView.render(model.state.setting);
    infoView.render(model.state.setting);
};

const controlStart = async function (e) {
    e.preventDefault();

    settingView.passData(model.state.setting);
    const { timeExercise } = model.state.setting;
    if (!timeExercise) return;

    model.state.isStopped = false;

    $('.timer-clock__status').text('get ready');
    await timerView.readyCountdown();
    $('.timer-clock__status').text('');
    $('.btn--pause').prop('disabled', false);
    timerView.totalCountdown();
    timerView.mainCountdown();
};

const controlPause = function (e) {
    e.preventDefault();
    model.state.isPaused = true;
};

const controlResume = function (e) {
    e.preventDefault();

    model.state.isPaused = false;
};

const controlReset = function (e) {
    e.preventDefault();
    e.target.disabled = true;
    model.state.isPaused = false;
    model.state.isStopped = true;

    if ($('.info--title').text() === 'custom workout') {
        timerView.render(model.state.setting);
        infoView.render(model.state.setting);
    } else {
        timerView.render(model.state.setting);
        infoView.render(model.state.setting);
        $('.info--title').text(title);
    }
};

// *********************
// AUTH CONTROL
// *********************
const controlLogin = function (e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();

    login(email, password);
};

const controlSignup = function (e) {
    e.preventDefault();
    const name = $('#name').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const passwordConfirm = $('#password-confirm').val();

    signup({ name, email, password, passwordConfirm });
};

const controlSaveSetting = function (e) {
    e.preventDefault();

    const name = $('#name').val();
    const email = $('#email').val();

    updateSettings({ name, email }, 'data');
};

const controlSavePassword = async function (e) {
    e.preventDefault();
    $('.btn-auth-save__password').text('updating...');

    const passwordCurrent = $('#password-current').val();
    const password = $('#password').val();
    const passwordConfirm = $('#password-confirm').val();

    await updateSettings(
        { passwordCurrent, password, passwordConfirm },
        'password'
    );

    $('#password-current').val('');
    $('#password').val('');
    $('#password-confirm').val('');
    $('.btn-auth-save__password').text('save password');
};

// *********************
// PRESET CONTROL
// *********************
const controlSaveTimer = function (e) {
    settingView.passData(model.state.setting);

    const { timeExercise } = model.state.setting;
    if (!timeExercise) return;

    e.preventDefault();
};

const controlSaveSubmit = function (e) {
    e.preventDefault();

    const { numExercise, timeExercise, restExercise, numSet, restSet } =
        model.state.setting;
    const title = $('.input__title').val();
    const totalTime = formatTime(calcTime());

    createPreset(
        title,
        numExercise,
        timeExercise,
        restExercise,
        numSet,
        restSet,
        totalTime
    );
};

const controlLoadPreset = async function (e) {
    e.preventDefault();

    const presetId = e.target.dataset.preset_id;
    if (presetId) {
        const res = await getPreset(presetId);

        title = res.title;
        $('.tabs--tab, .tabs-content').removeClass('is-active');
        $('.tab--custom, .content--custom').addClass('is-active');
        $('#numExercise').val(res.numExercise);
        $('#timeExercise').val(res.timeExercise);
        $('#restExercise').val(res.restExercise);
        $('#numSet').val(res.numSet);
        $('#restSet').val(res.restSet);

        controlUpdateViews();
        $('.info--title').text(title);

        // reset timerView when new preset is loaded
        timerView.resetTimerView();
        $('.btn--reset').prop('disabled', true);
    }
};

const controlLoadUpdatePreset = async function (e) {
    e.preventDefault();

    updatePresetId = e.target.dataset.preset_id;
    if (updatePresetId) {
        const res = await getPreset(updatePresetId);
        console.log(res);
        $('#title__update').val(res.title);
        $('#numExercise__update').val(res.numExercise);
        $('#timeExercise__update').val(res.timeExercise);
        $('#restExercise__update').val(res.restExercise);
        $('#numSet__update').val(res.numSet);
        $('#restSet__update').val(res.restSet);
    }
};

const controlUpdatePreset = function (e) {
    e.preventDefault();

    const title = $('#title__update').val();
    const numExercise = +$('#numExercise__update').val();
    const timeExercise = +$('#timeExercise__update').val();
    const restExercise = +$('#restExercise__update').val();
    const numSet = +$('#numSet__update').val();
    const restSet = +$('#restSet__update').val();
    let totalTime =
        numSet > 1
            ? ((timeExercise + restExercise) * numExercise - restExercise) *
                  numSet +
              (numSet * restSet - restSet)
            : (timeExercise + restExercise) * numExercise - restExercise;

    totalTime = formatTime(totalTime);

    updatePreset(
        {
            numExercise,
            timeExercise,
            restExercise,
            numSet,
            restSet,
            totalTime,
            title,
        },
        updatePresetId
    );
};

const cancelUpdateId = function (e) {
    updatePresetId = '';
};

const passDeleteId = function (e) {
    e.preventDefault();
    deletePresetId = e.target.dataset.preset_id;
};

const cancelDeleteId = function () {
    deletePresetId = '';
};

const controlDeletePreset = function () {
    if (deletePresetId) deletePreset(deletePresetId);
};

// INIT
const init = function () {
    settingView.addHandlerInputChanges(controlUpdateViews);
    settingView.addHandlerTabs();
    settingView.addHandlerStartBtn(controlStart);
    settingView.addHandlerSaveTimerBtn(controlSaveTimer);
    settingView.addHandlerBackBtn();
    settingView.addHandlerSaveSubmitBtn(controlSaveSubmit);
    settingView.addHandlerLoadPreset(controlLoadPreset);
    settingView.addHandlerEditSaved();
    settingView.addHandlerEditIcon(controlLoadUpdatePreset);
    settingView.addHandlerEditBack(cancelUpdateId);
    settingView.addHandlerDeleteIcon(passDeleteId);
    settingView.addHandlerDeleteCancel(cancelDeleteId);
    settingView.addHandlerDeletePreset(controlDeletePreset);
    settingView.addHandlerUpdatePreset(controlUpdatePreset);

    timerView.addHandlerPauseBtn(controlPause);
    timerView.addHandlerResumeBtn(controlResume);
    timerView.addHandlerResetBtn(controlReset);
    timerView.addHandlerSettings();
    timerView.addHandlerInfos();

    accountView.addHandlerSaveSetting(controlSaveSetting);
    accountView.addHandlerSavePassword(controlSavePassword);

    loginView.addHandlerLogin(controlLogin);
    signupView.addHandlerSignup(controlSignup);
    $('.dropdown--logout').on('click', logout);
};
init();
