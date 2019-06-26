<!-- 接诊状态列表-->
<template>
	<div class='inrecption'>
		<van-tabs v-model="active" @click = "getDate">
			<template v-for="(item,i) in list" >
			  <van-tab :title="item.title">
 				<van-pull-refresh v-model="isLoading" @refresh="onRefresh(i)">
			    <template v-for='item in listData' v-if="listData.length!=0">
			 		<van-row  class='list pRe'>
					  	<van-col span="4" style="position:relative;">					  		
					  		<img src="@/assets/img/prative.png" v-if="item.headImg==''||item.headImg==null" class='logo' />
					  		<img  :src="item.headImg"  class='logo' v-else />
					  		<span class="redS" v-if="item.unReadMessages&&orderState=='doing'"></span>
					  	</van-col>
					  	<van-col span="20" style="padding: .2rem;">	
					  	<span  @click="getHandle(item)">
						  	<span >{{item.patientName}} &nbsp;{{item.sex==1?'男':'女'}} &nbsp;{{item.age}}
								<span class="msgDate"  v-if="item.msgDate&&orderState!='end'" >{{item.msgDate.substring(0,16)}}</span>
						  	</span>
							<p  v-if="item.question">{{item.question.substring(0,30)}}...</p>
							<span class='date' v-if="item.createDate&&orderState!='cancel'" >
								<span class="state"  v-if="item.diagnosisState==1">待回复</span>
								<span v-else-if="orderState=='end'">{{item.modifyDate.substring(0,16)}}</span>
								<span v-else-if="orderState=='doing'"><span v-if="setTimeoutDate(item.createDate.substring(0,16))!=0">
									<img src="@/assets/img/tiem.png" style="display: inline-block; width:.7rem;"/>
									{{setTimeoutDate(item.createDate.substring(0,16))}}</span>
								</span>
							</span>
						</span>
						</van-col>
					</van-row>
				</template> 
				<div class="text_center tip" v-if="listData.length==0">数据为空！</div>	
			   </van-pull-refresh>
			</van-tab>
		  </template>
		</van-tabs>
	</div>
</template>
<script>
import mixin from '@/common/loginMixins.js'
import {mapState,mapActions} from 'vuex'

export default {
  computed:{
  	...mapState(['changeMsg']),
  },
  mixins:[mixin],
  watch:{
  	changeMsg(){
  		this.getDate(this.index)
  	}
  },
  data() {
    return {
     	isLoading:false,
    	listData:[],
     	active: 0,
     	index:0,
     	list:[{
     		title:"进行中",
     		index:'doing'
     	},{
     		title:"已结束",
     		index:'end'
     	},{
     		title:"已取消",
     		index:'cancel'
     	}],
     	pageNo:1,
     	pageSize:10,
     	orderState:'doing',
    }
  },
  mounted(){ 
    
    this.doctorinfo()
  },
  methods: {
    doctorinfo(){
      	this.$http.get("/api-doctor/doctor/orderComment/doctorinfo").then(res=>{      		 
	      	if(res.status!=0){
	      		this.$utils.Storage.set('doctorId',res.id)
	      		this.$store.state.doctorInfo.fullName = res.fullName
	      		if(res.avatarAttrId!=''){
	      			this.$store.state.logoUrl = res.avatarAttrId
		          	this.$utils.Storage.setObject('loginInfo',res) 
		          	this.$utils.Storage.set('logoUrl',res.avatarAttrId) 
		          	 //头像存本地
		        }
		        this.$store.state.doctorInfo = res
		        this.getDate(this.index) 
	      	}else{
	      		this.relogin()
	      	}
      	})
    },	 
    // 重新自动登录 注意项目接口死循环问题 永久登录设计不合理
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
   	onRefresh(i) {
   		let _this = this;
		setTimeout(() => {
			_this.$toast('刷新成功');
			_this.isLoading = false;
			_this.pageSize = this.pageSize+10;
			_this.getDate(i)
		}, 500);
	},
	setTimeoutDate(date){
		var date2 = date.replace(/-/g, '/') 
		var date1 = new Date()
		var date2 = new Date(date2)
		var s1 = date1.getTime()
		var s2 = date2.getTime();
		var total = (s2 - s1)/1000;
		var day = parseInt(total / (24*60*60));//计算整数天数
		var afterDay = total - day*24*60*60;//取得算出天数后剩余的秒数
		var total = (s2 - s1)/1000; 
		var hour = parseInt(afterDay/(60*60));//计算整数小时数
		var afterHour = total - day*24*60*60 - hour*60*60;//取得算出小时数后剩余的秒数
		var min = parseInt(afterHour/60);//计算整数分
		return ( 23+ hour) +'小时'+(60 + min)+'分' 
	},
  	getDate(i){
  		this.index = i
  		switch(i){
	        case 0:
	         	this.orderState = 'doing' 
	         	break
	        case 1:
	            this.orderState = 'end' 
	            break
	        default:
	         	this.orderState = 'cancel' 
	    }
  		let params = {
  			orderState:this.orderState,
  			pageNo:this.pageNo,
  			pageSize:this.pageSize
  		}
  		this.listData = ''
        this.$http.get("/api-doctor/doctor/order/statePageList",params).then(res=>{
        	if(res.resultSet!==null&&res.resultSet.length>0){
	        	let toBeAnswered = [] //已读
	        	let replied = [] //未读
	        	res.resultSet.forEach((item)=>{
	        		if(item.diagnosisState==1){
	        			toBeAnswered.push(item) 
	        		} 
	        	})
	        	res.resultSet.forEach((item)=>{
	        		if(item.diagnosisState!=1){
	        			replied.push(item) 
	        		} 
	        	})

	        	this.listData =  toBeAnswered.concat(replied)  //数组重排

	        	this.loading = false;
	        	this.finished = true;

	        	}
        })
    },
  	getHandle(item){
  		//不同状态进入不同页面
  		if(this.orderState =='doing'){
  			if(item.diagnosisState==4){
  				this.$router.push({path:'/interrogation/chat',query:item})
  				return
  			}
  			this.$router.push({path:'/interrogation/InReceptionHandle',query:item}) 
  		}else if(this.orderState == 'end'){ //拒绝
  			this.$router.push({path:'/interrogation/chat',query:item})
  		}else{
			sessionStorage.showFooter = 1 // 取消
  			this.$router.push({path:'/interrogation/chat',query:item})
		}
  	}
  }
}
</script>
<style lang='less' scoped>
.inrecption{
	.list{
		border-bottom:1px solid #EEEEEE;
		margin: 1rem;
    	line-height: 21px;
    	min-height:5rem;
		.pRe{
			display: inline-block;
	    	width: 80%;
		}
		p{
			line-height:1.5rem;
			color: #A9A9A9;
			word-wrap: break-word;
		}
		.iconDate{
			vertical-align: sub;
			width: 1rem;
	   		height: 1rem;
	    	display: inline-block;	
		}
		.date{
			color:#A9A9A9;
			position: absolute;
			right:1rem;
			bottom: .2rem;
			line-height:1.5rem;
		}
		.van-tab--active{
			color:#3FD8DE;
		}
		.msgDate{
			position: absolute;
			right: 0px;	
		}
		.logo{
			width:3.5rem;
			height:3.5rem;
			border-radius: 50%;
		}
		.title{
			color:#222222;
			font-weight: bold;
		}
		.state{
			font-weight:400;
			color:#F4A330;
		}
	}
}
</style>
<style>
.van-tabs__line{
	background-color:#3FD8DE !important;
}
.van-tabs--line .van-tabs__wrap{
	position:fixed;top: 0px;
}
.redS{
	width:8px;
	height:8px;
	background:red;
	border-radius:50%;
	position:absolute;
	right: 2px;
	top: 2px;
}
</style>