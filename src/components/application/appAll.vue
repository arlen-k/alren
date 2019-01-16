<!--全部 -->
<template>
    <div>
        <r-list></r-list>
    </div>
</template>
<script>
    import rList from './registeRender'
    import pager from '../public/pager'
    export default{
        data(){
            return{}
        },
        components:{
            pager,
            rList
        }
    }
</script>

<style lang="less" scoped>

</style>

