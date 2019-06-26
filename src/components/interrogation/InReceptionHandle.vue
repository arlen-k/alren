<!-- 接诊状态列表-->
<template>
  <div class='inrecption' v-show="styleShow">
    <merge :infor = 'listOne' :name = 'info.patientName' :listData = 'info'></merge>
    <p class='tips text_center'>请在24小时内回复，否则自动视为无效订单</p>
    <van-row  class='footerBtn text_center'>
        <van-col span="4"><div @click="show=true">拒绝</div></van-col>
        <van-col span="20" class='meet' >
          <div @click="meetChat">接诊</div>
      </van-col>
    </van-row>
    <van-actionsheet v-model="show" :actions="actions" @select="onSelect" cancel-text="取消" />
  </div>
</template>
<script>
import mixin from '@/common/loginMixins.js'
import merge from './compontens/merge.vue'
import {mapActions,mapState} from 'vuex'
import chatBoxRight from './compontens/chatBoxRight.vue'
export default {
  components:{ merge },
  mixins:[mixin],
  data() {
    return {
      styleShow:false,
      show: false,
        actions: [{
          name: '问题与医生擅长不匹配',
        },{
          name: '建议到医院就诊'
        },{
          name: '其他原因'
        }],
        info:this.$route.query,
        listOne:''
    }
  },
  computed: {
    ...mapState(['logoUrl']),
  },
  mounted(){   
    this.getIdInfo()   
  },
  methods: {
    ...mapActions(['sendTipMessage','sign']), 
    // 会话id查详情
    getIdInfo(){
      this.$http.get("/api-manager/manager/orderDetail?orderId="+this.info.id).then(res=>{
        if(res.status!=0){
          this.info = res
          this.$store.state.dialogueId = this.info.id
          // 公众号点击进来直接跳转聊天
          if(this.info.diagnosisState!=1){
            this.$router.push({path:'/interrogation/chat',query:this.info})
          }
          this.sign({id:res.id})
          this.getList()  
        }
      })
    }, 
    // 获取第一条
    getList(){
      this.$http.get("/api-patient/patient/dialogue/section/historyMessageList?dialogueId="+this.info.id).then(res=>{
        if(res.resultSet!=null){
          res.resultSet[0].messageInfo =JSON.parse(res.resultSet[0].messageInfo)
          if(res.resultSet[0].messageInfo.imgList!=''){
            res.resultSet[0].messageInfo.imgList = JSON.parse(res.resultSet[0].messageInfo.imgList)
          }
          this.styleShow = true
          this.listOne =res.resultSet[0]
        }
      })
    },
    // 拒绝接诊
    onSelect(item){
      this.show = false
      let params={
        advice:item.name,
        orderId:this.info.id 
      }
      this.$http.post("/api-doctor/doctor/order/refuse",params).then(res=>{
        this.$toast.success('已拒绝，系统自动退款');
        this.sendTipMessage({
           accepter: this.info.dialogueRealUserId,
           ext: {type: 'refuse', 'advice': item.name, dialogueId: this.info.id}
        })
        this.$router.push({path:'/interrogation/rejectionrDetail',query:this.info})
      })   
    },
    doctorinfo(){
        this.$http.get("/api-doctor/doctor/orderComment/doctorinfo").then(res=>{
          if(res){
            this.getIdInfo()
            this.$utils.Storage.set('doctorId',res.id)
            if(res.avatarAttrId!=''){
              this.$store.state.logoUrl = res.avatarAttrId
                this.$utils.Storage.setObject('loginInfo',res) 
                this.$utils.Storage.set('logoUrl',res.avatarAttrId) 
                 //头像存本地
            }
            this.$store.state.doctorInfo = res 
           
          }
        })
      },  
    // 接诊
    meetChat(){
      
      this.sendTipMessage({
         accepter: this.info.dialogueRealUserId,
         ext: {type: 'accept', 'advice': '医生已接诊！', dialogueId: this.info.id}
      })
      this.$http.post("/api-doctor/doctor/order/accept",{orderId:this.info.id}).then(res=>{
        this.$toast.success('接诊成功！');
          this.info.diagnosisState = 4
         this.$router.push({path:'/interrogation/chat',query:this.info})
      })
    },
  }
}
</script>
<style lang='less' scoped>
.inrecption{
  padding: 3rem 1rem;
  .logo{
    border-radius:50%;
    width:4rem;
    height:4rem;
  }

  .tips{
    color: #AEAEAE;
    font-weight:200;
  }
  .footerBtn{
    left: 0px;
    border-top: 1px solid #EEEEEE;
    position: fixed;
    bottom: 0px;
    line-height: 3rem;
    width: 100%;
    .meet{
      background: #3FD8DE;
      color: white;
    }
  }
}

  
</style>
