import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import HeroData from '@/pages/herodata/HeroData'
import Information from '@/pages/information/Information'
import ShoppingCar from '@/pages/shoppingcar/ShoppingCar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/HeroData',
      name: 'HeroData',
      component: HeroData
    },
    {
      path: '/Information',
      name: 'Information',
      component: Information
    },
    {
      path: '/ShoppingCar',
      name: 'ShoppingCar',
      component: ShoppingCar
    }
  ]
})
