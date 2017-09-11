/**
 * author matt zhang
 * Axios的Vue插件（添加全局请求/响应拦截器）
 */

import axios from 'axios'
import AutoLoading from './autoLoading'

/**
 * 加载动画实例对象
 */
let autoloading = new AutoLoading()

// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
  config.loading && autoloading.show()
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  return config
})

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
  autoloading.hide()
  let data = response.data
  // 根据返回的code值来做不同的处理:code 1 代表请求成功 code 1000 登录超时
  switch (data.code) {
    case 1: return data
    case 1000:
      location.replace('/login')
      break
    default:
      alert(data.message)
      return data
  }
  // 若status !== 200 就抛出异常
  if (response.status !== 200) {
    const err = new Error(data.message)
    err.response = response
    throw err
  }
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  console.log(err.response.status)
  if (err && err.response) {
    console.log(err)
  }
  return Promise.reject(err)
})

axios.install = (Vue) => {
  Vue.prototype.$axios = axios
}

export default axios
