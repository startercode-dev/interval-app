import axios from 'axios';
import * as alert from './alert';

export const deletePreset = async (presetId) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/presets/${presetId}`,
        });

        if (res.status === 204) {
            alert.showAlert('success', 'preset deleted');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        alert.showAlert('error', 'error deleting preset');
    }
};
