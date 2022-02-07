import http from './axios'
type YY = {
  errorCode: boolean,
  data: any,
  errorMessage: string
}
const post = (url: string, data: any) => {
  return http.post(url, data)
}
const get = (url: string, params = {}) => http.get(
  url,
  params
)
const put = (url: string, params = {}) => http.put(
  url,
  params
)
const deletes = (url: string, data: any) => http.delete(
  url,
  data
)

// 接口说明
export const getTags = (data:any) => post('customer/tags/list', data)
export const addTags = (data:any) => post('customer/tags', data)
export const editTag = (data:any) => put(`customer/tags`, data)
export const deleteTag = (ids: any) => deletes(`customer/tags`, { data: ids })
export const enableTags = (data:any) => post('customer/tags/enable', data)
export const disableTags = (data:any) => post('customer/tags/disable', data)
export const uploadTags = (data:any) => post('customer/tags/upload', data)
export const downloadTags = (data:any) => post('customer/tags/disable', data)
