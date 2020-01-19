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
    params: {
      status: 1
    }
  })
}

export function getIncomeProof(id) {
  return axios({
    url: "/api/backend/income/proof",
    method: "get",
    params: {
      id: id
    }
  })
}

export function postIncomeProof(form) {
  return axios({
    url: "/api/backend/income/proofStore",
    method: "post",
    data: {
      id: form.id,
      proof: form.proof,
      user_id: form.user_id
    }
  })
}

export function getOutcomeProof(id) {
  return axios({
    url: "/api/backend/pay/proof",
    method: "get",
    params: {
      id: id
    }
  })
}

export function postOutcomeProof(form) {
  return axios({
    url: "/api/backend/pay/proofStore",
    method: "post",
    data: {
      id: form.id,
      pay_proof: form.pay_proof,
      user_id: form.user_id
    }
  })
}
export function getExpenseProof(id) {
  return axios({
    url: "/api/backend/expense/proof",
    method: "get",
    params: {
      id: id
    }
  })
}

export function postExpenseProof(form) {
  return axios({
    url: "/api/backend/expense/proofStore",
    method: "post",
    data: {
      id: form.id,
      expense_proof: form.expense_proof,
      user_id: form.user_id
    }
  })
}