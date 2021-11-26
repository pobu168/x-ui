import http from './axios'

const post = (url: string) => {
  return http.post(url)
}
const get = (url: string, params = {}) => http.get(
  url,
  params
)

// 接口说明
export const taskManInfo = () => post('/taskman/entities/request/query')
export const movie = (params: {} | undefined) => get('/capacity/api/v1/monitor/search', params)
