<template> 
	<div class="van-overlay" v-show="show" style="z-index:100;">
		<div class="box">
			<h2>{{title}}</h2>
			<p>{{contents}}</p>
			<div class="tipsBtn">
				<span @click='out(false)'>取消</span>
				<span @click="determine" class='req'>确认</span>
			</div>	
		</div>
	</div>
</template>
<script>
export default {
	props:['show','title','contents'],
	methods:{
		out(item){
			this.$emit('close')
	  	},
	  	determine(){
	  		this.$emit('determine')
	  	}
	}
}
</script>
<style lang='less' scoped>
.box{
	min-height: 9rem;
    margin: 50% auto;
    width: 80%;
    text-align: center;
    line-height: 2rem;
    background: white;
    position: relative;
    border-radius: 6px;
    padding-top: 1rem;
	.tipsBtn{
 		border-top: 1px solid #E5E5E5;
	    position: absolute;
	    width: 100%;
	    bottom: 0px;
	    line-height: 3rem;
 		span{
 			width:49%;
 			display: inline-block;
 		} 
 		.req{
 			color:#7ee1e7;border-left: 1px solid #E5E5E5;
 		}
 	}
}
	
	  
</style>