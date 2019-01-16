<!--详情基本信息 -->
<template>
    <div>
        <div class="panel">
             <div class="title panel_title">应用展示</div>
             <div class="flex line_height">
                 <span class="item_auto">应用截图</span>
             </div>
        </div>
        <div class="panel">
             <div class="title panel_title">应用简介</div>
             <div class="flex line_height">
                 <span class="item_auto">关键词</span>
                 <div>
                    <span class="keyword_label">实名认证</span>
                    <span class="keyword_label">车辆查询</span>
                    <span class="keyword_label">犯罪</span>
                    <span class="keyword_label">警务</span>
                 </div>
             </div>
             <div class="flex line_height">
                 <span class="item_auto">应用一句话介绍</span>
                 <span>实名认证查询是一个帮助警务人员检查人员检查人员和车辆的app</span>
             </div>
             <div class="flex line_height">
                 <span class="item_auto">应用简介</span>
                 <span class="flex_item">实名认证查询是一个帮助警务人员检查人员检查人员和车辆的app,实名认证查询是一个帮助警务人员检查人员检查人员和车辆的app实名认证查询是一个帮助警务人员检查人员检查人员和车辆的app实名认证查询是一个帮助警务人员检查人员检查人员和车辆的app实名认证查询是一个帮助警务人员检查人员检查人员和车辆的app</span>
             </div>
        </div>
        <div class="panel">
             <div class="title panel_title">安装包</div>
             <div class="flex line_height">
                 <span class="item_auto">安装包</span>
                 <div class="pkg">
                     <p>
                         <span class="text text_sub">文件名</span>
                         <span class="text text_sub text_sub_bold">real-name</span>
                     </p>
                     <p>
                          <span class="text text_sub">文件大小</span>
                          <span class="text text_sub text_sub_bold">real-name</span>
                     </p>
                     <p>
                         <span class="text text_sub">包名</span>
                         <span class="text text_sub text_sub_bold">real-name</span>
                     </p>
                     <p>
                         <span class="text text_sub">版本标识</span>
                         <span class="text text_sub text_sub_bold">real-name</span>
                     </p>
                     <p>
                         <span class="text text_sub">固件版本</span>
                         <span class="text text_sub text_sub_bold">real-name</span>
                     </p>
                 </div>
             </div>
        </div>
        <div class="panel">
             <div class="title panel_title">附件</div>
             <div class="flex line_height">
                 <span class="item_auto">附件</span>
                 <ul class="flex_item attach_list">
                    <li>
                        <div><i class="icon icon_attach"></i></div>
                        <p>实名认证</p>
                        <p class="text text_sub">196K</p>
                    </li>
                    <li>
                        <div><i class="icon icon_attach"></i></div>
                        <p>实名认证</p>
                        <p class="text text_sub">196K</p>
                    </li>
                 </ul>
             </div>
        </div>
    </div>
</template>
<script>
   export default{
      methods:{

      }

   }
</script>


<style lang="less" scoped>
    .panel{
        .keyword_label{
            width: 100px;
            background: #f3c022;
            padding: 8px 10px;
            display: inline-block;
            text-align: center;
            border-radius: 50px;
            color: #fff;
        }
        .pkg{
            .text{
                display:inline-block;
                line-height:18px;
                width:100px;
            }
        }
        .attach_list{
            li{
                display:inline-block;
                text-align:center;
                margin-right:75px;
            }
        }
    }
</style>

