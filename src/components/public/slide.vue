<!--菜单组件-->
<template>
    <div class="menu">
        <ul class="v-menu">
            <li class="v-menu-item" v-for="(fMenu,index) in menu.list" :class="{'v-menu-opened':selected(index)}">
                <!--一级菜单-->
                <div class="v-menu-item-title">
                    <span :class="fMenu.icon">
                        <i class="icon" :class="{'select':selected(index)}"></i>
                    </span>
                    <a href="javascript:;" class="v-menu-link" :class="{'v-menu-active':getCurrentMenu['menu'] == index}" @click="toggleMenu(fMenu)">{{fMenu.name}}</a>
                    <i class="ivu-icon ivu-icon-ios-arrow-down v-arrow" v-if="fMenu.children.length>0"></i>
                </div>
                <!--二级菜单-->
                <ul class="v-submenu animate slideInDown" v-if="selected(index)">
                    <li class="v-submenu-item" v-for="(sMenu,sIndex) in fMenu.children">
                        <a href="javascript:;" class="v-menu-link" :class="{'v-menu-active':getCurrentMenu['subMenu'] == sIndex}" @click="toggleMenu(sMenu)">{{sMenu.name}}</a>
                    </li>
                </ul>
                <ul class="v-submenu hidden" v-else="selected(index)">
                    <li class="v-submenu-item" v-for="(sMenu,sIndex) in fMenu.children">
                        <a href="javascript:;" class="v-menu-link" :class="{'v-menu-active':getCurrentMenu['subMenu'] == sIndex}" @click="toggleMenu(sMenu)">{{sMenu.name}}</a>
                    </li>
                </ul>
            </li>
        </ul>
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
            //切换当前被激活的菜单，设置激活菜单的index，[1]:表示一级菜单，[1,2]:表示一级菜单下的二级菜单
            toggleMenu(activeMenu){
                let index = menu.list.findIndex((item,index,arr)=>{
                    return item.type == activeMenu.type
                })
                if(index == this.getCurrentMenu['menu']){
                    return
                }
                if(activeMenu.children && Array.isArray(activeMenu.children)){
                    /*点击的activeMenu为一级菜单*/
                    //取到activeMenu的一级index
                    let index = menu.list.findIndex((item,index,arr)=>{
                         return item.type == activeMenu.type
                    })
                    this.$store.commit('setCurrentMenu',Array.of(index))
                }else{
                    //点击的activeMenu为二级菜单
                    for(let i in menu.list){
                        let item = menu.list[i]
                        let childIndex = item.children.findIndex((child,index,arr)=>{
                            return child.type == activeMenu.type
                        })

                        if(childIndex != -1){
                            this.$store.commit('setCurrentMenu',Array.of(i,childIndex))
                            break;
                        }
                    }
                }
                this.$router.push(activeMenu.path)
            },
            selected(index){
                return this.getCurrentMenu['menu'] == index
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

  .v-menu{
      font-size:16px;
      color:@color_999;
      .v-menu-item{
          &.v-menu-opened{
              .background
          }
      }
      .v-menu-item-title,.v-submenu-item{
          padding:14px 24px;
      }
      .v-menu-link{
          color:@color_999;
          margin-left:10px;
          &.v-menu-active{
              color:#fff;
              font-weight:bold;
          }
      }
      .v-submenu{
          .v-submenu-item{
              padding-left:60px;
          }
      }
      .v-arrow{
          float:right;
          margin-top:5px;
      }
  }

  .icon_style{
      display:inline-block;;
      width:30px;
      height:30px;
      vertical-align: middle;
  }
  .icon_console{
      .icon{
          .icon_style;
          background:url(../../assets/image/console.png);
          &.select{
              background:url(../../assets/image/console_select.png);
          }
      }
  }
  .icon_app{
      .icon{
          .icon_style;
          background:url(../../assets/image/app.png);
          &.select{
             background:url(../../assets/image/app_select.png);
          }
      }

  }
  .icon_developer{
      .icon{
          .icon_style;
          background:url(../../assets/image/developer.png);
          &.select{
             background:url(../../assets/image/developer_select.png);
          }
      }
  }
  .icon_resource{
      .icon{
          .icon_style;
          background:url(../../assets/image/resource.png);
          &.select{
             background:url(../../assets/image/resource_select.png);
          }
      }
  }
  .icon_statistics{
      .icon{
          .icon_style;
          background:url(../../assets/image/statistics.png);
          &.select{
             background:url(../../assets/image/statistics_select.png);
          }
      }
  }
  .icon_operate{
      .icon{
          .icon_style;
          background:url(../../assets/image/operate.png);
          &.select{
             background:url(../../assets/image/operate_select.png);
          }
      }
  }
  .icon_system{
      .icon{
          .icon_style;
          background:url(../../assets/image/system.png);
          &.select{
             background:url(../../assets/image/system_select.png);
          }
      }
  }



</style>
