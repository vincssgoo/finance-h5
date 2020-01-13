import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import('../view/home/index')


// 1.安装VueRouter
Vue.use(VueRouter)

// 2.配置路由信息
const routes = [{
  path: '/',
  name: 'index',
  component: Index,
  meta: {
    title: '申请报销'
  }
}, ]

// 3.创建路由对象
const router = new VueRouter({
  mode: 'history',
  routes
})

// 4.导出
export default router