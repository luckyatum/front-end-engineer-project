// index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    getCount: (state) => {
      return state.count
    }
  },
  actions: {
    increment({ commit, state }) {
      commit('setCount', state.count + 1)
    }
  },
  mutations: {
    setCount (state, count) {
      state.count = count
    }
  }
})
