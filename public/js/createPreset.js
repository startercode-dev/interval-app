import axios from 'axios';
import * as alert from './alert';

export const createPreset = async (data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/presets',
            data,
        });

        if (res.data.status === 'success') {
            alert.showAlert('success', 'preset saved');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (err) {
        alert.showAlert('error', err.response.data.msg);
    }
};
