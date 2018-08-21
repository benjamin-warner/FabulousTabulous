import Vue from 'vue'
import App from './App.vue'
import store from './store/store.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt, faPlusCircle, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrashAlt, faPlusCircle, faCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')