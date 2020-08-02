import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import '@/style/reset.css'

Vue.config.productionTip = false
Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
