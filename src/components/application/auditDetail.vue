<!--审核详情,包含注册审核和上线审核详情 -->
<template>
    <div class="detail">
        <h1 class="title page_title"><a href="javascript:;" @click="returnBack"><i class="icon_operate icon_return"></i></a>&nbsp;应用详情</h1>
        <base-info></base-info>
        <online-info v-if="$route.params.type == 'online'"></online-info>

        <div class="text_center">
            <button class="btn btn_primary mar_auto size_long">编辑</button>
        </div>
    </div>
</template>
<script>
   import baseInfo from './appBaseInfo'
   import onlineInfo from './appOnlineInfo'
   import mixin from '../../common/mixin'
   export default{
      mixins:[mixin],
      data(){
          return{

          }
      },
      components:{
          baseInfo,
          onlineInfo
      }
   }
</script>


<style lang="less">
    .detail{
        .panel{
            padding:30px 40px;
            .flex{
                align-items:flex-start;
            }
            .item_auto{
                width:150px;
            }
            .line_height{
                margin:20px 0;
            }
        }
    }
</style>

