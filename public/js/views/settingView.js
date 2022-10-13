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
        $('.preset--title, .preset--time').on('click', (e) => {
            handler(e);
        });
    }

    addHandlerEditSaved() {
        $('.edit-saved').on('click', () => {
            if ($('.edit-saved').text() === 'EDIT') {
                $('.preset--time').addClass('hidden');
                $('.setting-icons').removeClass('hidden');
                $('.edit-saved').text('DONE');
            } else if ($('.edit-saved').text() === 'DONE') {
                $('.preset--time').removeClass('hidden');
                $('.setting-icons').addClass('hidden');
                $('.edit-saved').text('EDIT');
            }
        });
    }

    addHandlerEditIcon(handler) {
        $('.ph-pencil').on('click', (e) => {
            $('.saved-preset').addClass('hidden');
            $('.update-preset-form').removeClass('hidden');

            handler(e);
        });
    }

    addHandlerEditBack(handler) {
        $('.btn--update__back').on('click', () => {
            $('.saved-preset').removeClass('hidden');
            $('.update-preset-form').addClass('hidden');

            handler();
        });
    }

    addHandlerUpdatePreset(handler) {
        $('.btn--update').on('click', (e) => {
            handler(e);
        });
    }

    addHandlerDeleteIcon(handler) {
        $('.ph-trash').on('click', (e) => {
            $('.alert_box').removeClass('hidden');
            handler(e);
        });
    }

    addHandlerDeleteCancel(handler) {
        $('.delete-cancel').on('click', () => {
            handler();
            $('.alert_box').addClass('hidden');
        });
    }

    addHandlerDeletePreset(handler) {
        $('.delete-confirm').on('click', () => {
            handler();
        });
    }
}

export default new settingView();
