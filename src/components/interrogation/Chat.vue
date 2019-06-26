 <!-- effective 会话是否有效 0 有效 1 无效 
	diagnosisState 会诊状态问诊状态(
	1:等待医生回复 2:医生拒绝接诊 3:24小时未回复 4:问诊中 5:患者结束问诊 6医生结束问诊 7:会诊未开始 8:自动结束 9:已取消和无效 
	)	
-->
<template>
<div class="chatHome">
	<!-- v-if="(userInfor.diagnosisState==4||userInfor.diagnosisState==9||userInfor.diagnosisState==8||userInfor.effective==0||userInfor.diagnosisState ==6||userInfor.diagnosisState==2)&&$utils.Session.get('showFooter') != 1" -->
	<!-- v-if="(userInfor.diagnosisState==4||userInfor.diagnosisState==1)&&$utils.Session.get('showFooter') != 2&&$store.state.chatHead"   -->
		<header class='headInfo'> 
		{{userInfor.patientName}}  &nbsp;&nbsp; {{userInfor.sex==1?'男':'女'}} &nbsp;&nbsp; {{userInfor.age}}
		<span class="fin rig" @click="popup=true" >
			<img src="@/assets/img/cler.png" class='clear dis' />结束接诊
		</span>
	</header>
	<!-- padding-bottom: 14rem; -->
	<div class='content' id="msg" :style="{'paddingBottom': bottom +'rem'}">
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh" pulling-text="读取成功" loading-text="读取中" loosing-text ='读取中'>
			<template v-for='(item,i) in msgGroup' v-if="msgGroup.lenght!=0">
				<merge :infor = 'item' v-if="item.firstTag&&i==0" :name = 'userInfor.patientName' :listData = 'userInfor' class="margin-bottom" /> 	    
				<chatBoxLeft  :info = 'item' v-else-if="item.sender==username" @playVoice = 'playVoice'  @lookImg = 'lookImg' class="margin-bottom"/> 
				<chatBoxRight :info = 'item' :logoUrl='userInfor.headImg' class="margin-bottom"   @lookImg = 'lookImg' v-else /> 
				<div class="text_center tip" v-if="item.firstTag&&i==0&&(userInfor.diagnosisState==4||userInfor.diagnosisState==1)">订单24小时后自动结束!</div>
			</template>
			<chatBoxLeft  v-if="$utils.Session.get('showFooter') == 1&&userInfor.medicalAdvice!=null" 
			:info = 'medicalAdviceData' :medicalAdvice = 'userInfor.medicalAdvice'  class="margin-bottom"/>
			<!-- 取消 -->
			<div class="text_center tip" v-if="userInfor.diagnosisState == 6||userInfor.diagnosisState == 5||$store.state.chatHead==false">订单已结束!</div>   
			<div class="text_center tip" v-if="userInfor.diagnosisState==8">订单自动结束!</div>  
			<div class="text_center tip" v-if="userInfor.diagnosisState==3||userInfor.diagnosisState==9">订单已取消或无效!</div>   
			<!-- 拒绝了 -->
			<div class="text_center tip" v-else-if="userInfor.diagnosisState==2">您已拒绝该次图文问诊，系统会进行退款!</div> 
			<!-- 待回复 chatHead-->
			<div class="text_center tip"  v-else-if="userInfor.diagnosisState==1&&$store.state.chatHead">提示：请在24小时内回复，否则自动视为无效订单!</div>
		</van-pull-refresh>
	</div>
 <!-- v-if="userInfor.effective == 0 &&
			$utils.Session.get('showFooter') != 1 &&
			$utils.Session.get('showFooter') != 2 " -->
	<chatFooter
			:dialogueId = "userInfor.id"
			@changeBottom = 'changeBottom'
			:accepter = "userInfor.dialogueRealUserId"
		/>
	<Tips :show = 'popup' :title = "title" :contents = "contents" @close = "close" @determine = "endChat"/>
	<van-image-preview v-model="show" :images="images" :show-index = "showIndex"/>
</div>
</template>
<script>
import merge from './compontens/merge.vue'
import Tips from '../viewComponent/Tips'
import mixin from '@/common/loginMixins.js'
import chatFooter from './compontens/chatFooter.vue'	
import chatBoxLeft from './compontens/chatBoxLeft.vue'
import chatBoxRight from './compontens/chatBoxRight.vue'
import wx from 'weixin-js-sdk'
import { mapState, mapMutations, mapActions } from 'vuex'	
export default{
	components:{chatBoxLeft,chatBoxRight,chatFooter,Tips,merge},
	mixins:[mixin],
	data(){
		return{
			showIndex:false,
			show:false, //图片预览控制显示隐藏
			images:[], //图片预览
			popup:false,
			title:'确认要提前结束问诊吗？',
			contents:'结束后患者将不能再发送问题!',
			isLoading: false, 	 
			advice:'拒绝问诊',
			userInfor:this.$route.query,
			username: this.$utils.Storage.get('doctorId'),
			bottom:2,
			chatShow:localStorage.chatShow==undefined?false:true,
		}
	}, 
	computed: {
       ...mapState(['msgGroup','logoUrl','changeDialogueId']),
       medicalAdviceData(){
       	return {
       		contentType:1,
			sendDate:this.userInfor.modifyDate
       	}
       }
    },
    mounted(){ 
    	if(this.userInfor.patientId == undefined||this.userInfor.patientId ==''){
    		this.doctorinfo()
    	}
    	this.$store.state.chatHead = true //初始化聊天状态heade结束按钮
    	this.$store.state.dialogueId = this.userInfor.id  //赋值控制聊天会话房间
    	this.$store.state.msgGroup = []
    	this.getOne()   	
    },
    watch:{
    	msgGroup(item){ 
    		this.sign({id:this.userInfor.id})   		 
			let ri = document.querySelectorAll('.right')
			if(ri.length>0){
				window.scrollTo(0,ri[ri.length-1].offsetTop)
			}
    	},
    },
    destroyed(){
    	
    	this.$utils.Session.remove('showFooter')
    },
	methods:{
		...mapActions(['sendTipMessage','sign']),
		changeBottom(height){ //控制页面高度
			this.bottom = height
		},
		doctorinfo(){
	      	this.$http.get("/api-doctor/doctor/orderComment/doctorinfo").then(res=>{
		      	if(res){
		      		this.getIdInfo()
		      		this.$utils.Storage.set('doctorId',res.id)
		      		if(res.avatarAttrId!=''){
		      			this.$store.state.logoUrl = res.avatarAttrId
			          	this.$utils.Storage.setObject('loginInfo',res) 
			          	this.$utils.Storage.set('logoUrl',res.avatarAttrId) 
			          	 //头像存本地
			        }
			        this.$store.state.doctorInfo = res 		
			  		//if(localStorage.chatShow == undefined ){  //第一次进入刷新 解决 刷新问题
					// 	localStorage.chatShow = 1
					// 	location.reload() 
					// }	         
		      	}
	      	})
	    },	
		// 会话id查详情
		getIdInfo(){
			this.$http.get("/api-manager/manager/orderDetail?orderId="+this.userInfor.id).then(res=>{
				this.userInfor = res
				this.userInfor.headImg = res.patientImg
				 
	        })
		},
		lookImg(url){
			this.show = true
			this.images = [url]
		},
		close(){
			this.popup = false
		},
		getOne(){
			this.$store.state.msgGroup = []
			this.$http.get("/api-patient/patient/dialogue/section/historyMessageList?dialogueId="+this.userInfor.id).then(res=>{
				if(res.resultSet != null){				 
					for(let i in res.resultSet){
						if (res.resultSet[i].firstTag) {  //true  对象  false 字符串
					  	 	res.resultSet[i].messageInfo= JSON.parse(res.resultSet[i].messageInfo) 
					  	 	res.resultSet[i].messageInfo.imgList = JSON.parse(res.resultSet[i].messageInfo.imgList)
						}
					}
					this.$store.state.msgGroup = res.resultSet.reverse()	
				}
	        })
		},
		// 获取历史记录
		getMsgList(){	    
			if(this.$store.state.msgGroup.length!=0&&this.$store.state.msgGroup[0].firstTag){
				this.$toast.success('已是最新！')
				return
			}
			var url = "/api-patient/patient/dialogue/section/historyMessageList?dialogueId=" + this.userInfor.id +
						'&sendDate=' + this.$store.state.msgGroup[0].sendDate +'&messageId=' + this.$store.state.msgGroup[0].messageId
			this.$http.get(url).then(res=>{
				if(res.resultSet != null){	 
					for(let i in res.resultSet){
						if (res.resultSet[i].firstTag) {  //true  对象  false 字符串
					  	 	res.resultSet[i].messageInfo= JSON.parse(res.resultSet[i].messageInfo) 
					  	 	res.resultSet[i].messageInfo.imgList = JSON.parse(res.resultSet[i].messageInfo.imgList)
						}
					}
					let list = res.resultSet.reverse()
					this.$store.state.msgGroup =list.concat(this.$store.state.msgGroup) 
				}
	        })
		},
		// 确认结束订单
		endChat(){
			let params={
		        senderType: 2,
		        dialogueId: this.userInfor.id 
		    }
			this.$http.post('/api-patient/patient/dialogue/endChat',params).then(res=>{
		        this.$toast.success('结束成功！')
		        this.sendTipMessage({
	              accepter: this.userInfor.patientId, 
	              ext: {type: 'endOrder', 'advice': '医生已结束会诊！', dialogueId: this.userInfor.id}
	            })
	            this.userInfor.diagnosisState = 6
	            this.popup = false
	        })
		},
		onRefresh() {
			let _this = this
			setTimeout(() => {
				_this.getMsgList()
				_this.$toast('刷新成功')
				_this.isLoading = false
			}, 500)
	    },
		playVoice(localId){
			wx.ready(function(){
		       	wx.playVoice({
		           localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
		        });	
		    });
		},
	}
}

</script>
<style lang='less' scoped>
.chatHome{	 
    padding-bottom: 8rem;
	.headInfo{
		z-index:99; 
		line-height:2.5rem;
		padding-left:1rem;
		background:#F5FBFD;
		position:fixed;
		width:100%;
		top:0px;
		.fin{
			padding-right:1rem;
			color:#37DDE3;
			.clear{
				width:1rem;
				margin-right: .2rem;
				vertical-align: sub;
			}
		}
	}
	.content{
		padding:1rem;
		min-height: 5rem;
		background: white;
		margin-top:1rem;
		.chart{
			margin-top:1.6rem; 
		}
	}	
	.tips{
		user-select: none; 
	}
	.footerImg{
		width: 100%;
	    position: fixed;
	    bottom: 0px;
	}
	.margin-bottom{
		margin-bottom: 30px;
		margin-top: 10px;
	}
}

</style>