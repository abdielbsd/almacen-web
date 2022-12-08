import Vue from 'vue'
import Vuex from 'vuex'

//store create
import auth from './auth'


Vue.use(Vuex)

export default new Vuex.Store({

  /*state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },*/
  modules: {
    auth
  }
})
