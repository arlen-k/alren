/**个人资料**/ 
<template> 
  <div class="personalData">
    <div class="head">
      <span>订单号：{{info.id}}</span>
    </div>
    <div class="br" style='margin-top:0rem;background:#f8f8f8;'></div>
    <div class="conten">
      <div class='pRe'>订单类型 <span class='pAb'>{{diagnosisTypeIdList[info.diagnosisTypeId-1]}}</span></div>
      <div class='pRe'>机构<span class='pAb'>{{info.chainName}}</span></div>
      <div class='pRe'>科室<span class='pAb'>{{info.deptName}}</span></div>
      <div class='pRe'>医生<span class='pAb'>{{info.doctorName}}</span></div>
      <div class='pRe'>患者<span class='pAb'>{{info.patientName}}</span></div>
      <div class='pRe'>出生年月<span class='pAb' v-if="info.patientBirthday">{{info.patientBirthday.substring(0,10)}}</span></div>
      <div class='pRe'>就诊卡号<span class='pAb'>{{info.simpleCode}}</span></div>
      <div class='pRe'>订单价格<span class='pAb'>{{info.payAmount}}元</span></div>
      <div class='pRe'>支付方式
        <span class='pAb' v-if="info.payType==1">微信支付</span>
        <span class='pAb' v-else-if="info.payType==2">余额支付</span>
      </div>
      <div class='pRe'>支付时间<span class='pAb' v-if="info.payTime">{{info.payTime.substring(0,10)}}&nbsp;{{info.payTime.substring(11,19)}}</span></div>
      <div class='pRe'>订单状态<span class='pAb' style="color:#F4A330;">{{stateList[info.state-1]}}</span></div>
      <div class='pRe'>问诊状态<span class='pAb'>{{diagnosisStateList[info.diagnosisState-1]}}</span></div>
    </div>
    <div class='lookInterrogation text_center' @click="lookInterrogation">查看问诊记录</div>
  </div> 
</template>
<script>
export default {
  data() {
    return {
      diagnosisStateList:['等待医生回复','医生拒绝接诊','24小时未回复','问诊中','患者结束问诊','结束接诊','会诊未开始','自动结束','已取消'],
      stateList:[ '待支付','已支付','已取消','待退款','已退款'],
      diagnosisTypeIdList:['图文问诊','视频问诊','电话问诊'], 
      info:this.$route.query
    }
  },
  mounted() {
    this.$route.query.display = false
  },
  methods: {
    lookInterrogation(){
       sessionStorage.showFooter = 2 
      this.$router.push({path:'/interrogation/chat',query:this.$route.query})
    }
  }
}
</script>
<style lang='less' scoped>
.personalData{
  position: absolute;
  height:100%;
  width:100%;
  background:#F8F8F8;
}
  .head{
    padding: 1rem;
    line-height:2rem;
    color: #222222;
    font-size:1.1rem;
    background:white;
    font-weight:bold;
  }
  .conten{
    background:white;
   
    .pRe{
      line-height:2rem;
      color:#222222;
    }
     .pAb{
      right:0rem;
       color:#666666;
    }
    .Iden{
      width: .4rem;
      height: .4rem;
      background: #ccc;
      display: inline-block;
      border-radius: 50%;
      margin-right: .3rem;
      margin-bottom: .1rem;
    }
  }
  .lookInterrogation{
    line-height: 2.3rem;
    width: 30%;
    color: white;
    margin: 1rem auto;
    border: 1px solid #3FD8DE;
    color: #3FD8DE;
    font-size: 1rem;
    border-radius: 5px;
  }
</style>
