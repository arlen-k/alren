,/**重置密码**/ 
<template>
   <div class="userContent">
       <van-cell-group >
         <van-field
           v-model="params.oldPassword" maxlength="12"
           label="输入旧密码"
           placeholder="请输入旧密码"
           rows="1"
           autosize
           v-if="this.$route.query.state==0"
         />
         <van-field
           v-model="newPassword" maxlength="12"
           label="输入新密码"
           type="password"
           placeholder="请输入(6-12位密码)"
           rows="1"
           autosize 
         />
         <van-field
           v-model="params.newPassword" maxlength="12"
           type="password"
           label="确认新密码"
           placeholder="请输入(6-12位密码)"
           rows="1"
           autosize 
         />
      </van-cell-group>
      <div class="text_center"><van-button round  class='btnBackground userBtn' @click="success"  style="background: #5dd6e2;color: white;">确认</van-button></div>
  </div>
</template>
<script>
export default {
   data(){
      return{
         params:{
            oldPassword: '',
            openId: this.$utils.Session.getObject('userInfo').openid,
            appId: this.$utils.Session.get('appId'),
            newPassword: '',
            phoneNo: this.$utils.Session.getObject('phoneInfo').phoneNo || this.$utils.Storage.get('phone'),
            code: this.$utils.Session.getObject('phoneInfo').veriCode
         },
         newPassword: ''
      }
   },
   methods:{
      success(){
         if(this.newPassword==''||this.params.newPassword==''){
            this.$toast.fail('重置密码不能为空!');
            return 
         }
         if(this.newPassword.length<6){
            this.$toast.fail('请输入6-12位数新密码!');
            return
         }
         if(this.newPassword!==this.params.newPassword){
            this.$toast.fail('请输入相同新密码!');
            return 
         }
         this.$http.post("/clinic_wechat/api/initUserPwd",this.params).then(res=>{
            this.$toast.success('密码设置成功!');
            if(this.$route.query.state==2){
               this.$router.push('/mpInterrogation')  //state == 2 跳回  
            }else{
              this.$router.push('/mp')  //state == 2 跳回  
            }
           
         })
      }
   }
}
</script>

<style lang='less' scoped>
   .btnBackground{background:#3FD8DE;}
</style>
