import View from './View.js';
import $ from 'jquery';

class loginView extends View {
    addHandlerLogin(handler) {
        $('.btn-auth-login').on('click', (e) => {
            handler(e);
        });
    }
}

export default new loginView();
