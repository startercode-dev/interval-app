"use strict";

import * as model from "./model.js";
import settingView from "./views/settingView.js";
import timerView from "./views/timerView.js";
import infoView from "./views/infoView.js";
import { formatTime, calcTime } from "./helper.js";

// TIME REMAIN
const totalCountdown = function () {
    let totalTime = calcTime();
    const tick = () => {
        totalTime--;
        $(".timer-clock__remain span").text(formatTime(totalTime));
        if (totalTime < 1) {
            clearInterval(timer);
        }
    };

    let timer = setInterval(tick, 1000);

    $(".btn--pause").click(() => {
        if (model.state.isPaused) {
            clearInterval(timer);
        }
    });

    $(".btn--resume").click(() => {
        clearInterval(timer);
        if (!model.state.isPaused) {
            timer = setInterval(tick, 1000);
        }
    });

    $(".btn--reset").click(() => {
        clearInterval(timer);
        model.updateTime();
        const total = calcTime();
        $(".timer-clock__remain span").text(formatTime(total));
    });
};

// MAIN COUNT
const count = function (t) {
    return new Promise((resolve, reject) => {
        $(".timer-clock__label").text(formatTime(t));
        const tick = () => {
            t--;
            $(".timer-clock__label").text(formatTime(t));
            if (t < 1) {
                clearInterval(timer);
                resolve();
            }
        };

        let timer = setInterval(tick, 1000);

        $(".btn--pause").click(() => {
            if (model.state.isPaused) {
                clearInterval(timer);
            }
        });

        $(".btn--resume").click(() => {
            if (!model.state.isPaused) {
                clearInterval(timer);
                timer = setInterval(tick, 1000);
            }
        });

        $(".btn--reset").click(() => {
            clearInterval(timer);
            model.updateTime();
            $(".timer-clock__label").text(
                `${formatTime(model.state.setting.timeExercise)}`
            );
            reject("reset");
        });
    });
};

const mainCountdown = async function () {
    try {
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
    } catch (err) {
        console.log(err);
    }
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
    e.preventDefault();

    // BUG prevent blank form from starting
    model.state.isStopped = false;
    totalCountdown();
    mainCountdown();
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
