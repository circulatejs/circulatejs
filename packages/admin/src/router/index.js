import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'

const cache = {}
const routes = []

Vue.use(VueRouter)

const home = {
    path: '/',
    menu: 'Home',
    component: Home
}

routes.push(home)

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

export default router
