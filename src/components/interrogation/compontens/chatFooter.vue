<template>
	<van-row class='footerBtn'> 
	  <div class='conten'  span="24">
	  	<van-col span="18">
          <!-- @onfocus='clickTextarea' -->
          <!-- :autofocus="!chatFoorterState" :readonly="chatFoorterState"-->
	  		<textarea ref="textarea" class="input-box"           
          :readonly="chatFoorterState"
          v-model="message"  
          v-show="!soundState"  
          spellcheck="false"
          @input="calRows" 
          @blur="changeCount"
          @click="clickTextarea"
          :style="textareaCalcStyle"
        />
				<div v-show='soundState'  class="text_center" >
					<div @touchstart="gotouchstart" @touchmove="gotouchmove" @touchend.prevent="gotouchend">
						<van-button size="large" style="height: 2.3rem;line-height: 2.3rem;">
						 	<span v-show="!stateInfor">按住 说话</span>
							<span v-show="stateInfor">松开 结束</span>						
						</van-button>
					</div>
				</div>
	  	</van-col>
	  	<van-col span="6" class="rimg">
        <img src="@/assets/img/1.png" class='logo dis' @click="clickEmojiBox">
        <span class="send dis"  v-show="message!=''"  @click="sendBtn">发送</span>
        <span  class="file" v-show="message==''"><input type="file" @change="onRead" ref="file"/>&nbsp;</span>  
			</van-col>
	  </div>
    <van-swipe  class="expressionBox" v-show="chatFoorterState">
	  	<van-swipe-item >
	  		<template v-for="item in emojiList">
	  			<span class='dis chatExpression' @click="choseEmoji(item)">{{item}}</span>
	  		</template>	
	  	</van-swipe-item>
		</van-swipe>
		<div class="recording" v-show="rBoxState" @mouseleave="rBoxState=false">
			<div v-show="recordingState">
			 	<img src="@/assets/img/recording-bkg.be552c9.png" class="iconImg">
				<p>手指上划,取消发送</p>
			</div>
			<div v-show="!recordingState">
				<img src="@/assets/img/record.png" class="iconImg" style='width:80%;'>
				<p>松开手指,取消发送</p>
			</div>
		</div>
    <div class="loding" v-show="lodingState">
      <img src="@/assets/img/loding.gif"/>
    </div>
	</van-row>
</template>
<script>
import WebIM from '../../../../static/chat/WebIM'
import config from '../../../../static/chat/config'
import emojione from 'emojione'
import $ from 'jquery'
import calcTextareaHeight from './calcTextareaHeight.js'
import { mapState, mapMutations, mapActions } from 'vuex' 
import wx from 'weixin-js-sdk';

export default {
  props:['dialogueId','accepter','bottom'],
	computed: {
    ...mapState(['msgGroup','isLogin']),
    emojiList() {
    	// 表情数组
      const emojiLibrary = [
      ':smile:', ':laughing:', ':blush:', ':smiley:', ':smirk:', ':heart_eyes:', ':kissing_heart:', ':kissing_closed_eyes:', 
      ':flushed:', ':relieved:', ':satisfied:', ':grin:', ':wink:', ':stuck_out_tongue_winking_eye:', 
      ':stuck_out_tongue_closed_eyes:', ':grinning:', ':kissing:', ':kissing_smiling_eyes:', ':stuck_out_tongue:', ':sleeping:', 
      ':worried:', ':frowning:', ':anguished:', ':open_mouth:', ':grimacing:', ':confused:', ':hushed:']
      const arr = []
      emojiLibrary.forEach(item => {
        let output = emojione.shortnameToImage(item)
        let div = document.createElement('div')
        div.innerHTML = output
        let emoji = div.children[0].alt
        arr.push(emoji)
      })
      return arr
    },
  },
	data() {
    return {
      chatFoorterState:false,  //弹出层
      lodingState:false,
     	message:'',
     	stateInfor:false,  //语音灰色层
     	recordingState:true, //控制录音 显示图标位哪个
     	rBoxState:false, //控制录音 弹出层
     	soundState:false,
     	timeOutEvent:0,
      textareaCalcStyle:{},
      audio_context:'',
      file:'',
      localId:'', // 录音id
      startIndex: null,
      endIndex: null
    }
  },
  watch: {
    message(newVal){
      this.$nextTick(this.resizeTextarea);
    },
    chatFoorterState(state){
      this.changeBottom(state)
    
      let ri = document.querySelectorAll('.right')
      if(ri.length>0){
         window.scrollTo(0,ri[ri.length-1].offsetTop)
      }
    }
  },
  mounted() {
    window.$ = $;
    this.resizeTextarea(); 
    this.wxConfig()
    // this.getIdInfo()
  },
  methods: {
  	...mapActions(['sendTextMessage', 'sendPrivateAudio','sendTipMessage','loginByToken']),
    changeBottom(state){  //控制页面高度
      if(state){
         this.$emit('changeBottom',15)
      }else{
        this.$emit('changeBottom',2)
      }  
    },
    changeCount(){
      let ri = document.querySelectorAll('.right')
      if(ri.length>0){
         window.scrollTo(0,ri[ri.length-1].offsetTop)
      }
    },
    // 点击图标
    clickEmojiBox(){
      let ri = document.querySelectorAll('.right')  
      if(ri.length>1){
         window.scrollTo(0,ri[ri.length-1].offsetTop)
      }

      this.chatFoorterState = !this.chatFoorterState  
      //记录键盘的光标
      let jTextarea = $(this.$el).find("textarea")
      let textarea = jTextarea[0];
      if(this.chatFoorterState){
       
        this.startIndex = textarea.selectionStart;
        this.endIndex = textarea.selectionEnd;
        jTextarea.blur();
      }else{
         jTextarea.focus();
      }

    },
    // 输入框
    clickTextarea(){
       let ri = document.querySelectorAll('.right')
      if(ri.length>0){
         window.scrollTo(0,ri[ri.length-1].offsetTop)
      }
       if(this.chatFoorterState){
          this.chatFoorterState = false
          
          let jTextarea = $(this.$el).find("textarea");
          let textarea = jTextarea[0];
          this.$nextTick(()=>{
              jTextarea.blur();
              jTextarea.focus();
              this.$emit('changeBottom',15)
              textarea.setSelectionRange(this.startIndex, this.endIndex);
          })
        }
        this.chatFoorterState = false
    },
  	// 获取微信的权限
    wxConfig(){
      let params = {
        url:encodeURIComponent(window.location.href),
        openId:this.$utils.Session.getObject('userInfo').openid,
        chainId:sessionStorage.chainId,
        accountType:11
      }
      this.$http.post("/clinic_wechat/api/wechatapi/getWebSignature",params).then(res=>{
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，
          appId:res.appid, // 必填，公众号的唯一标识
          timestamp:res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.noncestr, // 必填，生成签名的随机串
          signature: res.signature,// 必填，签名
          jsApiList: ['startRecord','stopRecord','playVoice','downloadVoice','uploadVoice'] // 必填，需要使用的JS接口列表 
        });
      })
    },
    //播放
    playVoice(){ 
      let  _this = this
      wx.playVoice({
          localId: _this.localId // 需要播放的音频的本地ID，由stopRecord接口获得
      });
    },   
  	//开始录音
    startRecord(){
      wx.ready(function(){
        wx.startRecord();
      });
    },
    // 停止录音方法
    stopRecord(){
      let _this = this
      wx.stopRecord({
        success: function (res) {
          _this.localId = res.localId;
          wx.uploadVoice({
            localId:res.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
              var serverId = res.serverId; // 返回音频的服务器端ID
            }
          })
        }
      })
    },
    calRows(){
      let lines = this.message.split(/\r?\n/).length;
      if(lines > 5){
        this.rows = 5;
      }else{
        this.rows = lines;
      }
    },
  	// 选择表情
  	choseEmoji (emoji) {
		  if(!emoji){
          return;
      }
      let jTextarea = $(this.$el).find("textarea")
      let textarea = jTextarea[0];
      let startIndex = textarea.selectionStart;
      let endIndex = textarea.selectionEnd;
      this.message = this.message.substring(0,startIndex) + emoji + this.message.substring(endIndex)
      this.$nextTick(()=>{
          textarea.setSelectionRange(startIndex+2, startIndex+2);
          jTextarea.focus();
          this.startIndex = textarea.selectionStart
          this.endIndex = textarea.selectionEnd
      })

    },
    //发送按钮事件
	  sendBtn(){ 
      if(!window.navigator.onLine){
        this.$toast.fail('网络异常')
        return
      }
      if(!this.$store.state.isLogin){
        this.$toast.fail('聊天已掉线,请重新发送')
        this.loginLetter()   
        return
      }
    
      if(this.message==''){
        return
      }
      let msgObj = {
        type: 'default',
        contentType: 1, // 1文本,2语音,3图片,4文件,5小视屏,6视频请求,7语音请求,0分隔符,10其他
        dialogueId: this.dialogueId,
        accepter: this.accepter, //接收
        sender: this.$utils.Storage.getObject('loginInfo').id,  //发送
        messageInfo: this.message,
        senderName: this.$utils.Storage.getObject('loginInfo').fullName,
        senderHeadImg: this.$utils.Storage.get('loginInfo').logoUrl,
        senderType: '2'  ///2是医生
      }

      this.sendTextMessage(msgObj)
      //刷新ios 键盘页面问题
			 let ri = document.querySelectorAll('.right')
      if(ri.length>0){
         window.scrollTo(0,ri[ri.length-1].offsetTop)
      }
     
      // 识别显示图标层还是键盘层
      if(!this.chatFoorterState){
          let jTextarea = $(this.$el).find("textarea");
        this.$nextTick(()=>{
            jTextarea.focus();
        })
      } 
      this.message = ''  
		},
    resizeTextarea() {
      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, 1, 5);
    },
     
	  gotouchstart(){
			let that = this;
			clearTimeout(this.timeOutEvent);//清除定时器
			this.timeOutEvent = 0;
			this.touchstartClick()
		},
		//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
		gotouchend(){
			this.stopRecord()
			this.stateInfor = false
			this.rBoxState = false
			clearTimeout(this.timeOutEvent); 
		},
		//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按 
		gotouchmove(){
	    clearTimeout(this.timeOutEvent);//清除定时器
	    this.stateInfor = false
			this.rBoxState = false
	    this.timeOutEvent = 0;
      this.stopRecord()
		},
		// 长期点击
		touchstartClick(){
			this.startRecord()
      let i = 0;
      let _this = this
      let tiems=setInterval(function(){
        i++;
        if(i==60){  //录音60秒关闭
          _this.stopRecord()
          clearInterval(tiems)
          _this.gotouchmove()
          _this.$toast.fail('最长录音60秒')    
        }
      },1000)
			this.rBoxState = true
			this.stateInfor = true
		}, 
    loginLetter(){  //登陆环信       
      if(this.$utils.Storage.getObject('loginToken').username != undefined&&this.$utils.Storage.getObject('loginToken').token!=undefined){
        this.loginByToken(this.$utils.Storage.getObject('loginToken'))
        return
      }  //获取存好的token

      this.$http.get('/api-doctor/doctor/hx/signIn').then(res=>{
        let params = {
          username:localStorage.doctorId,
          token:res.access_token
        }
        this.$utils.Storage.setObject('loginToken',params)  
        this.loginByToken(params)
      })
    },
    // 图片上传
		onRead(e) { 
          
      if(!this.$store.state.isLogin){ 
        this.$toast.fail('聊天已掉线,请重新发送')
        this.loginLetter()
        return  
      }

      let file = WebIM.utils.getFileUrl(e.target)
      if (file.data.size > 1024 * 1024 * 10) {
        this.$toast.fail('大于10M')
        return 
      }
      
      let params = new FormData()
      let headers = {
        headers: {'Content-Type': 'multipart/form-data'}, // 添加请求头
        cancelQs: true
      }
      params.append('file', file.data)

      let msgObj2 = {
          sendDate: this.$utils.getDate(),
          type: 'default',
          contentType: 3, // 1文本,2语音,3图片,4文件,5小视屏,6视频请求,7语音请求,0分隔符,10其他
          dialogueId:this.dialogueId,
          accepter:this.accepter,
          sender: this.$utils.Storage.getObject('loginInfo').id,  //发送
          messageInfo: file.url, 
          senderName: this.$utils.Storage.getObject('loginInfo').fullName,
          senderHeadImg: this.$utils.Storage.get('loginInfo').logoUrl,
          senderType: '2',  ///2是医生
        }
        // 提前显示大图片数据处理
      this.$store.commit('addMessage',msgObj2)
      this.$http.post('/api-patient/message/file', params, headers).then(res => {
        if(res.status!=0){
          let msgObj = {
            type: 'default',
            contentType: 3, // 1文本,2语音,3图片,4文件,5小视屏,6视频请求,7语音请求,0分隔符,10其他
            dialogueId:this.dialogueId,
            accepter:this.accepter,
            sender: this.$utils.Storage.getObject('loginInfo').id,  //发送
            messageInfo: res.url,
            senderName: this.$utils.Storage.getObject('loginInfo').fullName,
            senderHeadImg: this.$utils.Storage.get('loginInfo').logoUrl,
            senderType: '2',  ///2是医生
            localImg:file.url
          }
          this.sendTextMessage(msgObj)
          this.$refs.file.value = null
          this.lodingState = false
        } 
      })
      this.$refs.file.value = null
	  }
	}
}
</script>
<style lang='less' scoped>
textarea{overflow:hidden; resize:none;}
.footerBtn{
	 	user-select: none; 
	 	position: fixed;
    z-index:99;
    border-top: 1px solid #e0e0e0;
    background: #f5f5f5;
    bottom: 0rem;
    width: 100%;
    .input-box{
      flex: 1;
      width: 93%;
      border: 1px solid #C1C5C7;
      border-radius: 4px;
      padding: 5px 7px;
      word-wrap: break-word;
      word-break: break-all;
      color: #323233;
      font-size: 14px;
      line-height: 24px;
    }
    .conten{
    	min-height: 2rem;
    	line-height: 2.5rem;
    	.text_center{
    	height:1.7rem;
			height:1.7rem;
    	}
	    img{
	    	width:1.5rem;
	    	vertical-align: sub;
	    }
      @a:1.7rem;
	    .rimg{
	    	padding-left: .4rem;
        text-align: center;
	    	.send{
					  font-size: 0.8rem;
            background: #1bb51b;
            padding:.1rem .2rem;
            color: white;
            line-height: 23px;
            width: 2rem;
            text-align: center;
            margin-bottom: 0rem;
            position: relative;
       
            border-radius: 0.2rem;
	    	}
	    }
	    .van-cell{
	    	padding: 0px 15px;
	    }
    }
   
    .expressionBox{
      padding: .3rem;
      height: 12rem;
      width:100%;
    	.van-swipe-item{
    		width:100% !important;
    	}
    	.expressio{
    		width:100%;
    		height:100%;
    	}
    }
   .recording {
	    position: fixed;
	    left: 50%;
	    top: 45%;
	    transform: translate(-50%, -50%);
	    width: 140px;
	    height: 140px;
	    padding: 5px;
	    background-color: rgba(0, 0, 0, .5);
	    color: #ffffff;
	    border-radius: 5px;
	    font-size: 14px;
	    text-align: center;
	    .iconImg{
	    	margin: auto;
	    	width:50%;
	    }
	} 
	.stateInfor{
		background: #cccccca8;
	}

.file {
    margin-left: .8rem;
    position: relative;
    display: inline-block;
    background:url(../../../assets/img/2.png) no-repeat;
    background-size:100%;
    border-radius: 4px;
  	width:1.5rem;
    line-height: 2rem;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    width: 2px;
    opacity: 0;
}
 .chatExpression{
 	  font-size: 1.5rem;
    margin:.3rem;
 }
}
.loding{
    text-align: center;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 19999;
    background: rgba(20, 20, 23, 0.41);
    top: 0px; 
    
  img{
    width:5rem;  
    margin:50% auto;
  }
}
</style>
<style>
.van-swipe__track{
	width:100% !important;
}
</style>