import axios from 'axios';
import * as alert from './alert';

export const updatePreset = async (data, presetId) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `api/v1/presets/${presetId}`,
            data,
        });

        if (res.data.status === 'success') {
            alert.showAlert('success', 'preset updated');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (err) {
        console.log(err);
    }
};
