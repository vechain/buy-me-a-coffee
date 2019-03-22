import Vue from 'vue'
import Router from 'vue-router'
import Donate from './views/Donate.vue'
import Generate from './views/Generate.vue'
import Thanks from './views/Thanks.vue'
import { Route } from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'Generate',
    },
    {
      path: '/donate',
      name: 'Donate',
      component: Donate,
      beforeEnter(to: Route, from: Route, next: (val?: any) => void) {
        if (!to.query.addr) {
          next({ name: 'Generate' })
        } else {
          next()
        }
      },
    },
    {
      path: '/generate',
      name: 'Generate',
      component: Generate,
    },
    {
      path: '/thanks',
      name: 'Thanks',
      component: Thanks,
    },
  ],
})
