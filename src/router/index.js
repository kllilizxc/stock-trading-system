import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Search from '@/components/Search'
import Deal from '@/components/Deal'
import Record from '@/components/Record'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Search'
    },
    {
      path: '/SignIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/Deal',
      name: 'Deal',
      component: Deal
    },
    {
      path: '/Record',
      name: 'Record',
      component: Record
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
