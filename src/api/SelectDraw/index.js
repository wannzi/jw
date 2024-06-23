import axios from "axios";

const API_URL = 'http://your-api-url';

export const getData = (type, keyWord) => {
    return axios({
        url: `${API_URL}/portrait`,
        method: 'post',
        data: {
            type: type,
            keyWord: keyWord
        }
    });
};