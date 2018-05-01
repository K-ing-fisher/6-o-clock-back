import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing/Landing'
import Login from '@/components/Login/Login'
import Signup from '@/components/Signup/Signup'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/success',
      name: test,
      component: test
    }
  ]
})
