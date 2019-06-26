/**忘记**/ 
<template>
   <div class="userContent">
      <van-cell-group >
         <van-field
           v-model="params.phoneNo" maxlength="11"
           label="手机号"
           placeholder="请输入"
           rows="1"
           autosize
         />
         <van-field
           v-model="veriCode" maxlength="4"
           label="验证码"
           placeholder="请输入"
           rows="1"
           autosize 
           >
           <a slot="button" size="small" type="primary" @click="primary" v-if="countIndex==60">发送验证码</a> 
           <sapn slot="button" size="small" type="primary" v-if='countIndex!=60' style="color:#323233;">{{countIndex}}s</sapn>   
         </van-field>      
      </van-cell-group>
      <div class="text_center"><van-button round  class='btnBackground userBtn' @click="update" :disabled = 'params.phoneNo.length!=11' style="background: #5dd6e2;color: white;">提交</van-button></div>
  </div>
</template>
<script>
export default {
   data(){
      return{
         params:{
            openId:this.$utils.Session.getObject('userInfo').openid,
            phoneNo:''
         },
         veriCode:'',
         countIndex:60
      }
   },
   methods:{
      // 最后验证
      update(){
         if(!this.$utils.isPoneAvailable(this.params.phoneNo)){
            if(this.params.phoneNo==''||this.veriCode==''){
              this.$toast.fail('手机号码和验证码不能为空!') 
              return 
            }
            let params={
              phoneNo:this.params.phoneNo,
              veriCode:this.veriCode
            }
            this.$http.post("/clinic_wechat/api/confirmVeriCode",params).then(res=>{
              this.$toast.success('验证成功！') 
              let phoneInfo={
                 veriCode:this.veriCode,
                 phoneNo:this.params.phoneNo
              }
              this.$store.state.phoneInfo = phoneInfo  
              this.$utils.Session.setObject('phoneInfo',phoneInfo)  //存储手机信息和验证码
              this.$router.push({path:'/reset',query:{state:this.$route.query.state}})
            })
         }else{
            this.$toast.fail('请输入11位正确手机号码！') 
         }
      },
      //获取验证码
      primary(){
        if(this.$utils.isPoneAvailable(this.params.phoneNo)){
          this.$toast.fail('请输入11位正确手机号码！') 
          return 
        }
        this.$http.get("/api-doctor/doctor/api/doctorinfo?phone="+this.params.phoneNo).then(res=>{
          if(res.status==0){
            this.$toast.fail('账号不存在或未开通服务！') 
            this.params.phoneNo = ''
          }else{
            this.getVerification()
          }
        })    
      },
      // 发送验证码接口
      getVerification(){
         let _this = this;
         _this.$http.post("/clinic_wechat/api/sendVeriCode",this.params).then(res=>{
           _this.$toast.success('发送成功！')
            // 倒计时计算
            let timer=setInterval(function(){
               if(_this.countIndex!=0){
                   _this.countIndex = _this.countIndex-1 
               }else{
                  _this.countIndex = 60
                  clearInterval(timer);
               }
            },1000)
         }) 
      }
   }
}
</script>

<style lang='less' scoped>
   .primary{
      position: absolute;
      right: .7rem;
      top: .5rem;
   }
</style>
