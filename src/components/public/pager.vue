<template>
    <div class="pager">
        <span class="ivu-label fl">共展示&nbsp;{{Math.ceil(total/pageSize)}}&nbsp;页&nbsp;{{total}}&nbsp;条数据</span>
        <Page :current="current" :total="total" :page-size="pageSize" :page-size-opts="pageSizeOpts" class="fr" show-sizer show-elevator @on-change="onChange" @on-page-size-change="onPageSizeChange"></Page>
    </div>
</template>
<script>
    export default {
        name:'page',
        props:{
            current:{
                type : Number,
                default : 1
            },
            total:{
                type : Number,
                default : 0
            },
            pageSize:{
                type : Number,
                default : 10
            },
            pageSizeOpts:{
                type : Array,
                default(){
                    return [10,20,30,40,50]
                }
            }
        },
        methods:{
            onChange(){
                this.$emit('on-change')
            },
            onPageSizeChange(){
                this.$emit('on-page-size-change')
            }
        }
    }
</script>
<style scoped lang="less">
  .pager{
      overflow:hidden;
      .ivu-label,.ivu-page{
          display:inline-block;
          vertical-align:middle;
      }
  }
</style>
