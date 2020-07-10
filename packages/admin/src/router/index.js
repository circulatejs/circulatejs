import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from '../store'

const cache = {}
const routes = []
const $http = axios

const loginPath = '/login'

Vue.use(VueRouter)

const dashboard = {
  path: '/',
  component: () => import(/* webpackChunkName: "dashboard" */ '../pages/Dashboard.vue')
}
const users = {
  path: '/users',
  component: () => import(/* webpackChunkName: "users" */ '../pages/Users.vue')
}
const login = {
  path: '/login',
  component: () => import(/* webpackChunkName: "login" */ '../pages/Login.vue')
}
const defaultRoute = {
  path: '*',
  redirect: '/'
}

routes.push(dashboard)
routes.push(users)
routes.push(login)
routes.push(defaultRoute)

// eslint-disable-next-line
importAll(require.context(ADMIN_PLUGINS, true, /\/adminRoutes.js$/))

function importAll(r) {
  r.keys().forEach((key) => {
    cache[key] = r(key)
    routes.push(cache[key].default)
  })
}

const routerConfig = {
  mode: 'history',
  // eslint-disable-next-line
  base: `${ADMIN_LOCATION}/`,
  routes
}

// console.log(ADMIN_DEV)

// eslint-disable-next-line
if (ADMIN_DEV) {
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
      // eslint-disable-next-line
      .get(`${ADMIN_LOCATION}/api/auth`, {
        headers: { Authorization: Token }
      })
      .then((response) => {
        if (response.data.adminAccess) {
          store.commit('setAuth', response.data.adminAccess)
          store.commit('setUser', response.data.userData.name)
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
