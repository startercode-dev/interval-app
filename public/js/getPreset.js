import axios from 'axios';

export const getPreset = async (presetId) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/presets/${presetId}`,
        });

        return res.data.data;
    } catch (err) {
        console.log(err);
    }
};
