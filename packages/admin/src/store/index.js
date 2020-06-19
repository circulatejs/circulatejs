import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: false
  },
  getters: {
    getAuth: state => {
      return state.auth
    }
  },
  mutations: {
    setAuth(state, auth) {
        state.auth = auth
    }
  },
  actions: {
  },
  modules: {
  }
})
