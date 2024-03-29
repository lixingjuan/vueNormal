import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from "@/store/index";

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
}).$mount('#app')
