"use strict";

import View from "./View.js";
import { formatTime } from "../helper.js";

class TimerView extends View {
    addHandlerStartBtn(handler) {
        $(".btn--start").click((e) => {
            handler(e);

            e.target.disabled = true;
            $(".input-form input").prop("disabled", true);
            $(".btn--reset").prop("disabled", false);
            $(".btn--pause").prop("disabled", false);
        });
    }

    addHandlerPauseBtn(handler) {
        $(".btn--pause").click((e) => {
            handler(e);

            e.target.disabled = true;
            e.target.classList.add("hidden");
            $(".btn--resume").removeClass("hidden");
            $(".btn--resume").prop("disabled", false);
        });
    }

    addHandlerResumeBtn(handler) {
        $(".btn--resume").click((e) => {
            handler(e);

            e.target.disabled = true;
            e.target.classList.add("hidden");
            $(".btn--pause").removeClass("hidden");
            $(".btn--pause").prop("disabled", false);
        });
    }

    addHandlerResetBtn(handler) {
        $(".btn--reset").click((e) => {
            handler(e);

            model.state.isPaused = false;
            model.state.isStopped = true;

            $(".btn--start").prop("disabled", false);
            $(".btn--pause").prop("disabled", true);
            $(".btn--resume").prop("disabled", true);
            $(".btn--pause").removeClass("hidden");
            $(".btn--resume").addClass("hidden");

            $(".input-form input").prop("disabled", false);
        });
    }

    _generateView() {
        const total = this.getTotal();
        $(".timer-clock__remain span").text(formatTime(total));
        $(".timer-clock__label").text(`${formatTime(this._data.timeExercise)}`);
    }
}

export default new TimerView();
