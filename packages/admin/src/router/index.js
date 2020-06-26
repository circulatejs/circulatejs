import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import store from '../store'
import Dashboard from '../pages/Dashboard.vue'
import Login from '../pages/Login.vue'

const cache = {}
const routes = []
const $http = axios

// eslint-disable-next-line
const adminPluginSetting = ADMIN_PLUGINS
// eslint-disable-next-line
const adminDevSetting = ADMIN_DEV

const loginPath = '/login'

Vue.use(VueRouter)

const defaultRoute = {
  path: '*',
  component: Dashboard
}
const dashboard = {
  path: '/',
  menu: 'Dashboard',
  component: Dashboard
}
const login = {
  path: '/login',
  component: Login
}

routes.push(defaultRoute)
routes.push(dashboard)
routes.push(login)

importAll(require.context(adminPluginSetting, true, /\/routes.js$/))

function importAll(r) {
  r.keys().forEach((key) => {
    cache[key] = r(key)
    routes.push(cache[key].default)
  })
}

const routerConfig = {
  mode: 'history',
  base: `${adminPluginSetting}/`,
  routes
}

if (adminDevSetting) {
  delete routerConfig.mode
  delete routerConfig.base
}

const router = new VueRouter(routerConfig)

// Setup the route guard
router.beforeEach((to, from, next) => {
  const Token = localStorage.getItem('Token') || null

  if (to.path === loginPath) {
    next()
  } else if (Token) {
    $http
      .get(`${adminPluginSetting}/api/auth`, {
        headers: { Authorization: Token }
      })
      .then((response) => {
        if (response.data.adminAccess) {
          store.commit('setAuth', response.data.adminAccess)
          next()
        } else {
          next(loginPath)
        }
      })
      .catch((err) => {
        console.error(err)
        next(loginPath)
      })
  } else {
    next(loginPath)
  }
})

export default router
