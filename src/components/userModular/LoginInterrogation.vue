/**登陆 问诊列表跳转层**/ 
<template >
  <div class="userContent">
    <login :params = 'params' :states = 'states' @login="login"/>
  </div>
</template>
<script>
import login from './tool/login.vue'
import mixins from './tool/login.js'
import { mapState } from 'vuex'

export default {   
  mixins: [mixins],
  components:{login},
  data(){
    return {
      states:2,
      path:'/interrogation/InReceptionState'
    }
  },
  computed: {
    ...mapState(['changeMsg']),
  },
  created(){
    if(this.changeMsg>1){
      this.$router.push('/interrogation/InReceptionState')
    }
  },
}
</script>