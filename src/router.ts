import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Backer from './views/Backer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/backer',
      name: 'Backer',
      component: Backer,
    },
  ],
})
