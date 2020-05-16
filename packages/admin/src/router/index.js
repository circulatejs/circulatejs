import Vue from 'vue'
import VueRouter from 'vue-router'
// const glob = require('glob')

const cache = {}
const routes = []

function importAll(r) { 
  r.keys().forEach(key => {
    console.log(key)
    cache[key] = r(key)
    routes.push(cache[key].default)
  });
} 

importAll(require.context('./plugins/', true, /\.js$/));

Vue.use(VueRouter)

console.log(cache)
console.log(routes)

// routes.push(cache)

// const RoutePaths = glob.sync('./plugins/*');


// RoutePaths.forEach(route => {
//   routes.push(route);
// });

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
