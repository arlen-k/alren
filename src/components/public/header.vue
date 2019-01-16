<!--公共头部组件-->
<template>
  <div class="header">
      <div class="logo fl">
          <img src="../../../static/image/system_logo.png" class="logoHead"/>
          <span class="index_name">{{config.SYSTEM.HEADER_NAME}}</span>
          <span class="child_index_name">{{config.SYSTEM.CHILD_SYSTEM_NAME}}</span>
      </div>
      <div class="user fr">
          <Poptip width="280" placement="bottom">
              <i class="icon icon_message"></i>
              <div slot="content" class="poptip">
                  <div class="mar_b_15 clearfix">
                      <label class="title fl">管理中心</label>
                      <router-link to="/operate/comments" class="fr">查看更多</router-link>
                  </div>
                  <ul>
                      <li class="message_item unread">
                          <span class="author">6666&nbsp;2017-08-08</span>
                           <router-link to="/operate/comments" class="desc">天天学习好好向上，天天学习好好向上，天天学习好好向上，天天学习好好向上，天天学习好好向上</router-link>
                      </li>
                      <li class="message_item">
                           <span class="author">6666&nbsp;2017-08-08</span>
                           <router-link to="/operate/comments" class="desc">天天学习好好向上，天天学习好好向上，天天学习好好向上，天天学习好好向上，天天学习好好向上</router-link>
                      </li>
                  </ul>
              </div>
          </Poptip>

          <Poptip width="280" placement="bottom-end">
              <div class="user_poptip">
                  <i class="icon_portal"></i>&nbsp;&nbsp;&nbsp;6666
                  <Icon type="arrow-down-b" class="drop"></Icon>
              </div>
              <div slot="content" class="poptip">
                  <div class="base">
                     <h2 class="name">6666</h2>
                     <div class="number">1111</div>
                  </div>
                  <div class="base">
                      <router-link to="/console">应用管理</router-link><br/>
                      <router-link to="/console">管控中心</router-link>
                  </div>
                  <a class="logout" @click="$router.push('/login')">退出登录</a>
              </div>
          </Poptip>
      </div>
  </div>
</template>
<script>
    export default{
        data(){
            return{
                config:window.config
            }
        }
    }
</script>

<style lang="less">
	@import '../../assets/theme/theme01.less';

	.header{
    .logoHead{
      width: 40px;border-radius: 50%;margin-top: 10px;
    }
	  overflow:hidden;
		.flex(){
			  flex:1
		}
		.line(){
			  line-height: 70px;
		}
	  .logo{
        .index_name{
		        .line;
            .font_size_20;
            font-weight:600;
            vertical-align: top;
        }
        .child_index_name{
		        .line;
            .font_size_18;
            vertical-align: top;
            margin-left:25px;
        }
		}
		.user{
			.line();
			text-align:right;
      .poptip{
			    padding:12px 4px;
			    text-align:left;
          .title{
              font-weight:600;
              color:@color_333;
              float:left;
          }
          .message_item{
              background:#f5f8fc;
              margin-bottom:5px;
              text-align:left;
              padding:10px;
              &.unread{
                  border-left:2px solid #F3c022;
              }
              .author{
                  .font_size_12;
                  color:@color_999;
                  .mar_b_10;
              }
              .desc{
                  color:@color_333;
                  overflow:hidden;
                  text-overflow:ellipsis;
                  white-space:nowrap;
                  display:-webkit-box;
                  -webkit-box-orient:vertical;
                  -webkit-line-clamp:2;
              }
          }
          .base{
              .mar_b_10;
              border-bottom:1px solid #eff2f7;
			        padding-bottom:10px;
              .name{
                   .font_size_20;
                   font-weight:600;
                   text-align:left;
                   color:@color_333;
                   .mar_b_5
              }
              .number{
                   color:@color_666;
              }

          }
          .logout{
           	color:#fb6c6c;
          }

      }
			.user_poptip{
          align-items: center;
          margin:0 30px;
          .pointer;
          .drop{
              margin-left:30px;
          }
			}
		}
	}

</style>
