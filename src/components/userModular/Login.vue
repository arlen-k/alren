/**登陆**/ 
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
  computed: {
    ...mapState(['changeMsg']),
  },
  created(){
    if(this.changeMsg>1){
      this.$router.push('/personal/personalHome')
    }
      
  },
  data(){
    return {
      states:1,
      path:'/personal/personalHome'
    }
  },
  methods:{
     
  }
}
</script>