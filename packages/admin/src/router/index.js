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
const userAdd = {
  path: '/users/add',
  component: () => import(/* webpackChunkName: "users" */ '../pages/User.vue'),
  meta: {
    editUser: false
  }
}
const userEdit = {
  path: '/users/:id',
  component: () => import(/* webpackChunkName: "users" */ '../pages/User.vue'),
  meta: {
    editUser: true
  }
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
routes.push(userAdd)
routes.push(userEdit)
routes.push(login)
routes.push(defaultRoute)

// This imports all the routes from plugins
importAll(require.context(ADMIN_PLUGINS, true, /\/adminRoutes.js$/))

const routerConfig = {
  mode: 'history',
  base: `${ADMIN_LOCATION}/`,
  routes
}

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

// Function to get all the available routes within a plugin
function importAll(r) {
  r.keys().forEach((key) => {
    cache[key] = r(key)
    cache[key].default.forEach((route) => {
      routes.push(route)
    })
  })
}

export default router
