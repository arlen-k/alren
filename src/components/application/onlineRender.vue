<!--app仓库列表公共组件 -->
<template>
    <div>
        <ul class="list">
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
                <div class="flex_item" v-if="listType == type.online">
                    <a class="operate"><i class="icon_operate icon_offline"></i>下架</a>
                    <a class="operate"><i class="icon_operate icon_release"></i>升级</a>
                </div>
                <div class="flex_item" v-else-if="listType == type.offline">
                    <a class="operate"><i class="icon_operate icon_online"></i>上架</a>
                    <Dropdown class="operate">
                        <a class=""><i class="icon_operate icon_other"></i>其它</a>
                        <DropdownMenu slot="list">
                             <DropdownItem>升级</DropdownItem>
                             <DropdownItem>编辑</DropdownItem>
                             <DropdownItem>删除</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="flex_item" v-else-if="listType == type.draft">
                    <a class="operate"><i class="icon_operate icon_delete"></i>删除</a>
                    <a class="operate"><i class="icon_operate icon_edit"></i>编辑</a>
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
            return{
                type:{
                    online:'1',
                    offline:'2',
                    draft:'3'
                }//列表类型，1表示上线列表，2表示下架列表，3表示草稿箱列表
            }
        },
        props:['listType'],
        components:{
            pager
        }
    }
</script>

<style lang="less" scoped>
    .operate{
        margin-right:20px;
    }
</style>

