import axios from './axios'

// export const BANNER = 'banner'
// export const RECOMMEND = 'recommend'

// export function getHomeMultidata() {
//   return axios({
//     url: '/home/multidata'
//   })
// }

// export function getHomeData(type, page) {
//   return axios({
//     url: '/home/data',
//     params: {
//       type,
//       page
//     }
//   })
// }
export function saveData(form) {
  return axios({
    url: "/api/backend/expense/store",
    method: "post",
    data: form
  })
}

export function getTypeList() {
  return axios({
    url: "/api/backend/payType/index",
    method: "get",
    params:{status:1}
  })
}