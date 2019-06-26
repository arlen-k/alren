/**个人详情**/ 
<template>
  <div class="personalHome">
  	<div class="head">
  		<div class="user">
			<!-- <img :src="logoUrl"  class="fl" v-if="logoUrl!=null||logoUrl!=''"/> -->
			<img src="@/assets/img/man.png" class="fl" />
			<span class="name fl">作者帅哥{{$store.state.doctorInfo.fullName}}</span>
		 	<span class='switch' @click="$router.push('/personal/upDown')">控制上下线 ></span>
	 	</div>
  	</div>
  	<div class="orderContent text_center">
		<span class="order dis" @click="$router.push('/personal/orderList')">
			<img src="@/assets/img/order.png" alt="">	
			<p>问诊订单</p>
		</span>
		<span class="order dis" @click="$router.push('/personal/statistics')">
			<img src="@/assets/img/wages.png" alt="">	
			<p>工资条</p>
		</span>
 	</div>
	<van-row class="text_center manual">
		<p class="title">账户相关</p>
	  	<van-col span="8">
	  		<span class="dis" @click="$router.push('/personal/personalData')">
				<img src="@/assets/img/personal.png" alt="">	
				<p>个人资料</p>
			</span>
		</van-col>
	  	<van-col span="8">
	  		<span class="dis"  @click="$router.push({path:'/reset',query:{state:0}})">
				<img src="@/assets/img/password.png" style="width: 2rem;">	
				<p>重置密码</p>
			</span>
		</van-col>
		<van-col span="8">
	  		<span class="dis"  @click="popup=true">
				<img src="@/assets/img/out.png" alt="">	
				<p>退出登录</p>
			</span>
		</van-col>
	</van-row>
	<div class='br'></div>
	<van-row class="text_center manual">
		<p class="title">更多功能</p>
	    <van-col span="8">
	    	<span class="dis"  @click="$router.push('/personal/pdfView')">
				<img src="@/assets/img/manual.png" style="width: 2rem;">	
				<p>使用手册</p>
			</span>
		</van-col>
  		<van-col span="8">
  		<!--  -->
		  	<span class="dis"  @click="share">  
				<img src="@/assets/img/share.png" >	
				<p>分享名片</p>
			</span>
		</van-col>
	</van-row>
	<Tips :show = 'popup' :title = "title" :contents = "contents" @close = "close" @determine = "out"/>
	<div class="share" v-show="show" @click="show=false"><img src="@/assets/img/tishi.png" ></div>
	 
  </div>
</template>
<script>
import Tips from '../viewComponent/Tips'
import {mapState,mapActions} from 'vuex'
import wxLogin from '@/common/wxLogin.js'
 
export default {
	// mixins: [wxLogin],
	components:{ Tips },
	computed: {
  		...mapState(['logoUrl' ]),
  	},
	data(){
		return{
			homeShow:sessionStorage.homeShow==undefined?false:true,
			show: false,
			info: '',
			popup: false,
			title: '退出提示',
			contents: '确认退出当前账户？',
			actions: [{
	          name: '分享到朋友圈',
	          index:1
	        },{
	          name: '发送给朋友',
	          index:2
	        }]
		}
	},
	mounted(){
		// this.$store.state.doctorInfo.fullName = ''
		// this.doctorinfo()	
	},
	methods:{
		// 获取详情
	    doctorinfo(){
	      this.$http.get("/api-doctor/doctor/orderComment/doctorinfo").then(res=>{
	      	if(res.status!=0){
	      		this.$utils.Storage.set('doctorId',res.id)
	      		if(res.avatarAttrId!=''){
	      			this.$store.state.logoUrl = res.avatarAttrId
		          	this.$utils.Storage.setObject('loginInfo',res)  
		          	this.$utils.Storage.set('logoUrl',res.avatarAttrId)
		        }
		         
		        this.$store.state.doctorInfo = res   
	      	}else{
	      		this.relogin()
	      	}
	      })
	    },	
	    // 重新自动登录
	    relogin(){
	    	let params={
	    		appOpenId:this.$utils.Storage.get('appOpenId'), 
	    		registerSource:3
	    	}
	    	this.$http.post("/clinic_wechat/login",params).then(res=>{
		      	if(res.status==1){
		      	 	this.doctorinfo()
		      	}   
	      	})
	    }, 
		share(){
			this.show=true
			this.onSelect()
		},
	  	close(){
	  		this.popup = false
	  	},
	  	// 退出登录
	  	out(){
	  		let par={
	  		 	openId:this.$utils.Storage.getObject('userInfo').openid,
	  		 	userId:this.$utils.Storage.get('doctorId')
	  		}
	  		this.$http.post("/clinic_wechat/api/doctorLogout",par).then(res=>{	  	
	  			this.$toast.success('退出成功');		 
	      	    this.$router.push('/mp')
	      	    localStorage.clear()
	      	    sessionStorage.clear()
	      	})
	  	},

	}
}
</script>
<style lang='less' scoped>
	@left:1rem;
	@wid:4.5rem;
 	.personalHome{	
 		.head{
 			background:url(../../assets/img/personalHome.png) no-repeat;
 			background-size: 100%;
 			height:13rem;
 			.user{
				top: 2rem;
				width: 100%;
 				position: absolute;
 				color:white;
 				img{
 					margin-left:@left;
	 				width: @wid;
	    			height: @wid;
	 				border-radius:50%;
	 			}
 				.name{
 					font-family: MicrosoftYaHei;
    				font-weight: bold;
 					margin-left: .2rem;
	 				line-height: @wid;
	 				font-size:1.5rem;
	 			}
    		.switch{
    			font-family:MicrosoftYaHei;
				font-weight:bold;
    		  	line-height: @wid; 
			    position: absolute;
			    right: 1rem;
			    font-size: 1.25rem;
			    
	 			}
 			}
 		}
 		.text_center{
 			background: white; 
 		}
 		.orderContent{ 			
 		 
 			.order{
 				height: 10rem;
 				margin:.4rem;
 				background: white;
 				border-radius:0.5rem;
				width: 44%;
				padding-top: .5rem;
				margin-top: -5rem;
				box-shadow:0px 5px 6px 0px rgba(223,223,223,0.22);
				img{
					margin: .7rem auto;
 					width:3.5rem;
 					height:4.5rem;
 				}
 				p{
 					color:#222222;
 					font-size:1.1rem;
 					font-weight:400;
 				}	
 			}
 		}
 		.manual{
 			img{
    		width: 2.5rem;
    		height: 2.5rem;
    		margin:  auto;
 			}	
 			p{
 				font-size: 1rem;
    			color: #2D2D2D;
 			}
 		}
 		.title{
 			text-align:left;
 			font-size:@left;
 			margin-left:@left;
 			font-weight: bold;
 			line-height: 3.7rem;
 		}	
 		.share{
		    position: fixed;
		    height: 100%;
		    width: 100%;
		    background: rgba(14, 14, 14, 0.63);
		    top: 0px;
		    img{
		    	width: 50%;
			    right: 0px;
			    position: absolute;
		    }
 		}
 	}
</style>