import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import store from '../store'
import Dashboard from '../pages/Dashboard.vue'
import Login from '../pages/Login.vue'

const cache = {}
const routes = []
const $http = axios

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

importAll(require.context(ADMIN_PLUGINS, true, /\/routes.js$/));

function importAll(r) {
  r.keys().forEach(key => {
    cache[key] = r(key)
    routes.push(cache[key].default)
  });
}

let routerConfig = {
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
    let Token = localStorage.getItem('Token') || null

    if (to.path === loginPath) {
        next()
    } else if (Token) {
        $http.get(`${ADMIN_LOCATION}/api/auth`, {
            headers: { Authorization: Token }
        }).then(response => {
            if (response.data.adminAccess) {
                store.commit('setAuth', response.data.adminAccess)
                next()
            } else {
                next(loginPath)
            }
        }).catch(err => {
            console.error(err)
            next(loginPath)
        })
    } else {
        next(loginPath)
    }
})

export default router
