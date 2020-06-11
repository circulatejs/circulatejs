import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import Home from '../components/Home.vue'
import Login from '../components/Login.vue'

const isAuthenticated = false
const cache = {}
const routes = []
const $http = axios

Vue.use(VueRouter)

const home = {
    path: '/',
    menu: 'Home',
    component: Home
}

const login = {
    path: '/login',
    component: Login
}

routes.push(home)
routes.push(login)

importAll(require.context(ADMIN_PLUGINS, true, /\/routes.js$/));

function importAll(r) {
  r.keys().forEach(key => {
    cache[key] = r(key)
    routes.push(cache[key].default)
  });
}

const router = new VueRouter({
    mode: 'history',
    base: `${ADMIN_LOCATION}/`,
    routes
})

// Setup the route guard
router.beforeEach((to, from, next) => {
    const loginPath = '/login'
    let Token = localStorage.getItem('Token') || null

    if (to.path === loginPath) {
        next()
    }

    if (Token) {
        $http.get('/admin/api/auth', {
            headers: { Authorization: Token }
        }).then(response => {
            if (response.data.adminAccess) {
                next()
            } else {
                next(loginPath)
            }
        }).catch(err => {
            next(loginPath)
        })
    }
})

export default router
