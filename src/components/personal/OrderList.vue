/**个人资料**/ 
<template> 
 	<van-row>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <template v-for="(item,i) in list" v-if="list.length!=0||list!=null">
           <div  class="orderBox" @click="$router.push({path:'/personal/detail',query:item})">
            <p class="orderNumber"> 订单号： {{item.id}}<span :class="item.state==2?'end':'star'" >{{stateList[item.state-1]}}</span></p>
            <div> 
              时间：<span v-if="item.payTime">{{item.payTime.substring(0,10)}}&nbsp;{{item.payTime.substring(11,19)}}</span>
              <span class="rt">金额：￥{{item.payAmount}}</span> 
            </div>
            <div> 
              类型：{{diagnosisTypeIdList[item.diagnosisTypeId-1]}}
              <span class="rt">患者：{{item.patientName}}</span> 
            </div>
          </div>
      </template>
      <div class="text_center tip" v-if="list.length==0">数据为空！</div>
    </van-pull-refresh>
</van-row >

</template>
<script>
import mixin from '@/common/loginMixins.js'
import {mapState,mapActions} from 'vuex'
export default {
  computed:{
    ...mapState(['changeMsg']),
  },
  mixins:[mixin],
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      pageNum:1,
      pageSize:10,
      list:[{id:12312321321,payTime:'2019-02-01',payAmount:123,patientName:'哥哥',diagnosisTypeId:2},{id:12312321321,payTime:'2019-02-01',payAmount:123,patientName:'哥哥',diagnosisTypeId:2},{id:12312321321,payTime:'2019-02-01',payAmount:123,patientName:'哥哥',diagnosisTypeId:2}],
      diagnosisTypeIdList:['图文问诊','视频问诊','电话问诊'],
      stateList:[ '待支付','已支付','已取消','待退款','已退款']
    };
  },
  watch:{
    changeMsg(){
      this.getDate()
    }
  },
  mounted(){
    // this.getDate()
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.pageSize = this.pageSize+10;
        this.getDate()
        this.$toast('刷新成功');
        this.isLoading = false;
        
      }, 500);
    },
    getDate(){
      this.$http.get("/api-doctor/doctor/order/pageList?pageNum="+this.pageNum+"&pageSize="+this.pageSize).then(res=>{
        this.list = res.resultSet
        this.loading = false;
        this.finished = true;
      })
    }
  }
}
</script>
<style lang='less' scoped>
.orderBox{
    width:85%;
    margin:1rem auto;
    position:relative;
    padding: 1rem;
    line-height: 1.5rem;
    background: white;
    box-shadow:0rem 0rem 1rem 0rem rgba(0, 0, 0, 0.1);
    border-radius:.4rem;
    .orderNumber{
      color: rgba(34,34,34,1);
    }
    .rt{
      position:absolute;
      right:1rem;  
    }
  }
  /*蓝色*/
  .end{
    position: absolute;
    right:.825rem;
    color: #50D7DF;
    padding: 0 .2rem 0 1rem;
    background:url(../../assets/img/iconBox.png) 100%;
    background-size: 100%;
  }
   /*黄色*/
 .star{
    position: absolute;
    right:.825rem;
    color: #F4A330;
    padding: 0 .2rem 0 1rem;
    background:url(../../assets/img/iconBox2.png) 100%;
    background-size: 100%;
  }
 
</style>
