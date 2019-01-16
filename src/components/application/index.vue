<!--应用管理首页-->
<template>
    <router-view></router-view>
</template>
<script>

</script>
<style lang="less">
    .container{
        .head{
            border-bottom:1px solid #d9d9d9;
            padding:0 20px;
            height:80px;
            .app_tab{
                display:inline-block;
                font-weight:600;
                color:#666;
                padding:28px 30px;
                width:120px;
                &.active{
                    color:#333;
                    border-bottom:2px solid #00b9f5;
                }
            }
        }
        .body{
            padding:20px;
            .list{
                margin:0 -20px;
                .list_item{
                      padding:20px;
                      border-bottom:1px solid #eff2f7;
                      .flex_item{
                          margin-left:20px;
                      }
                      p{
                          margin:5px 0;
                          color:#666;
                      }
                }
            }
            .pageDiv{
               padding:29px 0;
            }
        }

    }
</style>
