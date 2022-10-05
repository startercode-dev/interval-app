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
            alert.showAlert('success', 'logged in cuh');
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
