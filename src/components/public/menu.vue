<!--菜单组件-->
<template>
    <div class="menu">
        <Menu :theme="menu.theme" :open-names="getCurrentMenu" :width="menu.width" accordion>
            <template v-for="(fMenu,fIndex) in menu.list">
                <Submenu :name="fIndex">
                    <template slot="title" v-if="fMenu.path">
                        <i class="icon" :class="select(fMenu)"  v-if="fMenu.icon"></i>
                        <router-link :to="fMenu.path"  class="font_size_16">{{fMenu.name}}</router-link>
                    </template>
                    <template slot="title" v-else="fMenu.path">
                         <i class="icon" :class="select(fMenu)" v-if="fMenu.icon"></i>{{fMenu.name}}
                    </template>

                    <template v-for="(sMenu,sIndex) in fMenu.children">
                        <MenuItem :name="fIndex+'-'+sIndex" class="font_size_16">
                             <router-link :to="sMenu.path">{{sMenu.name}}</router-link>
                        </MenuItem>
                    </template>
                </Submenu>
            </template>
        </Menu>
    </div>
</template>
<script>
    import menu from '../../common/menu'
	  import {mapGetters} from 'vuex';
    export default{
        data(){
            return{
                menu:null
            }
        },
        created(){
            this.menu = menu
        },
        methods:{
            select(menu){
				        return this.$store.state.currentMenu == menu.type ? menu.icon+' select' : menu.icon
            }
        },
        computed:{
            ...mapGetters(['getCurrentMenu'])
        }
    }
</script>

<style lang="less" scoped>
	@import '../../assets/theme/theme01.less';

  .background{background:#262a33};
	.ivu-menu{
		font-size:@font_size_16;
		background:#1a1a1a;
		a{
			color:rgba(255,255,255,.7);
			&.router-link-active{
				color:#fff;
				font-weight:600;
			}
		}
		.ivu-menu-submenu{
		  .ivu-menu-item-active{
		      background:none !important;
		      &:hover{
		          background:none !important;
		      }
		  }
		}
	}
	.icon{
      display:inline-block;;
      width:30px;
      height:30px;
      vertical-align: middle;
      &.icon_console{
          background:url(../../assets/image/console.png);
          &.select{
             background:url(../../assets/image/console_select.png);
             &:before{
                border-left:2px solid @theme_background_color;
             }
          }
      }
      &.icon_app{
          background:url(../../assets/image/app.png);
          &.select{
             background:url(../../assets/image/app_select.png);
          }
      }
      &.icon_developer{
          background:url(../../assets/image/developer.png);
          &.select{
             background:url(../../assets/image/developer_select.png);
          }
      }
      &.icon_resource{
          background:url(../../assets/image/resource.png);
          &.select{
             background:url(../../assets/image/resource_select.png);
          }
      }
      &.icon_statistics{
          background:url(../../assets/image/statistics.png);
          &.select{
             background:url(../../assets/image/statistics_select.png);
          }
      }
      &.icon_operate{
          background:url(../../assets/image/operate.png);
          &.select{
             background:url(../../assets/image/operate_select.png);
          }
      }
      &.icon_system{
          background:url(../../assets/image/system.png);
          &.select{
             background:url(../../assets/image/system_select.png);
          }
      }
	}
</style>
