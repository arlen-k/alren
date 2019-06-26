<template>
<div>
	<div class='content' id="msg" > 
		<template v-for='(item,i) in $store.state.msgGroup' >
			<merge :infor = 'item' v-if="item.firstTag" :name = 'info.patientName' :listData = 'info'/> 
			<chatBoxLeft   :medicalAdvice='medicalAdvice'  :info = 'item'/>
		</template>
		<div class="text_center tip" >您已拒绝该次图文问诊，系统会进行退款!</div>		 
	</div>
</div>
</template>
<script>
import merge from './compontens/merge.vue'
import chatBoxLeft from './compontens/chatBoxLeft.vue'
export default{
	components:{ chatBoxLeft, merge },
	data(){
		return{
			info:this.$route.query,
			medicalAdvice:''
		}
	},
	mounted(){
		 
		this.getMsgList()
	},
	methods:{
		 
		// 获取历史记录
		getMsgList(){
			this.$store.state.msgGroup = []
			this.$http.get('/api-patient/patient/dialogue/historyMessageList?orderId='+this.info.id+'&pageNo=1&pageSize=10').then(res=>{
				res.messageDtoList[0].messageInfo = JSON.parse(res.messageDtoList[0].messageInfo) 
				res.messageDtoList[0].messageInfo.imgList = JSON.parse(res.messageDtoList[0].messageInfo.imgList) 
				this.medicalAdvice =res.medicalAdvice
  				this.$store.state.msgGroup = res.messageDtoList 
				 	
	        })
		},
	}
}

</script>