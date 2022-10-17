import View from './View.js';
import $ from 'jquery';

class authView extends View {
    addHandlerLogin(handler) {
        $('.btn-auth-login').on('click', (e) => {
            handler(e);
        });
    }

    addHandlerSignup(handler) {
        $('.btn-auth-signup').on('click', (e) => {
            handler(e);
        });
    }

    addHandlerForgotPassword(handler) {
        $('.btn-auth-forgot_password').on('click', (e) => {
            handler(e);
        });
    }

    addhandlerResetPassword(handler) {
        $('.btn-auth-reset_password').on('click', (e) => {
            handler(e);
        });
    }
}

export default new authView();
