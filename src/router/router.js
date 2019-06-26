import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: '首页',
      component: () => import('@/components/Home.vue'),
    },{
      path: '/homeInterrogation',
      name: '问诊首页',
      component: () => import('@/components/HomeInterrogation.vue'),   
    },{
      path: '/mp',
      name: '登陆跳转层',
      component: () => import('@/components/userModular/Index.vue'),
    },{
      path: '/mpInterrogation',
      name: '问诊登陆跳转层',
      component: () => import('@/components/userModular/IndexInterrogation.vue'),
    },{
      path: '/login',
      name: '登陆',
      component: () => import('@/components/userModular/Login.vue'),
    },{
      path:'/loginInterrogation',
      component: () => import('@/components/userModular/LoginInterrogation.vue'),
    },{
      path: '/forgetUser',
      name: '忘记密码',
      component: () => import('@/components/userModular/ForgetUser.vue'),
    },{
      path: '/reset',
      name: '重置密码',
      component: () => import('@/components/userModular/Reset.vue'),
    },{
      path: '/personal',
      name: '个人中心',
      component: () => import('@/components/personal/Index.vue'),
      hidden: true,
      children: [{
          path: '/personal/PersonalHome',component: () => import('@/components/personal/PersonalHome.vue')
        },{
          path: '/personal/PersonalData',component: () => import('@/components/personal/PersonalData.vue')
        },{
          path: '/personal/Statistics',component: () => import('@/components/personal/Statistics.vue')
        },{
          path: '/personal/OrderList',component: () => import('@/components/personal/OrderList.vue')
        },{
          path: '/personal/Detail',component: () => import('@/components/personal/Detail.vue')
        },{
          path: '/personal/UpDown',component: () => import('@/components/personal/UpDown.vue')
        },{
           path: '/personal/PersonalSave',component: () => import('@/components/personal/PersonalSave.vue')   
        },{
           path: '/personal/pdfView',component: () => import('@/components/personal/pdfView.vue')   
        }
      ]
    },{
      path: '/interrogation',
      name: '在线',
      component: () => import('@/components/interrogation/Index.vue'),
      hidden: true,
      children: [{
          path: '/interrogation/InReceptionState',component: () => import('@/components/interrogation/InReceptionState.vue')
        },{
          path: '/interrogation/InReceptionHandle',component: () => import('@/components/interrogation/InReceptionHandle.vue')
        },{
          path: '/interrogation/chat',component: () => import('@/components/interrogation/Chat.vue')
        },{
          path: '/interrogation/rejectionrDetail',component: () => import('@/components/interrogation/RejectionrDetail.vue')
        }
      ]
    }
  ]
})
