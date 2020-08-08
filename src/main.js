import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import '@/style/reset.css'
import './icons' // icon


Vue.config.productionTip = false
Vue.use(Element)
Vue.prototype.$msg = Element.Message
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
