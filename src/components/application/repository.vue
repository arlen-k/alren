<!--应用仓库 -->
<template>
    <div>
        <h1 class="title page_title">应用仓库</h1>
        <div class="container">
            <div class="head flex">
                <a class="app_tab" :class="{'active':currentView=='online'}" href="javascript:;" @click="toggleView('online')">已上线</a>
                <a class="app_tab" :class="{'active':currentView=='offline'}" href="javascript:;" @click="toggleView('offline')">已下架</a>
                <a class="app_tab" :class="{'active':currentView=='draft'}" href="javascript:;" @click="toggleView('draft')">草稿箱</a>
                <div class="flex_item text_right">
                    <span class="pRe">
                        <input type="text" placeholder="请输入应用或开发者名称" class="app_search"/>
                        <i class="icon_operate icon_search"></i>
                    </span>
                    <button class="btn btn_primary btn_lev1">创建应用</button>
                </div>
            </div>
            <keep-alive>
                <component :is="currentView"></component>
            </keep-alive>
        </div>
    </div>
</template>
<script>
   import online from './appOnline'
   import offline from './appOffline'
   import draft from './appDraft'

   export default{
      data(){
          return{
              currentView:'online',
          }
      },
      methods:{
          toggleView(tab){
              this.currentView =tab
          }
      },
      components:{
          online,
          offline,
          draft
      }

   }
</script>


<style lang="less">
.v-select{
    width:140px;
}
.app_search{
    width:365px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    padding:10px;
}
.icon_search{
    position: absolute;
    right: 5px;
    top: -5px;
}
</style>
