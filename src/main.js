import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import util from './common/utils'
import store from '@/store/index'
import http from './common/http'
import qs from 'qs'
import Vconsole from 'vconsole'
import '../static/chat/WebIMConnection'	
// new Vconsole();
 
Vue.config.productionTip = false
Vue.prototype.$SERVERURL = '/clinic_file/static'
Vue.prototype.$utils = util
Vue.prototype.$http=http
Vue.prototype.Qs = qs
Vue.use(Vant);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
