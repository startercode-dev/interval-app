"use strict";

import * as model from "./model.js";
import settingView from "./views/settingView.js";

const calcTime = function () {
    const { numExercises, timeExercise, restExercise, numSets, restSet } =
        model.state.setting;

    return numSets > 1
        ? ((timeExercise + restExercise) * numExercises - restExercise) *
              numSets +
              (numSets * restSet - restSet)
        : (timeExercise + restExercise) * numExercises - restExercise;
};

const formatTime = function (s) {
    const mins = Math.floor(s / 60);
    let secs = s % 60;
    if (secs < 10) secs = `0${secs}`;
    return `${mins}:${secs}`;
};

const totalCountdown = function () {
    let totalTime = calcTime();

    const tick = function () {
        totalTime--;
        $(".timer-clock__remain span").text(formatTime(totalTime));
        if (totalTime === 0) clearInterval(timer);
    };
    const timer = setInterval(tick, 1000);
};

const mainCountdown = function () {
    const { numExercises, timeExercise, restExercise, numSets, restSet } =
        model.state.setting;

    let currNumS = 0;
    let currNumE = 0;

    for (let i = 0; i < numSets; i++) {
        currNumS++;
        currNumE = 0;

        for (let j = 0; j < numExercises; j++) {
            currNumE++;
            count(timeExercise);
            console.log(timeExercise);
            if (currNumE < numExercises) {
                count(restExercise);
                console.log(restExercise);
            }
        }

        if (currNumS < numSets) {
            console.log(restSet);
        }
    }
};

const count = function (t) {
    $(".timer-clock__label").text(formatTime(t));
    const tick = () => {
        t--;
        $(".timer-clock__label").text(formatTime(t));
        if (t === 1) {
            clearInterval(timer);
        }
    };
    const timer = setInterval(tick, 1000);
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

const controlStart = function (e) {
    e.preventDefault();
    model.timerStartState();
    if (!model.state.stoppedState) {
        e.target.disabled = true;
        $(".input-form input").prop("disabled", true);
    }

    totalCountdown();
    mainCountdown();
};

const init = function () {
    settingView.addHandlerInputChanges(controlUpdateViews);
    settingView.addHandlerTabs(controlTabs);
    settingView.addHandlerStartBtn(controlStart);
};
init();
