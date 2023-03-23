import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

import mutations from "./mutations"
import actions from "./actions"
import getters from './getters'



// 2.创建Store对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 挂载到实例
export default store
