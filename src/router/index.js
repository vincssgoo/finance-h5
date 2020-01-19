import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../view/home/index')
const Proof = () => import('../view/proof/index')
const ProofOut = () => import('../view/proofOut/index')
const ProofBx = () => import('../view/proofBx/index')


// 1.安装VueRouter
Vue.use(VueRouter)

// 2.配置路由信息
const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '申请报销'
    }
  },
  {
    path: '/proof',
    name: 'Proof',
    component: Proof,
    meta: {
      title: '收入凭证'
    }
  },
  {
    path: '/proofOut',
    name: 'ProofOut',
    component: ProofOut,
    meta: {
      title: '支出凭证'
    }
  },
  {
    path: '/proofBx',
    name: 'ProofBx',
    component: ProofBx,
    meta: {
      title: '报销凭证'
    }
  },

]

// 3.创建路由对象
const router = new VueRouter({
  mode: 'history',
  routes
})

// 4.导出
export default router