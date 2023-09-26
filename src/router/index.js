import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import StealthInquiry from '@/components/stealthInquiry'
import PersonalLedger from '@/components/personalLedger'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StealthInquiry',
      component: StealthInquiry
    },
    {
      path: '/stealthInquiry',
      name: 'StealthInquiry',
      component: StealthInquiry
    },
    {
      path: '/personalLedger',
      name: 'PersonalLedger',
      component: PersonalLedger
    },

  ]
})
