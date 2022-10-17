import axios from 'axios';
import * as alert from './alert';

export const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password,
            },
        });

        if (res.data.status === 'success') {
            alert.showAlert('success', 'logged in successful');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (err) {
        alert.showAlert('error', err.response.data.msg);
    }
};

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout',
        });

        if ((res.data.status = 'success')) location.reload(true);
    } catch (err) {
        console.log(err);
        alert.showAlert(
            'error',
            'cant logout for some reason, try again later'
        );
    }
};

export const signup = async (data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data,
        });

        if (res.data.status === 'success') {
            alert.showAlert('success', 'signup successful!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (err) {
        alert.showAlert('error', err.response.data.msg);
    }
};

export const forgotPassword = async (data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/forgotPassword',
            data,
        });

        if (res.data.status === 'success') {
            alert.showAlert('success', 'email has been sent');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (err) {
        alert.showAlert('error', err.response.data.msg);
    }
};

export const resetPassword = async (data, token) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/users/resetPassword/${token}`,
            data,
        });

        if (res.data.status === 'success') {
            alert.showAlert(
                'success',
                'password reset successful, please login'
            );
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        alert.showAlert('error', err.response.data.msg);
    }
};
