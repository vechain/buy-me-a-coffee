import Vue from 'vue'
import Router from 'vue-router'
import Backer from './views/Backer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/backer',
      name: 'Backer',
      component: Backer,
    },
  ],
})
