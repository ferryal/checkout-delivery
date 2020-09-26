import Vue from 'vue'
import Router from 'vue-router'
import Delivery from './../views/Delivery'
import Payment from './../views/Payment'
import Finish from './../views/Finish'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Delivery',
      component: Delivery
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/finish',
      name: 'Finish',
      component: Finish
    }
  ]
})
