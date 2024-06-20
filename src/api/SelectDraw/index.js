import axios from "axios";

const API_URL = 'http://your-api-url'; // 替换为你的实际 API 地址

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