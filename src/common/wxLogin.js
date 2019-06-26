 import wx from 'weixin-js-sdk';
let mixin={
	mounted(){
      this.wxConfig()
    },
    methods:{
	 	  // 获取微信的权限
      wxConfig(){
        let _this = this
          let params = {
            url:encodeURIComponent(window.location.href),
            openId:this.$utils.Session.getObject('userInfo').openid,
            chainId:sessionStorage.chainId,
            accountType:11
          }
          _this.$http.post("/clinic_wechat/api/wechatapi/getWebSignature",params).then(res=>{
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
              appId:res.appid, // 必填，公众号的唯一标识
              timestamp:res.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.noncestr, // 必填，生成签名的随机串
              signature: res.signature,// 必填，签名
              jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] 
              // 必填，需要使用的JS接口列表   //'updateTimelineShareData','updateAppMessageShareData' 
            });
            this.onSelect()
          })
      
      },
      onSelect(item){ 
        // let imgurl = "@/assets/img/man.png"
        let imgurl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559798653134&di=51dca7090e1674462fc72850d37c3757&imgtype=0&src=http%3A%2F%2Fimg18.3lian.com%2Fd%2Ffile%2F201707%2F21%2F5339bbc9360c3d8ed01fe3dae419f645.jpg"
        let link ='http://dev.medichains.cn'
        let _this = this 
        
        wx.ready(function () {
            wx.onMenuShareTimeline({
              title: _this.$store.state.doctorInfo.fullName+'医生开通在线问诊服务啦', // 分享标题
              desc: '通过手机即可享受医生的在线服务，活动期间，优惠多多', // 分享描述
              link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgurl, // 分享图标
              success: function(res) {
                
              },
              fail:function(){
                console.log('分享失败')
              }
          })
          wx.onMenuShareAppMessage({
            title: _this.$store.state.doctorInfo.fullName+'医生开通在线问诊服务啦', // 分享标题
            desc: '通过手机即可享受医生的在线服务，活动期间，优惠多多', // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgurl, // 分享图标
            success: function(res) {},
            fail:function(){
              console.log('分享失败')
            }
        })
      })  
      }, 
	}  
}
export default mixin