import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

export default {
  // 預設module使用 ex app/GetShop
  //namespaced: true,
  state,
  getters,
  mutations,
  actions
};
