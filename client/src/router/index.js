import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import setPassword from '@/components/setPassword'
import dashboard from '@/components/dashboard'
import profile from '@/components/profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/setPassword',
      name: 'setPassword',
      component: setPassword
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    }
  ]
})
