<template>
<div class="right">
	<van-row class='chart'>
		<merge :infor = 'info' v-if="info.type=='initialMessage'"></merge>
		<template v-else>
			<van-col span="4" >
				<img src="@/assets/img/prative.png"   class='imgLogo' v-if="logoUrl==null||logoUrl==''">
				<img :src="logoUrl" class='imgLogo' v-else>
			</van-col>
			<van-col span="1" >&nbsp;</van-col>
			<van-col span="19">		 
				<div class='text_left' v-if="info.sendDate!=undefined">{{info.sendDate.substring(0,19)}}</div>
				<div class='text_left' v-else>{{$utils.getDate()}}</div>
			  	<div class='contentChat' v-if="info.contentType==1">{{info.messageInfo}}</div>
			  	 
				<img src="@/assets/img/3.png" class="msgImg" v-else-if="info.contentType==2" @click="playVoice(info.messageInfo)">  
				<img v-lazy="info.messageInfo" class="msgImg" v-else-if="info.contentType==3" @click="lookImg(info.messageInfo)" >
			</van-col>
		</template>
	</van-row>
</div>
</template>
<script>
import Vue from 'vue'
import merge from './merge.vue'
import mixin from './lrmixins'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
	preLoad: 1,
  	error: '../../../assets/img/loding.gif',
    loading:require('../../../assets/img/loding.gif')
})
export default {
	components:{ merge },
	props:['info','logoUrl'],
	mixins:[mixin],	
	created(){
		// console.log(this.info)
	}
}
</script>
<style lang='less' scoped>
.contentChat{word-wrap: break-word;margin-top: 9px;padding:.7rem;background:rgba(244,244,248,1);border-radius:.5rem;float:left;}	
.imgLogo{border-radius:50%; width: 3rem !important;height: 3rem !important}
.msgDate{color: #b9b9b9;margin-top:25px; }
.msgImg{width:10rem}
img[lazy=error],img[lazy=loading] { width:20px;height:20px;}
</style>