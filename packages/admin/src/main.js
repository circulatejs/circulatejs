import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router/index.js'
import store from './store/index.js'

// Load in the styling
import '../src/assets/css/base.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#admin')
