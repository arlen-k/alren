import WebIM from './WebIM'
import store from '../../src/store/index'
import {parseFromServer} from '../../src/common/msgFormat'
import { Toast } from 'vant'

// let token = localStorage.loginToken?JSON.parse(localStorage.loginToken):''

// store.dispatch('loginByToken',token)
 
// 解析患病时长
function parse (value) {
  switch (value) {
    case '1':
      return '一周内'
    case '2':
      return '半月内'
    case '3':
      return '一月内'
    case '4':
      return '一月以上'
  }
}
// 解析图片列表
function parseImg (list) {
  let arr = JSON.parse(list)
  return arr
}
WebIM.conn.listen({
  // 连接成功回调
  onOpened: msg => {   

    // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
    // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
    // 则无需调用conn.setPresence();
    console.log('环信登陆成功')
    store.state.isLogin = true
  },
  // 连接关闭回调
  onClosed: msg => {
    console.log('环信登陆关闭')
    store.state.isLogin = false
  },
  // 收到文本消息
  onTextMessage: message => {
    store.state.changeMsg ++
    let ext = message.ext
  
    if(ext.dialogueId==store.state.dialogueId){
      if (ext.type === 'endOrder') {  //患者主动结束问诊
        store.state.chatHead=false
      }else{
        store.commit('addMessage', parseFromServer({message, contentType: ext.contentType}))
      } 
    }
  },
  // 收到表情消息
  onEmojiMessage: message => {
    store.state.changeMsg ++
    // console.log('表情', message)
  },
  // 收到图片消息
  onPictureMessage: message => {
    store.state.changeMsg ++
    // console.log('收到图片消息', message)
    store.commit('图片', parseFromServer({message, bodyType: 'img'}))
  },
  // 收到命令消息
  onCmdMessage: message => {},
  // 收到音频消息
  onAudioMessage: function ( message ) {
    store.state.changeMsg ++
    // console.log('收到音频消息', message)
    var options = { url: message.url };
    
    options.onFileDownloadComplete = function ( response ) { 
      //音频下载成功，需要将response转换成blob，使用objectURL作为audio标签的src即可播放。
      var objectURL = WebIM.utils.parseDownloadResponse.call(Demo.conn, response);
    };  

    options.onFileDownloadError = function () {
      //音频下载失败 
    };  

    //通知服务器将音频转为mp3
    options.headers = { 
      'Accept': 'audio/mp3'
    };

    WebIM.utils.download.call(conn, options);
  },
  // 收到位置消息
  onLocationMessage: message => {},
  // 收到文件消息
  onFileMessage: message => {},
  // 收到视频消息
  onVideoMessage: message => {
    // console.log('收到视频消息', message)
  },
  // 处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
  onPresence: message => {},
  // 处理好友申请
  onRoster: message => {},
  // 处理群组邀请
  onInviteMessage: message => {},
  // 本机网络连接成功
  onOnline: () => {
    console.log('连网路成功')
     store.dispatch('logout')
    store.state.isLogin = false
  },
  // 本机网络掉线
  onOffline: error => {
    console.log(error)
    console.log('掉线')
    store.dispatch('logout')
    store.state.isLogin = false
  },
  // 失败回调
  onError: error => {
     store.state.isLogin = false
     store.dispatch('logout')
     // 2: login by token failed
     if (error.type === WebIM.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
      Toast('WebIM 链接鉴权失败,请刷新重试')
      return
    }
    // 8: offline by multi login
    if (error.type === WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
      Toast('多重登录，已离线')
      return
    }

    // if (!WebIM.conn.isOpened()) {
    //     store.dispatch('loginByToken', token)
    // }   
  },
  // 黑名单变动
  // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
  onBlacklistUpdate: list => {
    // console.log(list)
  },
  // 收到消息送达服务器回执
  onReceivedMessage: message => {},
  // 收到消息送达客户端回执
  onDeliveredMessage: message => {},
  // 收到消息已读回执
  onReadMessage: message => {},
  // 创建群组成功回执（需调用createGroupNew）
  onCreateGroup: message => {},
  // 如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
  onMutedMessage: message => {}
})
