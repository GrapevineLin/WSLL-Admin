import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import http from './http';
import global_ from './components/Global'
import VueParticles from 'vue-particles'  

Vue.use(VueParticles)
Vue.config.productionTip = false
Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面
Vue.prototype.$http = http;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')