import View from './View.js';

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
}

export default new settingView();
