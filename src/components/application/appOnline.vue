<!-- 已上线-->
<template>
    <div class="body">
        <Select placeholder="应用类型" class="v-select">
            <Option value="1">I类</Option>
            <Option value="2">II类</Option>
        </Select>
        <Select placeholder="应用类别" class="v-select">
            <Option value="1">I类</Option>
            <Option value="2">II类</Option>
        </Select>
        <Select placeholder="提供地区" class="v-select">
            <Option value="1">I类</Option>
            <Option value="2">II类</Option>
        </Select>
        <list :list-type="1"></list>
    </div>
</template>
<script>
    import list from './onlineRender'


    export default{
        data(){
            return {

            }
        },
        methods:{
        },
        components:{
            list
        }

    }
</script>

<style lang="less">
</style>
