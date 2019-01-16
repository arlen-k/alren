<template>
  <div class="login">
      <div class="login_form">
          <div class="logo">
              <img class="login_logo" :src="config.SYSTEM.LOGIN_LOGO" style="width: 40px;"/>
              <h2 class="system_name">{{config.SYSTEM.SYSTEM_NAME}}</h2>
              <h4 class="child_system_name">{{config.SYSTEM.CHILD_SYSTEM_NAME}}</h4>
          </div>
          <div class="form">
              <input class="input_control" placeholder="账号" type="text"/>
              <input class="input_control" placeholder="密码" type="password"/>
              <Checkbox v-model="forget" class="forget">记住账号</Checkbox>
              <button class="button_btn" @click="login">登录</button>
          </div>
      </div>
      <div class="login_label">
          <p>{{config.SYSTEM.SYSTEM_COMPANY}}</P>
          <p>{{config.SYSTEM.SYSTEM_VERSION}}</P>
      </div>
  </div>
</template>
<script>
    export default {
        data () {
            return{
                config:window.config,
                forget:false
            }
        },
        created(){
        },
        methods:{
            login(){
                //登录
                this.$Loading.start()
                //请求数据
                this.$Message.success('登录成功');
                setTimeout(()=>{
                  this.$Loading.finish();
                  this.$router.replace('/console')
                },1500);
            },
            validate(){
                //登录验证
            }
        }
    }
</script>
<style lang="less">
    @import '../assets/less/common.less';
    
    .login{
        background:url(../assets/image/loginbac.jpg) center no-repeat; 
        position:fixed;
        width:100%;
        height:100vh;
        text-align:center;
        color:#fff;
        background-size: 100%;
        .login_form{
            background:@container_background_color;
            width:400px;
            height:520px;
            margin-top:120px;
            margin-left:auto;
            margin-right:auto;
            .logo{
                background:@theme_background_color;
                height:180px;
                text-align:center;
                border-top:5px solid #0856ac;
                .login_logo{
                    margin:10px;
                }
                .system_name{
                    .font_size_22;
                    font-weight:600;
                }
                .child_system_name{
                     .font_size_14;
                }
            }
            .form{
                padding:30px;
                text-align:left;
                border-bottom:2px solid #ccc;
                height:340px;
                .input_control{
                    display:block;
                    width:100%;
                    border:2px solid #d9d9d9;
                    height:50px;
                    padding:10px;
                    margin:10px 0 20px 0;
                }
                .forget{
                    color:#666;
                    .font_size_14
                }
                .button_btn{
                    width:100%;
                    display:block;
                    height:50px;
                    color:#fff;
                    background:@theme_background_color;
                    font-size:14px;
                    margin-top:50px;
                    box-shadow:0 1px 3px rgba(0,0,0,0.2);
                    cursor:pointer;
                }
            }
        }
        .login_label{
             .font_size_14;
             margin-top:20px;
             line-height:20px;
        }
        .ivu-checkbox-checked{
             .ivu-checkbox-inner {
                border-color: @theme_background_color;
                background-color: @theme_background_color;
             }

        }
    }
</style>
