import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isClicked: false
  },
  mutations: {
    mtnIsClicked(state, n) {
      state.isClicked = n;
    }
  },
  actions: {
    setIsClicked:({commit}, n) => {
      commit('mtnIsClicked', n)
    }
  },
  modules: {
  }
})
