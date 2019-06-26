/**登陆**/ 
<template >
  <div class="boxSave">    
    <van-cell-group v-if="userInfor.state==1"> 
      <p class='title'>请简短的描述您的在线时间，便于用户咨询您！（20个字以内）</p>
      <div class="brs"></div>
      <van-field
        v-model="userInfor.onlineTime"
        maxlength="20"
        label="常在线时间"
        placeholder="请输入"
        rows="1"
        autosize
      />
    </van-cell-group>
    <van-cell-group v-if="userInfor.state==2"> 
        <van-panel title="职称" :status="actor" @click="show=true"/>     
    </van-cell-group>
    <van-actionsheet v-model="show" :actions="actions" @select="onSelect" cancel-text="取消" />
    <van-cell-group v-if="userInfor.state==3"> 
      <div class="introduceBox">擅长<textarea rows="5" cols="30" class='introduction' v-model="userInfor.adept" maxlength="300" /></div>
    </van-cell-group>
    <van-cell-group v-if="userInfor.state==4"> 
      <div class="introduceBox">简介<textarea rows="5" cols="30" class='introduction' v-model="userInfor.introduce" maxlength="300" /></div>
    </van-cell-group>
    <div class="text_center">
      <van-button round  class='btnBackground userBtn'  @click="update" style="background: #5dd6e2;color:white;">保存</van-button>
    </div>
   </div>
</template>
<script>
export default {
   data(){
      return{
        show:false,
        actor:'',
        userInfor:{},
        actions: [{
          name: '住院医师',
          index:1
        },{
          name: '主治医师',
          index:2
        },{
          name: '副主任医师',
          index:3
        },{
          name: '主任医师',
          index:4
        }]
      }
   },
   mounted(){
      this.userInfor = this.$route.query
      if(this.userInfor.onlineTime==null||this.userInfor.onlineTime==='null'){
        this.userInfor.onlineTime = ''
      }
      this.actor = this.actions[this.$route.query.actor-1].name
   },
   methods:{
      onSelect(item){
        // 点击选项时默认不会关闭菜单，可以手动关闭
        this.show = false;
        this.actor = item.name
      }, 
     update(){
      let params={
        onlineTime:this.userInfor.onlineTime, //在线时间
        adept:this.userInfor.adept, //擅长
        id:this.userInfor.id,
        introduce:this.userInfor.introduce, //简介
      }
      this.actions.forEach(item=>{
        if(item.name == this.actor){ 
          params.actor =  item.index 
        }
      })
      // 是否上传图片
      if(!this.$utils.isEmpty(this.userInfor.avatarAttrId)){
        params.avatarAttrId = this.userInfor.avatarAttrId
      }
      this.$http.put("/api-doctor/doctor/update",params).then(res=>{
        this.$toast.success('修改成功！');
        this.$router.go(-1)
      })
    },
   }
}
</script>
<style lang='less' scoped>
.boxSave{
  background: #F8F8F8;
  height: 100%;
  position: fixed;
  width: 100%;
 .title{
  font-size:0.7rem;
  padding: 1rem;
 }
 .brs{
    position: relative;
    border-bottom: 1px solid rgb(204, 204, 204);
    margin-left: 1rem;
    margin-right: 1rem;
 }
 .introduceBox{
    padding: 1rem;
    position: relative;
    min-height: 8rem;
    .introduction{
      width:70%;
      position:absolute;
      right:1rem;
      top: .1rem;
      border:0px;
      resize: none;
      padding:1rem;
      font-weight: 200;  
    }
 }
}
</style>
<style>
.van-cell__value{
  color: #969799;
}
</style>