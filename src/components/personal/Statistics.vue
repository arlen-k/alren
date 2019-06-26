/**收入统计**/ 
<template>
 	<div class='statistics'>
    <van-row class='head'>
      <van-row class="screen">
        <van-col span="8" style="border:0px;"><span @click="show=!show">{{group.substring(0,7)}}<van-icon name="arrow-down" /></span></van-col>
    	  <van-col span="8"><span @click="starDate">{{params.beginDate}}<van-icon name="arrow-down" /></span></van-col>
        <van-col span="8"><span @click="endDate">{{params.endDate}}<van-icon name="arrow-down" /></span></van-col>
      </van-row>
      <van-col span="24" class="btnBox" >
        <van-button round type="danger" class='btn reset' @click="reset">重置</van-button>
        <van-button round type="danger" class='btn' style="margin-left: 1rem;" @click="getDate">查询</van-button>
      </van-col>
    </van-row>
    
    <table class="table"  border="0" cellspacing="0" cellpadding="0">
      <th>时间</th><th>订单总数</th><th>总金额</th>
      <tr v-for="item in list">
        <td><span v-if="item.monthDate">{{item.monthDate.substring(2,7)}}</span></td>
        <td>{{item.completeOrders}}</td><td>{{item.income}}</td>
      </tr>
    </table>
    <van-datetime-picker
      v-show="dateState"
      v-model="currentDate"
      type="year-month"
      :formatter="formatter"
      class="text_center date"
      @confirm="confirm"
      @cancel='dateState=false'
    />
    <van-actionsheet v-model="show" :actions="groupList" @select="onSelect" cancel-text="取消" />
 	</div>
</template>
<script>
export default {
 data(){
    return {
      show:false,
      group:'全部机构',
      groupList:[],
      chainId:'',
      params:{
        beginDate:this.$utils.formatDate(new Date(),'yy-MM'),
        endDate:this.$utils.formatDate(new Date(),'yy-MM')
      },
      currentDate: new Date(),
      dateState:false,
      dateIndex:1,
      list:[{},{},{}]
    };
  },
  mounted(){
    this.getDate()
    this.gitOrgen()
  },
  methods: {
    reset(){
      this.params = {
        beginDate:this.$utils.formatDate(new Date(),'yy-MM'),
        endDate:this.$utils.formatDate(new Date(),'yy-MM')
      }
      this.getDate()
    },
    getDate(){
      this.list = []
      this.$http.get("/api-doctor/doctor/wage/list?beginDate=20"+this.params.beginDate+"&endDate=20"+this.params.endDate+'&chainId='+this.chainId).then(res=>{
        this.list =res
      })
    },
    // 选择集团
    onSelect(item){
       // 点击选项时默认不会关闭菜单，可以手动关闭
        this.show = false;
        this.group = item.name
        this.chainId = item.index
    },
    // 选择时间
    confirm(item){
      this.dateState = false
      if(this.dateIndex==1){
        this.params.beginDate = this.$utils.formatDate(item,'yy-MM')
      }else{
        this.params.endDate = this.$utils.formatDate(item,'yy-MM')
      }
    },
    // 获取集团信息
    gitOrgen(){
      this.$http.get("/api-doctor/doctor/servers/info").then(res=>{
        this.groupList = res.map((item)=>{
          return {
            name:item.chainName,
            index:item.chainId
          }
        })
        this.groupList.push({name:'全部机构',index:''})
      })
    },
    starDate(){
      this.dateState = true
      this.dateIndex = 1
    },
    endDate(){
      this.dateState = true
      this.dateIndex = 2
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}`;
      } else if (type === 'month') {
        return `${value}`
      }
      return value;
    } 
  }
}
</script>
<style lang='less' >
.statistics{
  background: #F8F8F8;
  position: absolute;
  width: 100%;
  height: 100%;
  .head{
    padding: 1rem 0rem 1rem 0;
    text-align: center;
    background: white;
    .screen{
      border-bottom: 1px solid #EEEEEE;
      padding-bottom: 1rem;
      .van-col--8{
         border-left: 1px solid #ccc; 
      }
    }
  }
  .van-picker__cancel, .van-picker__confirm{
    width:100%;
  }
   
  .date{
    width:100%;
    position: absolute;
    bottom: 0px;
  }
  .btnBox{
    text-align: right;
    padding-right: 1rem;
    margin-top: .5rem;
    .btn{
      border:0px solid rgba(63,216,222,1);
      border-radius:.4rem;
      background: #3FD8DE;
      border: 0px;
      width: 4.4rem;
      height: 2.5rem;
      line-height: 2.5rem;
      font-family:MicrosoftYaHei;
      font-weight:400;
    }
    .reset{
      border:1px solid rgba(63,216,222,1);
      background:white;
      color:#3FD8DE;
    }
  }
  .table{
    background: white;
    margin-top: 1rem;
    width:100%;
    text-align: center;
       padding: 1rem;
    th{
      line-height:3rem;
      background: #F8FDFE;
    }
    tr{
      border-bottom: 1px solid #EEEEEE !important;
      line-height:2rem;
      td:last-child{
        color: #FCAA35;
      }
    }
  }
}
</style>
