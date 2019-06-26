let mixin={
  created() {
    // if(this.$route.query.code){
      this.$router.push({path:this.path,query:{code:this.$route.query.code}})
      // return
    // }
    // this.getAppid()
  },
	methods:{
    // 获取appid
    getAppid(){
      this.$http.post("/clinic_wechat/api/getAppid",{accountType:'11'}).then(res=>{
        this.$utils.Session.set('appId',res)
        this.$store.state.appId = res;
        this.getCode(res);
      })
    },
    // 获取code
    getCode(appid){
      let redirect_uri = encodeURIComponent('http://doctortest.medichains.cn'+this.url);
      let snsapi = ''; 
      
      if(this.$utils.Storage.get('appOpenId')){
        snsapi = 'snsapi_base'  //静默
      }else{
        snsapi = 'snsapi_userinfo'  //非静默
      }
      let codeUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope="+snsapi+"&state=STATE#wechat_redirect"
       window.location.href = codeUrl;
    }
	}	
}
export default mixin;