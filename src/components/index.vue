<!--首页 -->
<template>
  <div>
      <header>
          <v-header></v-header>
      </header>
      <div class="content">
          <v-menu></v-menu>
          <div class="main">
              <router-view></router-view>
          </div>
      </div>
  </div>
</template>
<script>
    import vMenu from  './public/slide'
    import vHeader from './public/header'
    export default {
        data () {
            return{}
        },
        created(){
        },
        components:{
            vMenu,
            vHeader
        }
    }
</script>
<style lang="less">
</style>
