import View from './View.js';
import $ from 'jquery';

class accountView extends View {
    addHandlerSaveSetting(handler) {
        $('.btn-auth-save__setting').on('click', (e) => {
            handler(e);
        });
    }

    addHandlerSavePassword(handler) {
        $('.btn-auth-save__password').on('click', (e) => {
            handler(e);
        });
    }
}

export default new accountView();
