import axios from 'axios';
import * as alert from './alert';

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
