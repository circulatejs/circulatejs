import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: false,
    user: ''
  },
  getters: {
    getAuth: (state) => {
      return state.auth
    },
    getUser: (state) => {
      return state.user
    }
  },
  mutations: {
    setAuth(state, auth) {
      state.auth = auth
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {},
  modules: {}
})
