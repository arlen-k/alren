<template>
<div>
 	<van-cell-group >
      <van-field
        v-model="params.userName" maxlength="11"
        label="手机号"
        placeholder="请输入"
        rows="1"
        autosize
      />
      <van-field
        v-model="params.password" maxlength="12"
        type="password"
        label="密码"
        placeholder="请输入"
        rows="1"
        autosize
      />
    </van-cell-group>
    <div  @click="login" class="text_center">
      <van-button round  class='btnBackground userBtn' :disabled = 'params.userName.length!=11' style="background: #5dd6e2;color:white;">登录</van-button>
    </div>
    <div class="forget text_center"><a @click="$router.push({path:'/forgetUser',query:{state:states}})">忘记密码</a></div>
</div>
</template>
<script>
export default{
	props:['params','states'],
	methods:{
		login(){
			this.$emit('login')
		}
	}
}
</script>
<style lang='less' scoped>
   .forget{
      width:100%;
      position: absolute;
      bottom: 40px;   
   }  
</style>