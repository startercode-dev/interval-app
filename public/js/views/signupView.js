import View from './View.js';
import $ from 'jquery';

class signup extends View {
    addHandlerSignup(handler) {
        $('.btn-auth-signup').on('click', (e) => {
            handler(e);
        });
    }
}

export default new signup();
