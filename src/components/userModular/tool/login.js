let mixin={
  data(){
    return{
      params:{
        appId:this.$utils.Session.get('appId'),
        appOpenId:this.$utils.Storage.get('appOpenId'),
        userName:'', //  测试 19911110001
        password:'',// 110001
        registerSource:4
      },
    }
  }, 
  mounted(){
    this.getWebUserInfo()
  },
	methods:{

    // 获取openid 
    getWebUserInfo(){
      if(this.$route.query.code==null){
        return
      }
      this.$http.post("/clinic_wechat/api/wechatapi/getWebUserInfo",{code:this.$route.query.code,accountType:11}, {cancelCatch:true}).then(res=>{ 
        this.$utils.Storage.set('appOpenId',res.openid)
        this.params.appOpenId = res.openid
        this.$store.state.userInfo = res 
        this.$utils.Session.setObject('userInfo',res)
        this.$utils.Storage.setObject('userInfo',res)
      })
    },
    // 获取详情
    doctorinfo(){
      this.$http.get("/api-doctor/doctor/orderComment/doctorinfo").then(res=>{  
        if(res.status!=0){
          this.$toast.success('登录成功！');
          this.$store.state.doctorInfo.fullName = res.fullName
          this.$router.push(this.path)
          
        }else{
           this.$toast.success('用户名或密码错误');
        }
      })
    },  
    login(){
      this.$router.push(this.path)
      let _this = this
      if(this.params.appOpenId==''){
        this.$toast.fail('请等待，再次确认!');
        return
      }
      if(this.params.userName==''||this.params.password==''){
        this.$toast.fail('请输入完整账号密码!');
        return 
      }
      this.$utils.Storage.set('phone',this.params.userName)
      this.$http.post("/clinic_wechat/api/appDoctorLogin",this.params).then(res=>{
          if(res.status==0){
            return
          }else{
            this.$utils.Session.set('clinicSessionId',res.clinicSessionId)
            this.$utils.Session.set('chainId',res.chainId)
            this.doctorinfo()  
          } 
      }) 
    }
	}	
}
export default mixin;