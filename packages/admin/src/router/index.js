import Vue from 'vue'
import VueRouter from 'vue-router'

const cache = {}
const routes = []

Vue.use(VueRouter)

importAll(require.context(ADMIN_PLUGINS, true, /\/routes.js$/));

function importAll(r) { 
  r.keys().forEach(key => {
    cache[key] = r(key)
    routes.push(cache[key].default)
  });
}

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
