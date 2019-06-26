<template>
<div class="right">
	<van-row class='chart' >
		<van-col span="19">	
			<div class='text_right'><span v-if="info.sendDate!=undefined">{{info.sendDate.substring(0,19)}}</span></div>	 
			<div class='contentChat' v-if="info.contentType==1"> 
				<span v-if="medicalAdvice">{{medicalAdvice}}</span>
				<span v-else>{{info.messageInfo}}</span>
			</div>
			<img src="@/assets/img/3.png" class="msgImg" v-else-if="info.contentType==2" @click="playVoice(info.messageInfo)" >  
			<img  class="msgImg" v-lazy="info.messageInfo" v-else-if="info.contentType==3"  @click="lookImg(info.messageInfo)" />		
		</van-col>
		<van-col span="1" >&nbsp;</van-col>
		<van-col span="4" ><img :src="$utils.Storage.get('logoUrl')" class="imgLogo"></van-col>
	</van-row>
</div>
</template>
<script>
import Vue from 'vue'
import voicePlayUtil from './voicePlayUtil.js'
import mixin from './lrmixins'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
	preLoad:5,
  	error: '../../../assets/img/loading.gif',
    loading:require('../../../assets/img/loading.gif')
})
export default {	
	props:['info','medicalAdvice'],
	mixins:[mixin],
	// created(){
	// 	console.log(this.medicalAdvice)
	// }
}
</script>
<style lang='less' scoped>

.contentChat{
	word-wrap: break-word;
	user-select: none; 
	padding:.7rem;
	min-height:2rem;
	background:#3FD8DE;
	color: white;
	border-radius:.5rem;
	float:right;

}
.msgImg{
	width:50%;
	float: right;
}
.imgLogo{border-radius:50%; width: 3rem !important;height: 3rem !important;}
.info{
    width: min-content;
    text-align: right;
    float:right;
}
.msgDate{
	color: #b9b9b9;margin-top:25px;
 }
img[lazy=error],img[lazy=loading] { 
 	width:20px;
 	height:20px;
 }
 
</style>