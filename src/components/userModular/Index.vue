<!-- 中间层跳转 -->
<template>
    <div class="webview"></div>
</template>
<script>
import mixin from './tool'
export default {
  mixins: [mixin],
  data(){
    return{
      url:'/mp',
      path:'/login'
    }
  }
}
</script>

