import Vue from 'vue'
import Vuex from 'vuex'

//store create
import auth from './auth'
import users from './users'




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
  auth,users
  }
})
