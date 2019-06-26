<template>
<div class="upDown">
  <template v-for="(list,i) in groupInfor">
	  <p class="title">{{list.chainName}}</p>
    <template  v-for="(item,j) in list.doctorFees">
    	<van-cell-group  class="up"> 
    	  <van-switch-cell v-model="item.checked" :value='j'  active-color="#50D7DF" title="图文问诊"v-if="item.inquiryType==1" inactive-color="#ccc" @change="changeSwitch(i,j,list.chainId,item.inquiryType)"/>
        <van-switch-cell v-model="item.checked" :value='j' active-color="#50D7DF" title="电话问诊" v-else-if="item.inquiryType==2" inactive-color="#ccc" @change="changeSwitch(i,j,list.chainId,item.inquiryType)"/>
        <van-switch-cell v-model="item.checked" :value='j' active-color="#50D7DF" title="视频问诊" v-else-if="item.inquiryType==3"inactive-color="#ccc" @change="changeSwitch(i,j,list.chainId,item.inquiryType)"/> 
    	</van-cell-group>
    </template>
  </template>	
</div>
</template>
<script>
export default{
 data() {
    return {
      groupInfor:[ { chainName:'我丢你想干么', doctorFees:[{   inquiryType:1,   checked:true,   operatingState:1, }] }], //集团信息   { chainName:'123', doctorFees:[{   inquiryType:1,   checked:true,   operatingState:1, }] }
    }
  },
  mounted(){
    // this.gitOrgen()
  },
  methods:{
    // 控制上下线
    changeSwitch(i,j,chainId,inquiryType){
      let operatingState = this.groupInfor[i].doctorFees[j].operatingState
      this.groupInfor[i].doctorFees[j].checked ? operatingState = 1 : operatingState = 0
      this.upDown(chainId,inquiryType,operatingState)
    },
    // 控制上下线
    upDown(chainId,inquiryType,operatingState){
     
      let params={
        chainId:chainId,
        doctorId:this.$utils.Storage.get('doctorId'),
        inquiryType:inquiryType,
        operatingState:operatingState,
      }
      this.$http.put("/api-doctor/doctor/operatingState",params).then(res=>{
        this.gitOrgen()
        this.$toast.success('修改成功！');
      })   
    },
    gitOrgen(){
      // 获取集团信息
      this.$http.get("/api-doctor/doctor/servers/info").then(res=>{
        this.groupInfor = res 
        this.groupInfor.forEach((list)=>{
          for(let item of list.doctorFees){   //增加change变量
           item.checked = item.operatingState === 1 ? true :false 
          }
        })

      })
     
    },
    
  }
}
</script>
<style lang='less' scoped>
.upDown{
  background:#F8F8F8;
  position:fixed;
  height:100%;
  width:100%;
  .up{
    margin-bottom: 15px;
  }
}
.title{
  background: white;
  line-height: 2.75rem;
  font-weight: bold;
  font-size: 1.2rem;
  color: #020202;
  padding-left: 1rem;
}

</style>