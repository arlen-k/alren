import Vue from 'vue';
import iview from 'iview';
import axios from 'axios';

import filter from './common/filters'

import App from './App';
import router from './router';
import store from './vuex';
import config from './common/config';

import 'iview/dist/styles/iview.css';



Vue.config.productionTip = false
window.config = config

Vue.use(iview)


/*配置全局路由拦截*/
router.beforeEach((to,from,next)=>{
    if(to.name && to.name.length > 0){
       store.commit('setCurrentMenu',to.name);
    }

    next();

});




axios.defaults.timeout = 3000;
/*配置请求拦截器*/
//请求拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  iview.Loading.start();
  return config;
}, function (error) {
  // 对请求错误做些什么
  iview.Modal.error({
      title:'错误',
      content:'请求出错'
  })
  iview.Loading.finish();
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么


  iview.Loading.start();
  return response;
}, function (error) {
  // 请求错误统一处理
  iview.Loading.finish();
  let res = error.response;
  if(res.status == 404){
      iview.Modal.error({
          title:'错误',
          content:'请求地址未找到'
      })
  }else if(res.status == ''){
    //session过期

  }


  return Promise.reject(error);
});

/*全局引入axios，无需再每个组件里引入*/
Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
