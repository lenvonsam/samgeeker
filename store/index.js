import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import state from './state'

const store = () => {
  return new Vuex.Store({
    actions,
    state,
    mutations
  })
}

export default store