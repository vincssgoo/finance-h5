// import request from '@/utils/request'
import request from '@/network/axios'

export function getQiniuToken() {
  return request({
    url: '/api/common/upload/token',
    method: 'get',
    params: {}
  })
}