import axios from 'axios'
import { message } from 'ant-design-vue'

// 创建axios
export const service = axios.create({
  withCredentials: false,
  baseURL: '',
  timeout: 500000
})

// 添加请求拦截器
service.interceptors.request.use((config) => new Promise((resolve) => {
  resolve(config)
}), (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use((response) => {
  console.log(response)
  if (response.data.errorCode === 1) {
    message.error(response.data.errorMessage)
  }
  // 对响应数据做点什么
  return {
    ...response.data
  }
}, (error) => {
  console.log(error)
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default service
