import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1
  },
  getters: {
    doubleState: (state) => {
      return state.counter * 2
    }
  },
  mutations: {
    add(state) {
      state.counter++
    }
  },
  actions: {
    add({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  modules: {
  }
})
