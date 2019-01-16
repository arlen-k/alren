<!--全部 -->
<template>
    <div>
        <ul class="list">
            <li class="list_item flex">
                <img src="../../assets/image/app_default.png"/>
                <div class="flex_item">
                    <router-link to="/app/auditDetail/audit" class="title page_title">警务通</router-link>
                    <p>开发者:深圳市安软科技有限公司</p>
                    <p>注册时间：2017-02-02</p>
                </div>
                <div class="flex_item">
                    <p>应用类型：III类</p>
                    <p>应用类别：专业</p>
                </div>
                <div class="flex_item">
                    <button class="btn btn_warning btn_lev3">待审核</button>
                </div>
                <div class="flex_item">
                    <button class="btn btn_normal btn_normal_success btn_lev3">通过</button>
                    <button class="btn btn_normal btn_normal_error btn_lev3">拒绝</button>
                </div>
            </li>
            <li class="list_item flex">
                 <img src="../../assets/image/app_default.png"/>
                 <div class="flex_item">
                     <router-link to="/app/auditDetail/online" class="title page_title">警务通</router-link>
                     <p>开发者:深圳市安软科技有限公司</p>
                     <p>注册时间：2017-02-02</p>
                 </div>
                 <div class="flex_item">
                     <p>应用类型：III类</p>
                     <p>应用类别：专业</p>
                 </div>
                 <div class="flex_item">
                     <button class="btn btn_warning btn_lev3">待审核</button>
                 </div>
                 <div class="flex_item">
                     <button class="btn btn_normal btn_normal_success btn_lev3">通过</button>
                     <button class="btn btn_normal btn_normal_error btn_lev3">拒绝</button>
                 </div>
            </li>
            <li class="list_item flex">
                 <img src="../../assets/image/app_default.png"/>
                 <div class="flex_item">
                     <router-link to="/app/auditDetail" class="title page_title">警务通</router-link>
                     <p>开发者:深圳市安软科技有限公司</p>
                     <p>注册时间：2017-02-02</p>
                 </div>
                 <div class="flex_item">
                     <p>应用类型：III类</p>
                     <p>应用类别：专业</p>
                 </div>
                 <div class="flex_item">
                     <button class="btn btn_warning btn_lev3">待审核</button>
                 </div>
                 <div class="flex_item">
                     <button class="btn btn_normal btn_normal_success btn_lev3">通过</button>
                     <button class="btn btn_normal btn_normal_error btn_lev3">拒绝</button>
                 </div>
            </li>
        </ul>
        <pager class="pageDiv"></pager>
    </div>
</template>
<script>
    import pager from '../public/pager'
    export default{
        data(){
            return{}
        },
        props:['list'],
        components:{
            pager
        }
    }
</script>

<style lang="less" scoped>

</style>

