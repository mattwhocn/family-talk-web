import axios from './axios.js'
/**
 * 是否自动等待
 */
const base = ''
const AUTO_LOADING = true
const REQ_TYPE = {
  POST: 'post',
  GET: 'get',
  DELETE: 'delete',
  PUT: 'put'
}
const getCurryUrl = function (baseURL, reqType) {
  return function (urlName, loading, options) {
    return function (params) {
      return axios({
        method: reqType,
        url: baseURL + urlName,
        data: params,
        options: options || {},
        loading
      }).then(res => res.data)
    }
  }
}

const postRoot = getCurryUrl(base, REQ_TYPE.POST)
const getRoot = getCurryUrl(base, REQ_TYPE.GET)

/**
 * @param {String} urlName 具体的请求链接名称 schedule/getClassLessonByDay
 * @param {bollen} loading 是否显示接口loading
 * @param {Object} options 一些请求的配置信息: 一些Headers相关配置
 */
export default {
  requestLogin: postRoot('/talk/system/login.do', false),
  getUserPermissionList: getRoot('/talk/system/getPermissionList.do', AUTO_LOADING),
  getSystemBaseInfo: getRoot('/talk/system/getSystemBaseInfo.do', AUTO_LOADING)
}
