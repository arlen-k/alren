<template>
	<div>
		<template v-for="url in imageList">
			<img :src="url"  @click = "look(url)" alt="">
		</template>
 		<van-image-preview v-model="show" :images="urls" :show-index = "showIndex"/>
	</div>
</template>
<script>
export default {
 data(){
  return{
    showIndex:false, 
  	urls:[],
    show:false,
    imageList:['../../static/pdfImg/3.png','../../static/pdfImg/4.png','../../static/pdfImg/5.png']
  }
 },
 methods:{
 	look(url){
 		this.show = true
 		this.urls = [url]
 	}
 }
}

</script>
<style>
.pdfImg{
  width:100%;
  height:15rem;
}
</style>