import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuItems: []
  },
  getters: {
    getMenuItems: state => {
      return state.menuItems
    }
  },
  mutations: {
    addMenuItem(state, menuItem) {
      state.menuItems.push(menuItem)
    }
  },
  actions: {
  },
  modules: {
  }
})
