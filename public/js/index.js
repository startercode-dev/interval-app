import 'core-js/stable';
import 'regenerator-runtime/runtime';
import $ from 'jquery';
import * as model from './model.js';
import settingView from './views/settingView.js';
import timerView from './views/timerView.js';
import infoView from './views/infoView.js';
import loginView from './views/loginView.js';
import accountView from './views/accountView.js';
import { login, logout } from './login.js';
import { calcTime, formatTime } from './helper.js';
import { createPreset } from './createPost.js';
import { getPreset } from './getPreset.js';
import { updateSettings } from './updateSettings.js';

let title;

const controlUpdateViews = function () {
    model.updateTime();

    timerView.render(model.state.setting);
    infoView.render(model.state.setting);
};

// BUTTONS
const controlStart = function (e) {
    settingView.passData(model.state.setting);

    const { timeExercise } = model.state.setting;
    if (!timeExercise) return;

    e.preventDefault();
    model.state.isStopped = false;

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

    const presetId = e.target.closest('.preset').dataset.preset_id;
    const res = await getPreset(presetId);

    title = res.title;
    $('#numExercise').val(res.numExercise);
    $('#timeExercise').val(res.timeExercise);
    $('#restExercise').val(res.restExercise);
    $('#numSet').val(res.numSet);
    $('#restSet').val(res.restSet);

    controlUpdateViews();
    $('.info--title').text(title);

    // reset timerView
    timerView.resetTimerView();
    $('.btn--reset').prop('disabled', true);
};

const controlLogin = function (e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();

    login(email, password);
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

// INIT
const init = function () {
    settingView.addHandlerInputChanges(controlUpdateViews);
    settingView.addHandlerTabs();
    settingView.addHandlerStartBtn(controlStart);
    settingView.addHandlerSaveTimerBtn(controlSaveTimer);
    settingView.addHandlerBackBtn();
    settingView.addHandlerSaveSubmitBtn(controlSaveSubmit);
    settingView.addHandlerLoadPreset(controlLoadPreset);

    timerView.addHandlerPauseBtn(controlPause);
    timerView.addHandlerResumeBtn(controlResume);
    timerView.addHandlerResetBtn(controlReset);
    timerView.addHandlerSettings();
    timerView.addHandlerInfos();

    accountView.addHandlerSaveSetting(controlSaveSetting);
    accountView.addHandlerSavePassword(controlSavePassword);

    loginView.addHandlerLogin(controlLogin);
    $('.dropdown--logout').on('click', logout);
};
init();
