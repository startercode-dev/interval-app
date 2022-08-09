"use strict";

import * as model from "./model.js";
import settingView from "./views/settingView.js";
import { formatTime, calcTime } from "./helper.js";

const count = function (t) {
    $(".timer-clock__label").text(formatTime(t));
    return new Promise((resolve, reject) => {
        let timer = setInterval(() => {
            t--;
            $(".timer-clock__label").text(formatTime(t));
            if (t < 1) {
                clearInterval(timer);
                resolve();
            }
        }, 1000);

        $(".btn--pause").click(() => {
            if (model.state.isPaused) {
                clearInterval(timer);
            }
        });

        $(".btn--resume").click(() => {
            if (!model.state.isPaused) {
                timer = setInterval(() => {
                    t--;
                    $(".timer-clock__label").text(formatTime(t));
                    if (t < 1) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 1000);
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
};

const totalCountdown = async function () {
    let totalTime = calcTime();

    let timer = setInterval(() => {
        totalTime--;
        $(".timer-clock__remain span").text(formatTime(totalTime));
        if (totalTime < 1) {
            clearInterval(timer);
        }
    }, 1000);

    $(".btn--pause").click(() => {
        if (model.state.isPaused) {
            clearInterval(timer);
        }
    });

    $(".btn--resume").click(() => {
        if (!model.state.isPaused) {
            timer = setInterval(() => {
                totalTime--;
                $(".timer-clock__remain span").text(formatTime(totalTime));
                if (totalTime < 1) {
                    clearInterval(timer);
                }
            }, 1000);
        }
    });
};

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// CONTROL FUNCTIONS
const controlTabs = function (e) {
    const clicked = e.target.dataset.tab;

    $(".tabs--tab, .tabs-content").removeClass("is-active");
    $(`.tab--${clicked}, .content--${clicked}`).addClass("is-active");
};

const controlUpdateViews = function () {
    model.updateTime();
    const total = calcTime();

    $(".info--title").text("custom workout");
    $(".total-time span").text(`${formatTime(total)}`);
    $(".total-exercises span").text(
        `1/${
            model.state.setting.numExercises
                ? model.state.setting.numExercises
                : 1
        }`
    );
    $(".total-sets span").text(
        `1/${model.state.setting.numSets ? model.state.setting.numSets : 1}`
    );

    $(".timer-clock__remain span").text(formatTime(total));
    $(".timer-clock__label").text(
        `${formatTime(model.state.setting.timeExercise)}`
    );
};

// NOTETAB CSS BTN DISABLED STATE
const controlStart = function (e) {
    e.preventDefault();
    // e.target.disabled = true;
    model.state.isStopped = false;

    $(".input-form input").prop("disabled", true);

    totalCountdown();
    mainCountdown();
};

const controlPause = function (e) {
    e.preventDefault();
    // e.target.disabled = true;
    model.state.isPaused = true;

    $(".input-form input").prop("disabled", false);
};

const controlResume = function (e) {
    e.preventDefault();
    model.state.isPaused = false;
};

const init = function () {
    settingView.addHandlerInputChanges(controlUpdateViews);
    settingView.addHandlerTabs(controlTabs);
    settingView.addHandlerStartBtn(controlStart);
    settingView.addHandlerPauseBtn(controlPause);
    settingView.addHandlerResumeBtn(controlResume);
};
init();
