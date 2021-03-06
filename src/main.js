import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/fontawesome'
import './plugins/config'
import './plugins/bootstrap-vue'
import './plugins/axios'
import './plugins/user'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

window.vue = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
