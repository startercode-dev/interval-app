import View from './View.js';
import { formatTime } from '../helper.js';
import $ from 'jquery';

class TimerView extends View {
    totalTimer;
    totalTime;
    totalMs;
    mainTimer;

    _generateView() {
        const total = this.getTotal();
        $('.timer-clock__remain span').text(formatTime(total));
        $('.timer-clock__label').text(`${formatTime(this._data.timeExercise)}`);
        $('.timer-clock__path-remaining').css('stroke-dasharray', '283 283');

        $('.timer-info-exercise span').text(
            `1/${this._data.numExercise ? this._data.numExercise : 1}`
        );
        $('.timer-info-set span').text(
            `1/${this._data.numSet ? this._data.numSet : 1}`
        );
    }

    addHandlerSettings() {
        $('.ph-gear-six').click(() => {
            if ($('.settings').css('display') === 'none') {
                $('.settings').addClass('active');
            } else {
                $('.settings').removeClass('active');
            }
        });
    }
    addHandlerInfos() {
        $('.ph-dots-three-outline').click(() => {
            if ($('.timer-infos').css('display') === 'block') {
                $('.timer-infos').hide();
            } else {
                $('.timer-infos').show();
            }
        });
    }

    addHandlerPauseBtn(handler) {
        $('.btn--pause').click((e) => {
            handler(e);

            e.target.disabled = true;
            e.target.classList.add('hidden');
            $('.btn--resume').removeClass('hidden');
            $('.btn--resume').prop('disabled', false);

            clearInterval(this.totalTimer);
            clearInterval(this.mainTimer);

            $('.animation').css('animation-play-state', 'paused');
        });
    }

    addHandlerResumeBtn(handler) {
        $('.btn--resume').click((e) => {
            handler(e);

            e.target.disabled = true;
            e.target.classList.add('hidden');
            $('.btn--pause').removeClass('hidden');
            $('.btn--pause').prop('disabled', false);

            this.totalTimer = setInterval(() => {
                this.totalMs--;
                if (this.totalMs % 100 === 0) {
                    this.totalTime--;
                    $(`.timer-clock__remain span`).text(
                        formatTime(this.totalTime)
                    );
                    if (this.totalTime < 1) {
                        clearInterval(this.totalTimer);
                    }
                }
            }, 10);
        });
    }

    addHandlerResetBtn(handler) {
        $('.btn--reset').click((e) => {
            handler(e);

            $('.btn--start').prop('disabled', false);
            $('.btn--pause').prop('disabled', true);
            $('.btn--resume').prop('disabled', true);
            $('.btn--pause').removeClass('hidden');
            $('.btn--resume').addClass('hidden');

            $('.animation').css('animation-play-state', 'running');
            $('.timer-clock__path-remaining').removeClass('animation');

            $('.input-form input').prop('disabled', false);

            clearInterval(this.totalTimer);
            clearInterval(this.mainTimer);
        });
    }

    _count(t) {
        const playTick = () => {
            const tick = new Audio('../../assets/sounds/tick.mp3');
            tick.play();
        };
        const playBeep = () => {
            const beep = new Audio('../../assets/sounds/beep.mp3');
            beep.play();
        };
        let sec = t;
        let msec = t * 100;

        return new Promise((resolve) => {
            $('.timer-clock__label').text(formatTime(sec));
            const tick = () => {
                msec--;
                // count in milliseconds
                if (msec % 100 === 0) {
                    if (sec === 1) {
                        clearInterval(this.mainTimer);
                        $('.timer-clock__path-remaining').removeClass(
                            'animation'
                        );
                        playBeep();
                        resolve();
                    }
                    sec--;
                    $('.timer-clock__label').text(formatTime(sec));
                    $('.timer-clock__path-remaining').css('--time'); // RESET animation
                    if (sec < 4 && sec > 0) {
                        playTick();
                    }
                }
            };

            this.mainTimer = setInterval(tick, 10);

            $('.btn--resume').click(() => {
                clearInterval(this.mainTimer);
                this.mainTimer = setInterval(tick, 10);
                $('.animation').css('animation-play-state', 'running');
            });
        });
    }

    async mainCountdown() {
        const { numExercise, timeExercise, restExercise, numSet, restSet } =
            this._data;

        let currNumS = 0;
        let currNumE = 0;

        for (let i = 0; i < numSet; i++) {
            currNumS++;
            $('.total-sets span').text(`${currNumS}/${numSet ? numSet : 1}`);
            $('.timer-info-set span').text(
                `${currNumS}/${numSet ? numSet : 1}`
            );
            currNumE = 0;

            for (let j = 0; j < numExercise; j++) {
                currNumE++;
                $('.total-exercises span').text(
                    `${currNumE}/${numExercise ? numExercise : 1}`
                );
                $('.timer-info-exercise span').text(
                    `${currNumE}/${numExercise ? numExercise : 1}`
                );
                $('.timer-clock__path-remaining')
                    .css({
                        '--time': `${timeExercise}s`,
                    })
                    .addClass('animation');

                await this._count(timeExercise);

                if (currNumE < numExercise && restExercise > 0) {
                    $('.timer-clock__path-remaining')
                        .css({
                            '--time': `${restExercise}s`,
                        })
                        .addClass('animation');

                    await this._count(restExercise);
                }
            }

            if (currNumS < numSet && restSet > 0) {
                $('.timer-clock__path-remaining')
                    .css({
                        '--time': `${restSet}s`,
                    })
                    .addClass('animation');
                await this._count(restSet);
            }
        }
        $('.btn--pause').prop('disabled', true);
    }

    totalCountdown() {
        this.totalTime = this.getTotal();
        this.totalMs = this.getTotal() * 100;

        this.totalTimer = setInterval(() => {
            this.totalMs--;
            if (this.totalMs % 100 === 0) {
                this.totalTime--;
                $(`.timer-clock__remain span`).text(formatTime(this.totalTime));
                if (this.totalTime < 1) {
                    clearInterval(this.totalTimer);
                }
            }
        }, 10);
    }
}

export default new TimerView();
