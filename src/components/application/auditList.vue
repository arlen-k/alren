<!--审核列表 -->
<template>
    <div>
        <h1 class="title page_title">应用审核</h1>
        <div class="container">
            <div class="head">
                <a class="app_tab" :class="{'active':currentView=='registeAudit'}" href="javascript:;" @click="toggleView('registeAudit')">注册审核</a>
                <a class="app_tab" :class="{'active':currentView=='onlineAudit'}" href="javascript:;" @click="toggleView('onlineAudit')">上线审核</a>
            </div>
            <keep-alive>
                <component :is="currentView"></component>
            </keep-alive>
        </div>
    </div>
</template>
<script>
   import registeAudit from './registeAuditList'
   import onlineAudit from './onlineAuditList'

   export default{
      data(){
          return{
              currentView:'registeAudit',
          }
      },
      methods:{
          toggleView(tab){
              this.currentView =tab
          }
      },
      components:{
          registeAudit,
          onlineAudit
      }

   }
</script>


<style lang="less">
</style>
