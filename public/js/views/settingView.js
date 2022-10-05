import View from './View.js';
import $ from 'jquery';
import { formatTime } from '../helper.js';

class settingView extends View {
    passData(data) {
        this._data = data;
    }

    addHandlerInputChanges(handler) {
        $('.input').change(() => {
            handler();
        });
    }

    addHandlerTabs() {
        $('.tabs--tab').click((e) => {
            $('.tabs--tab, .tabs-content').removeClass('is-active');
            $(
                `.tab--${e.target.dataset.tab}, .content--${e.target.dataset.tab}`
            ).addClass('is-active');
        });
    }

    addHandlerStartBtn(handler) {
        $('.btn--start').click((e) => {
            handler(e);

            if (!this._data.timeExercise) return;

            e.target.disabled = true;
            $('.input-form input').prop('disabled', true);
            $('.btn--reset').prop('disabled', false);
            $('.btn--pause').prop('disabled', false);

            $('.settings').removeClass('active');
        });
    }

    addHandlerSaveTimerBtn(handler) {
        $('.btn--save').on('click', (e) => {
            handler(e);

            if (!this._data.timeExercise) return;

            const total = this.getTotal();
            $('.input-form').addClass('hidden');
            $('.save-preset-form').removeClass('hidden');

            if (!total) return;

            if (total < 60) {
                return $('.input--label__text').text(
                    `total time: ${formatTime(total)} secs`
                );
            }

            $('.input--label__text').text(
                `total time: ${formatTime(total)} min`
            );
        });
    }

    addHandlerBackBtn() {
        $('.btn--back').on('click', () => {
            $('.input-form').removeClass('hidden');
            $('.save-preset-form').addClass('hidden');
        });
    }

    addHandlerSaveSubmitBtn(handler) {
        $('.btn--save__submit').on('click', (e) => {
            handler(e);
        });
    }

    addHandlerLoadPreset(handler) {
        $('.preset').on('click', (e) => {
            handler(e);

            $('.tabs--tab, .tabs-content').removeClass('is-active');
            $(`.tab--custom, .content--custom`).addClass('is-active');
        });
    }
}

export default new settingView();
