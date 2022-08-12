"use strict";

import * as model from "./model.js";
import settingView from "./views/settingView.js";
import timerView from "./views/timerView.js";
import infoView from "./views/infoView.js";
import { formatTime, calcTime } from "./helper.js";

// TIME REMAIN
let totalTimer;
const totalCountdown = function () {
    let totalTime = calcTime();
    const tick = () => {
        totalTime--;
        $(`.timer-clock__remain span`).text(formatTime(totalTime));
        if (totalTime < 1) {
            clearInterval(totalTimer);
        }
    };

    totalTimer = setInterval(tick, 1000);

    $(".btn--resume").click(() => {
        clearInterval(totalTimer);
        if (!model.state.isPaused) {
            totalTimer = setInterval(tick, 1000);
        }
    });
};

// MAIN COUNT
let mainTimer;
const count = function (t) {
    return new Promise((resolve, reject) => {
        $(".timer-clock__label").text(formatTime(t));
        const tick = () => {
            t--;
            $(".timer-clock__label").text(formatTime(t));
            if (t === 0) {
                clearInterval(mainTimer);
                resolve();
            }
        };

        mainTimer = setInterval(tick, 1000);

        $(".btn--resume").click(() => {
            clearInterval(mainTimer);
            if (!model.state.isPaused) {
                mainTimer = setInterval(tick, 1000);
            }
        });
    });
};

const mainCountdown = async function () {
    const { numExercises, timeExercise, restExercise, numSets, restSet } =
        model.state.setting;

    let currNumS = 0;
    let currNumE = 0;

    for (let i = 0; i < numSets; i++) {
        currNumS++;
        currNumE = 0;

        for (let j = 0; j < numExercises; j++) {
            currNumE++;
            await count(timeExercise);
            if (currNumE < numExercises && restExercise > 0) {
                await count(restExercise);
            }
        }

        if (currNumS < numSets && restSet > 0) {
            await count(restSet);
        }
    }
    $(".btn--pause").prop("disabled", true);
};

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// CONTROL FUNCTIONS
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
    totalCountdown();
    mainCountdown();
};

const controlPause = function (e) {
    e.preventDefault();
    model.state.isPaused = true;

    clearInterval(totalTimer);
    clearInterval(mainTimer);
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

    clearInterval(mainTimer);
    clearInterval(totalTimer);
    timerView.render(model.state.setting);
    infoView.render(model.state.setting);
};

const init = function () {
    settingView.addHandlerInputChanges(controlUpdateViews);
    settingView.addHandlerTabs();
    settingView.addHandlerStartBtn(controlStart);

    timerView.addHandlerPauseBtn(controlPause);
    timerView.addHandlerResumeBtn(controlResume);
    timerView.addHandlerResetBtn(controlReset);
};
init();
