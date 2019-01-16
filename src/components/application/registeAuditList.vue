<!-- 注册审核列表-->
<template>
    <div class="body">
        <div>
           <button class="btn btn_primary btn_lev2" :class="{'btn_link':currentView != 'all'}"  @click="toggleTab('all')">全部73</button>
           <button class="btn btn_warning btn_lev2" :class="{'btn_link':currentView != 'audit'}"  @click="toggleTab('audit')">待审核73</button>
           <button class="btn btn_success btn_lev2" :class="{'btn_link':currentView != 'pass'}"  @click="toggleTab('pass')">已通过73</button>
           <button class="btn btn_error btn_lev2"   :class="{'btn_link':currentView != 'refuse'}"  @click="toggleTab('refuse')">已拒绝73</button>
        </div>
        <component :is="currentView"></component>
    </div>
</template>
<script>
    import all from './appAll'
    import audit from './appAudit'
    import pass from './appPass'
    import refuse from './appRefuse'

    export default{
        data(){
            return {
                currentView:'all'
            }
        },
        methods:{
            toggleTab(tab){
                if(this.currentView != tab){
                    this.currentView = tab
                }
            }
        },
        components:{
            all,
            audit,
            pass,
            refuse
        }

    }
</script>

<style lang="less">
</style>
