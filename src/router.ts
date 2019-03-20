import Vue from 'vue'
import Router from 'vue-router'
import Donate from './views/Donate.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/donate',
      name: 'Donate',
      component: Donate,
    }, {
      path: '/backer',
      redirect: '/donate',
    },
  ],
})
