import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import UserDetail from '../components/UserDetail.vue'
import ExportCsv from '../components/ExportCsv.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
      path: '/userDetail/:uuid',
      name: 'userDetail',
      component: UserDetail
  },
  {
      path: '/exportToCsv',
      name: 'ExportCsv',
      component: ExportCsv
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
