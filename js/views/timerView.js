"use strict";

import View from "./View.js";
import { formatTime } from "../helper.js";

class TimerView extends View {
    totalTimer;
    totalTime;
    mainTimer;

    _generateView() {
        const total = this.getTotal();
        $(".timer-clock__remain span").text(formatTime(total));
        $(".timer-clock__label").text(`${formatTime(this._data.timeExercise)}`);
    }

    addHandlerPauseBtn(handler) {
        $(".btn--pause").click((e) => {
            handler(e);

            e.target.disabled = true;
            e.target.classList.add("hidden");
            $(".btn--resume").removeClass("hidden");
            $(".btn--resume").prop("disabled", false);

            clearInterval(this.totalTimer);
            clearInterval(this.mainTimer);
        });
    }

    addHandlerResumeBtn(handler) {
        $(".btn--resume").click((e) => {
            handler(e);

            e.target.disabled = true;
            e.target.classList.add("hidden");
            $(".btn--pause").removeClass("hidden");
            $(".btn--pause").prop("disabled", false);

            this.totalTimer = setInterval(() => {
                this.totalTime--;
                $(`.timer-clock__remain span`).text(formatTime(this.totalTime));
                if (this.totalTime < 1) {
                    clearInterval(this.totalTimer);
                }
            }, 1000);
        });
    }

    addHandlerResetBtn(handler) {
        $(".btn--reset").click((e) => {
            handler(e);

            $(".btn--start").prop("disabled", false);
            $(".btn--pause").prop("disabled", true);
            $(".btn--resume").prop("disabled", true);
            $(".btn--pause").removeClass("hidden");
            $(".btn--resume").addClass("hidden");

            $(".input-form input").prop("disabled", false);

            clearInterval(this.totalTimer);
            clearInterval(this.mainTimer);
        });
    }

    totalCountdown() {
        this.totalTime = this.getTotal();

        this.totalTimer = setInterval(() => {
            this.totalTime--;
            $(`.timer-clock__remain span`).text(formatTime(this.totalTime));
            if (this.totalTime < 1) {
                clearInterval(this.totalTimer);
            }
        }, 1000);
    }

    async mainCountdown() {
        const { numExercises, timeExercise, restExercise, numSets, restSet } =
            this._data;

        let currNumS = 0;
        let currNumE = 0;

        for (let i = 0; i < numSets; i++) {
            currNumS++;
            currNumE = 0;

            for (let j = 0; j < numExercises; j++) {
                currNumE++;
                await this.count(timeExercise);
                if (currNumE < numExercises && restExercise > 0) {
                    await this.count(restExercise);
                }
            }

            if (currNumS < numSets && restSet > 0) {
                await this.count(restSet);
            }
        }
        $(".btn--pause").prop("disabled", true);
    }

    count(t) {
        return new Promise((resolve) => {
            $(".timer-clock__label").text(formatTime(t));
            const tick = () => {
                t--;
                $(".timer-clock__label").text(formatTime(t));

                if (t === 0) {
                    clearInterval(this.mainTimer);
                    resolve();
                }
            };

            this.mainTimer = setInterval(tick, 1000);

            $(".btn--resume").click(() => {
                clearInterval(this.mainTimer);
                this.mainTimer = setInterval(tick, 1000);
            });
        });
    }
}

export default new TimerView();
