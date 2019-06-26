<template>
<div>
	<br/>
	<van-col span="3" >
		<img src="@/assets/img/prative.png"   class='logo' v-if="listData.headImg==''||listData.headImg==null">
		<img :src="listData.headImg" class='logo' v-else>
	</van-col>
	<van-col span="1" >&nbsp;</van-col>
	<van-col span="20" v-if="infor.messageInfo" >
		<div v-if="infor.sendDate!=undefined">{{infor.sendDate.substring(0,19)}}</div>
	  	<div class='contentChat title' v-if=" infor!=''||infor!=null">
			{{name}} &nbsp;{{infor.messageInfo.gender=='1'?'男':'女'}}  &nbsp;  
			{{infor.messageInfo.age}} &nbsp; {{infor.messageInfo.medicalCard}}
			<p><h3>患病时长：</h3>{{symptomsTimeList[infor.messageInfo.symptomsTime-1]}}</p>
			<p><h3>过敏史：</h3>{{infor.messageInfo.remark}}</p>
			<br>
			<h3>咨询问题：</h3><br/>&nbsp;&nbsp;<p>{{infor.messageInfo.question}}</p>
	  	</div>
		<br/>
		<template v-for="url in infor.messageInfo.imgList">
			<img :src="$SERVERURL+url" @click="lookImg($SERVERURL+url)" class="imgs"/>
		</template>
	</van-col>
	<div class="text_center">{{infor.msgDate}}</div>
	<van-image-preview v-model="show" :images="images"/>	
</div>
</template>
<script>
export default {
	props:['infor','name','listData'],
	data(){
		return{
			show:false, //图片预览控制显示隐藏
			images:[], //图片预览
			symptomsTimeList:['一周内','半月内','一月内','一月以上'],
		}
	},
	methods:{
		lookImg(url){
			this.show = true
			this.images = [url]
		},
		 
	}
}
</script>
<style lang='less' scoped>
	.contentChat{
		user-select: none; 
		padding:.8rem;	 
		line-height:1.2rem;
		min-height: 9rem;
		max-width: 16rem;
		background:rgba(244,244,248,1);
		border-radius:.5rem;
		word-wrap: break-word;	
		h3{
			display: inline-block;
		}
		.title{
			color:#222222;
		}
		p{
			word-wrap: break-word;	
		}
	}
	.imgs{
		max-width: 16rem;margin-bottom: 25px; width: 50%;
	}
	.logo{
		border-radius:50%;
		height: 3rem;
    	width: 3rem;
	}
</style>