<!--控制台首页-->
<template>
    <div>
       <div v-for='item in data.words_result'>
			{{item.words}}
       </div>
    </div>
</template>
<script>
export default {
	methods:{
    get(){
        this.$http.post("http://127.0.0.1:8005/clinic_wechat/api/ocr/image2word2").then((res)=>{
        console.log(res)
      })
    }
	},
    data () {
      return {
      	data:{"log_id": 9050731161340294968, "words_result_num": 8, "words_result": [{"location": {"width": 1068, "top": 6, "left": 3, "height": 29}, "words": "这个代码比较老旧,请移步最新实现ink:htps:/blog.csdn. net/zh uNparticle/details/81018352,可在本文查看数据说明"}, {"location": {"width": 248, "top": 41, "left": 4, "height": 25}, "words": "和在末尾下载数据集,谢谢"}, {"location": {"width": 1062, "top": 93, "left": 4, "height": 29}, "words": "接触深度学习3个月以来,从当初的小白零基础学习,过程十分艰苦,看了几章大牛 Yoshua Bengio写的 deep learning"}, {"location": {"width": 1029, "top": 125, "left": 3, "height": 27}, "words": "书,粗略了解了基本常用的神经网络以及梯度更新策略,参数优化,也了解以及简单的使用常用的深度学习开发框架"}, {"location": {"width": 985, "top": 157, "left": 4, "height": 27}, "words": "caf, tensorflow, theano, sklearn机器学习库,目前 keras比较火,所以使用 keras来简单的进行图片识别分类"}, {"location": {"width": 105, "top": 208, "left": 3, "height": 26}, "words": "数据集准备"}, {"location": {"width": 670, "top": 261, "left": 4, "height": 27}, "words": "看cafe博客的时候看到的数据集,然后就下载使用,数据集可以在最后下载"}, {"location": {"width": 937, "top": 309, "left": 3, "height": 29}, "words": "数据集一共有5类图片,一共500张,每类图片100张,训练集400张,每类80张,测试集100张,每类20张"}]}
        }
    },
    created(){
     this.get();
    
    }
 }
</script>
