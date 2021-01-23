import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isClicked: false,
    showCatg: true,
  },
  mutations: {
    mtnIsClicked(state, n) {
      state.isClicked = n;
    },
    mtnShowCatg(state, n) {
      state.showCatg = n;
    }
  },
  actions: {
    setIsClicked:({commit}, n) => {
      commit('mtnIsClicked', n)
    },
    setShowCatg:({commit}, n) => {
      commit('mtnShowCatg', n);
    }
  },
  modules: {
  }
})
