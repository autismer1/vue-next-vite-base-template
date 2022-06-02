import axios from 'axios'
import Cookies from 'js-cookie'
import { Toast } from 'vant'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 40000
})

service.interceptors.request.use(
  (config) => {
    // 登录系统类型
    config.headers['SystemFlag'] = 40

    // 请求头加上uid
    Cookies.get('uid') && (config.headers['uid'] = Cookies.get('uid'))

    // 请求头加上token
    Cookies.get('token') &&
      (config.headers['Authorization'] = Cookies.get('token'))

    return config
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (response) => {
    if (response.data?.result === 1519) {
      Cookies.remove('token')
      Toast('登录过期，请重新登录')
      location.reload()
    }

    if (response.data?.result === 1001) {
      Toast(response.data?.message)
    }
    return response.data
  },
  (error) => {
    const code = error.response?.data?.result
    if (code) {
      if (code === 401) {
        Cookies.remove('token')
        Toast('登录过期，请重新登录')
      } else {
        const errorMsg = error.response.data.message
        Toast(errorMsg)
      }
    } else {
      Toast('网络不佳')
    }

    return Promise.reject(error)
  }
)

export default service
