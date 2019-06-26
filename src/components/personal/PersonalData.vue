/**个人资料**/ 
<template> 
 	<van-row class="infor">
    <van-cell class="header">
      <van-uploader :after-read="onRead"  style="width: 100%;">
        <span class="dis">头像</span>        
        <img  class="dis rig" :src="logo" alt="头像"/> <span class="icon-r">
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i></span> 
      </van-uploader>
    </van-cell>
    <van-cell title="常在线时间" @click="routers(1)" is-link :value="(userInfor.onlineTime == '' || userInfor.onlineTime === 'null'||userInfor.onlineTime === null||userInfor.onlineTime === undefined)?'':userInfor.onlineTime" />
    <van-cell title="职称" @click="routers(2)" is-link :value="actor" />
    <van-cell title="擅长" @click="routers(3)" is-link :label="userInfor.adept" />
    <br>
    <van-cell title="简介" @click="routers(4)" is-link  :label="userInfor.introduce" />
 	</van-row>
</template>
<script>
export default {
 data() {
    return {
      actor:"",
      logo:this.$store.state.logoUrl,
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
    };
  },
  mounted(){
     this.doctorinfo()
  },
  destroyed(){  //离开页面执行删除
     this.$utils.Session.remove('state')
  },
  methods: {
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
      })
    },
    routers(state){ 
      this.userInfor.state = state 
      this.$router.push({path:'/personal/personalSave',query:this.userInfor})
    },
    // 获取详情
    doctorinfo(){
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      });
      this.$http.get("/api-doctor/doctor/orderComment/doctorinfo").then(res=>{
        this.userInfor = res
       
        if(res.avatarAttrId!=''){
          this.logo = res.avatarAttrId  
          this.$store.state.logoUrl = res.avatarAttrId  
        }
        this.actor = this.actions[res.actor-1].name
      })
    },
    // 修改logo
    onRead(file) {
      this.logo = file.content
      let params = new FormData()
      params.append('file',file.file)
      let headers = {
        headers: { "Content-Type": "multipart/form-data"},//添加请求头
        cancelQs:true
      }
      this.$http.post("/clinic_file/web/file/upload",params,headers).then(res=>{
        let url = this.$SERVERURL+res[0].webAddr 
        this.userInfor.avatarAttrId = url
        this.$store.state.logoUrl = url
        this.update()
      })
    }
  }
}
</script>
<style lang='less' scoped>
@size:1.2rem;
.infor{
 
  background:#F8F8F8;
  position:fixed;
  height:100%;
  width:100%;
  
  background-color: #F8F8F8;
  p{
    padding-left: 1rem;
    line-height:1rem;
    color:#222222;
    margin-top: .5rem;
  }
  .header{
    line-height: 5rem;
    .icon-r{
      position: absolute;
      right: 0px;
    }
    img{
      height:4.4rem;
      width:4.4rem;
      border-radius:50%;
    }
    .dis div{
      line-height:3rem;
      color:#D4D4D4;
      font-size:@size;
    }
  }
  .van-cell__label{
    line-height:1.5rem;
    color: #666666;
  }
  .introduction{
    width:90%;
    border:0px;
    padding:1rem;
    font-size: 1.7rem;
    font-weight: 200;
  }
}
</style>
 