import Vue from 'vue'
import Router from 'vue-router'
// import Delivery from '@/views/Delivery'
import Delivery from './../views/Delivery'
import Payment from './../views/Payment'
import Finish from './../views/Finish'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Delivery
    },
    {
      path: '/payment',
      name: 'HelloWorld',
      component: Payment
    },
    {
      path: '/finish',
      name: 'HelloWorld',
      component: Finish
    }
  ]
})
