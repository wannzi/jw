import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/fileComparison';
const API_URL = 'https://mock.presstime.cn/mock/66aba587eb79dbd24b81fe76/api';

/**
 * 获取文件树接口
 * @param {String} userId 用户id
 * @returns {Promise} 包含库列表的 Promise 对象
 *  - code {String} 返回状态码
 *  - data {Array} 返回的数据数组
 *    - label {String} 标签名
 *    - draggable {Boolean} 是否可拖拽
 *    - children {Array} 子节点数组
 *      - id {String} 子节点ID
 *      - label {String} 子节点标签名
 *      - draggable {Boolean} 是否可拖拽
 *  - msg {String} 返回的消息
 */

export const getTree = () => {
    return axios ({
        url: `${API_URL}/getTree`,
        method: 'get',
        // data: {
        //     userId
        // }
    })
}

/**
 * 获取文件内容接口
 * @param {String} userId 用户id
 * @param {String} fileId 文件id
 * @returns {Promise} 包含文件内容的 Promise 对象
 *  - code {String} 返回状态码
 *  - data {String} 返回的文件内容
 *  - msg {String} 返回的消息
 */
export const openFile = (userId, fileId) => {
    return axios ({
        url: `${API_URL}/openFile`,
        method: 'post',
        data: {
            userId,
            fileId
        }
    })
}


/**
 * 导出文件接口
 * @param {String} userId 用户id
 * @param {Array} fileIdArray 文件id数组
 * @returns {Promise} 包含导出结果的 Promise 对象
 *  - code {String} 返回状态码
 *  - data {String} 返回的导出结果(data={dataSteam})dataSteam为后端的二进制流
 *  - msg {String} 返回的消息
 */
export const exportFile = (userId, fileIdArray) => {
    return axios ({
        url: `${API_URL}/exportFile`,
        method: 'post',
        data: {
            userId,
            fileIdArray
        },
        responseType: 'blob'
    })
}


/**
 * 保存文件接口
 * @param {String} userId 用户id
 * @param {String} fileId 文件id
 * @param {Array} content 文件内容(二维数组)
 * @returns {Promise} 包含保存结果的 Promise 对象
 *  - code {String} 返回状态码
 *  - data {String} 返回的保存结果
 *  - msg {String} 返回的消息
 */
export const saveFile = (userId, fileId, content) => {
    return axios ({
        url: `${API_URL}/saveFile`,
        method: 'post',
        data: {
            userId,
            fileId,
            content
        }
    })
}


/**
 * 检索内容接口
 * @param {String} userId 用户id
 * @param {String} fileId 文件id
 * @param {Array} column 列名数组
 * @param {String} KeyWord 关键字
 * @returns {Promise} 包含检索结果的 Promise 对象
 *  - code {String} 返回状态码
 *  - data {Array} 返回的检索结果数组
 *  - msg {String} 返回的消息
 */
export const queryFile = (userId, fileId, column, KeyWord) => {
    return axios ({
        url: `${API_URL}/queryFile`,
        method: 'post',
        data: {
            userId,
            fileId,
            column,
            KeyWord
        }
    })
}

/**
 * 获取比对文件字段接口
 * @param {String} userId 用户id
 * @param {Array} fileIdArray 文件id数组
 * @returns {Promise} 包含比对文件字段的 Promise 对象
 *  - code {String} 返回状态码
 *  - data {Array} 返回的比对文件字段数组
 *  - msg {String} 返回的消息
 */
//目前有问题
export const getFileids = (userId, fileIdArray) => {
    return axios ({
        url: `${API_URL}/getFileids`,
        method: 'post',
        data: {
            userId,
            fileIdArray
        }
    })
}


/**
 * 比对文件接口
 * @param {String} userId 用户id
 * @param {Array} fileIdArray 文件id数组
 * @param {Array} saveFileIdArray 保存文件id数组
 * @param {String} compareType 比对方式
 * @returns {Promise} 包含比对结果的 Promise 对象
 *  - code {String} 返回状态码
 *  - data {String} 返回的比对结果
 *  - msg {String} 返回的消息
 */
export const compareFile = (userId, fileIdArray, saveFileIdArray, compareType) => { 
    return axios ({
        url: `${API_URL}/compareFile`,
        method: 'post',
        data: {
            userId,
            fileIdArray,
            saveFileIdArray,
            compareType
        }
    })
}