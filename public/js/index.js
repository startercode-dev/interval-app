import 'core-js/stable';
import 'regenerator-runtime/runtime';
import $ from 'jquery';
import * as model from './model.js';
import settingView from './views/settingView.js';
import timerView from './views/timerView.js';
import infoView from './views/infoView.js';
import loginView from './views/loginView.js';
import { login } from './login.js';
import { calcTime, formatTime } from './helper.js';
import { createPreset } from './createPost.js';

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

    timerView.render(model.state.setting);
    infoView.render(model.state.setting);
};

const controlLogin = function (e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();

    login(email, password);
};

const controlSaveTimer = function (e) {
    e.preventDefault();
    settingView.passData(model.state.setting);
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

// INIT
const init = function () {
    settingView.addHandlerInputChanges(controlUpdateViews);
    settingView.addHandlerTabs();
    settingView.addHandlerStartBtn(controlStart);
    settingView.addHandlerSaveTimerBtn(controlSaveTimer);
    settingView.addHandlerBackBtn();
    settingView.addHandlerSaveSubmitBtn(controlSaveSubmit);

    timerView.addHandlerPauseBtn(controlPause);
    timerView.addHandlerResumeBtn(controlResume);
    timerView.addHandlerResetBtn(controlReset);
    timerView.addHandlerSettings();
    timerView.addHandlerInfos();

    loginView.addHandlerLogin(controlLogin);
};
init();
