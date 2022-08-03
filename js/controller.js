"use strict";

import * as model from "./model.js";
import TimerView from "./views/timerView.js";
import InfoView from "./views/infoView.js";
import settingView from "./views/settingView.js";

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
    const totalTime = calcTime();
    const timeExercise = model.state.setting.timeExercise;
    let timePassed = 0;
    let timeLeft = totalTime;
    let timeExerciseLeft = timeExercise;

    setInterval(() => {
        timePassed += 1;
        timeLeft = totalTime - timePassed;
        timeExerciseLeft = timeExercise - timePassed;

        $(".timer-clock__remain span").text(formatTime(timeLeft));
        $(".timer-clock__label").text(formatTime(timeExerciseLeft));
    }, 1000);
};

const init = function () {
    settingView.addHandlerInputChanges(controlUpdateViews);
    settingView.addHandlerTabs(controlTabs);
    settingView.addHandlerStartBtn(controlStart);
};
init();

/////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
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
