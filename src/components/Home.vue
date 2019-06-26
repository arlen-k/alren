/**home**/ 
<template>
    <div>
    	<template >
			<img src="@/assets/img/welcome2.png" style="width: 100%;">
			<div class="text_center homeContent">
				<p class='tips'>您还没有登录哟！请先登录</p>
				<span @click="$router.push('/mp')"><van-button round class='btnBackground userBtn' style="color:white;">确认</van-button></span>
			</div>
		</template>
    </div>
</template>
<script>
import wxLogin from '@/common/wxLogin.js'
export default {
	mixins: [ wxLogin ],
	data(){
		return {
			appOpenId:localStorage.appOpenId 
		}
	},
	created(){
		// if(this.appOpenId!=undefined){
		// 	let params ={
		// 		openId:this.$utils.Storage.getObject('userInfo').openid
		// 	}
		// 	this.$http.post("/clinic_wechat/api/checkDoctorIsLogin",params).then(res=>{
		//         if(res.status==1){
		//         	this.$router.push('/personal/personalHome')
		//         }else{
		//         	this.$router.push('/login')
		//         }
		//     }) 
		    
		// }
	} 	 
}
</script>

<style lang='less' scoped>
 	.homeContent{
 		width: 90%;
	    margin: -4rem auto;
	    background: white;
	    height: 10rem;
	    position: relative;
	    border-radius: .4rem;
	    .tips{
	    	font-size: 1.2rem;
    		line-height: 4.9rem;
	    }
	    .btnBackground{
	 		background: #3FD8DE;
	 	}
 	}
 	
</style>
