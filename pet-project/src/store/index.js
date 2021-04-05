import Vue from 'vue'
import Vuex from 'vuex'
import Actions from './actions/indexAction.js'
import Mutations from './mutations/indexMutation.js'
import Getters from './getters/indexGetter.js'
import InitialState from './initialState.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: InitialState,
  mutations: Mutations,
  actions: Actions,
  getters: Getters
})
