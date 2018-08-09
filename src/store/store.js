import Vue from 'vue'
import Vuex from 'vuex'
import tab from './modules/tab.js'
import editor from './modules/editor.js'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    tab,
    editor
  }
})
