import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import './style.scss'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false
Vue.use(VueAnalytics, {
  id: 'UA-132391998-2',
  disabled: process.env.NODE_ENV !== 'production',
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
