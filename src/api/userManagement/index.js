import axios from 'axios';


const API_URL = 'http://localhost:3000/api/fileComparison';


/**
 * 获取用户列表接口
 * @param {Object} params 请求参数
 * @returns{Promise}
 * - code{String} 状态码
 * - data{Object} 返回数据
 * - msg{String} 提示信息
 */
 export const getUserList =()=> {
    return axios ({
        url: `${API_URL}/getUserList`,
        method: "GET",
        headers: {

        }
    })

 }

 /**
  * 增加用户接口
  * @param {String} userName 账号
  * @param {String} realName 姓名
  * @param {String} dept 部门
  * @param {String} duties 职务
  * @param {String} phone 电话
  * 
  */
 export const addUser = (userName, realName, dept, duties, phone) => {
    return axios ({
        url: `${API_URL}/addUser`,
        method: "POST",
        data:{
            userName,
            realName,
            dept,
            duties,
            phone
        },
        headers: {

        },
        
    })
 }


 /**
  * 更改账号状态接口
  * @param {String} userId 用户id
  * @param {Int} status 状态
  * @returns {Promise}
  * - code{String} 状态码
  * - data{Object} 返回数据
  * -  msg{String} 提示信息
  */
 export const switchUserStatus = (userId, status) => {
    return axios({
        url: `${API_URL}/switchUserStatus`,
        method: "POST",
        data: {
            userId,
            status
        },
    })
}


/**
 * 删除用户接口
 * @param {Array} userId 用户id数组
 * @returns {Promise}
 * - code{String} 状态码
 * - data{Object} 返回数据
 * - msg{String} 提示信息
 */
export const delUser = (userId) => {
    return axios ({
        url: `${API_URL}/delUser`,
        method: "POST",
        data: {
            userId
        },
    })
}

/**
 * 初始化密码接口(初始化密码为123456)
 * @param {Array} userId 用户id数组
 * @returns {Promise}
 * - code{String} 状态码
 * - data{Object} 返回数据
 * - msg{String} 提示信息
 */
export const initPwd = (userId) => {
    return axios ({
        url: `${API_URL}/initPwd`,
        method: "POST",
        data: {
            userId
        },
    })
}

/**
 * 更改用户权限接口
 * @param {String} userId 用户id
 * @param {Array} auth 权限数组(权限[0,1,1,1],分别代表管理员、画像、比对、模型系统)
 * @returns {Promise}
 * - code{String} 状态码
 * - data{Object} 返回数据
 * - msg{String} 提示信息
*/
export const swichUserAuth = (userId, auth) => {
    return axios ({
        url: `${API_URL}/swichUserAuth`,
        method: "POST",
        data: {
            userId,
            auth
        },
    })
}

/**
 * 获取文件列表接口
 * 对于在线文件，fileType显示在线文件，否则显示本地文件
 * @returns {Promise}
 * - code{String} 状态码
 * - data{Object} 返回数据
 *  - fileId{String} 文件id
 *  - fileName{String} 文件名
 *  - fileType{String} 文件类型
 *  - uploadTime {Date} 上传时间
 * - msg {String} 返回的消息
 */
export const getFileList = () => {
    return axios ({
        url: `${API_URL}/getFileList`,
        method: "GET",
    })
}

/**
 * 上传文件接口
 * @param {FormData} formData 包含文件相关信息的 FormData 对象
 *  - userId {String} 用户ID
 *  - fileName {String} 文件名
 *  - fileType {String} 文件类型
 *  - file {File} 要上传的文件
 * @returns {Promise} 包含上传文件结果的 Promise 对象
 */
export const uploadFile = (formData) => {
    return axios ({
        url: `${API_URL}/uploadFile`,
        method: "POST",
        data: formData
      
    })
}



/**
 * 获取在线文件列表接口（未使用）
 * @param {String} userId 用户ID
 * @returns {Promise} 包含文件列表的 Promise 对象
 *  - data {Array} 返回数据数组
 *    - fileId {String} 文件ID
 *    - fileName {String} 文件名
 */
export const getOnlineFiles = () => {
    return axios ({
        url: `${API_URL}/getOnlineFiles`,
        method: "GET",
    
    })
}


/**
 * 导入在线库文件接口（未使用）
 * @param {String} userId 用户ID
 * @param {Array} fileIdArray 文件ID数组
 */
export const uploadFileOnline = (userId, fileIdArray) => {
    return axios ({
        url: `${API_URL}/uploadFileOnline`,
        method: "POST",
        data: {
            userId,
            fileIdArray
        },
    })
}


/**
 * 删除库文件接口
 * @param {Array} fileId 
 * @returns {Promise}
 * - code{String} 状态码
 * - data{Object} 返回数据
 * - msg{String} 提示信息
 */
export const delFile = (fileId) => {
    return axios ({
        url: `${API_URL}/delFile`,
        method: "POST",
        data: {
            fileId
        },
    })
}


/**
 * 更改文件显示状态接口
 * @param {String} fileId 文件ID
 * @param {Int} status 状态
 * @returns {Promise} 返回结果的 Promise 对象
 *  - code{String} 状态码
 *  - data{Object} 返回数据
 *  - msg{String} 提示信息
 */
export const swichFileStatus = (fileId, status) => {
    return axios ({
        url: `${API_URL}/swichFileStatus`,
        method: "POST",
        data: {
            fileId,
            status
        },
    })
}



/**
 * 获取规则列表接口
 * @returns {Promise} 包含规则列表的 Promise 对象
 *  - code {String} 返回状态码
 *  - data {String} 数据为空
 *  - msg {String} 返回的消息
 */
export const getRuleList =() => {
    return axios ({
        url: `${API_URL}/getRuleList`,
        method: "GET",
    })
}



/**
 * 增加规则接口
 * @param {String} userId 用户ID
 * @param {String} ruleName 规则名称
 * @param {String} ruleComment 规则描述
 * @param {String} ruleSteps 规则步骤描述
 * @returns {Promise} 返回结果的 Promise 对象
 *  - code{String} 状态码
 *  - data{Object} 返回数据
 *  - msg{String} 提示信息
 */
export const addRule = (userId, ruleName, ruleComment, ruleSteps) => {
    return axios ({
        url: `${API_URL}/addRule`,
        method: "POST",
        data: {
            userId,
            ruleName,
            ruleComment,
            ruleSteps
        },
    })
}

/**
 * 编辑规则接口
 * @param {String} ruleId 规则ID
 * @param {String} ruleName 规则名称
 * @param {String} ruleComment 规则描述
 * @param {String} ruleSteps 规则步骤描述
 * @returns {Promise} 返回结果的 Promise 对象
 *  - code{String} 状态码
 *  - data{Object} 返回数据 
 *  - msg{String} 提示信息
 */
export const editRule = (ruleId, ruleName, ruleComment, ruleSteps) => {
    return axios ({
        url: `${API_URL}/editRule`,
        method: "POST",
        data: {
            ruleId,
            ruleName,            
            ruleComment,
            ruleSteps
        },
    })
}

/**
 * 删除规则接口
 * @param {Array} ruleId 规则ID数组
 * @returns {Promise} 返回结果的 Promise 对象
 *  - code{String} 状态码
 *  - data{Object} 返回数据
 *  - msg{String} 提示信息
 */
export const delRule = (ruleId) => {
    return axios ({
        url: `${API_URL}/delRule`,
        method: "POST",
        data: {
            ruleId
        },
    })
}

/**
 * 更换规则归属方式接口
 * @param {String} ruleId 规则ID
 * @param {Int} status 状态
 * @returns {Promise} 返回结果的 Promise 对象
 *  - code{String} 状态码
 *  - data{Object} 返回数据
 *  - msg{String} 提示信息
 */
export const swichRuleStatus = (ruleId, status) => {
    return axios ({
        url: `${API_URL}/swichRuleStatus`,
        method: "POST",
        data: {
            ruleId,
            status
        },
    })
}





