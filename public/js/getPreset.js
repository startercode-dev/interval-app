import axios from 'axios';
import * as alert from './alert';

export const getPreset = async (presetId) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/presets/${presetId}`,
        });

        return res.data.data;
    } catch (err) {
        alert.showAlert('error', 'no preset found');
    }
};
