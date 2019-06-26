import WebIM from '../../static/chat/WebIM'
import {parseFromLocal} from '@/common/msgFormat'
import Vue from 'vue'
const _this = new Vue()

const actions = {
  sign({commit}, {id}){
    _this.$http.post("/api-patient/message/sign",{dialogueId:id}).then(res=>{}) 
  },
  // 通过token登录
  loginByToken ({commit}, {username, token}) { 
   
    if(username==undefined){
      username = JSON.parse(localStorage.loginToken).username
    }
    if(token==undefined){
       token = JSON.parse(localStorage.loginToken).token
    }
    WebIM.conn.open({
      apiUrl: WebIM.config.apiURL,
      user: username.trim().toLowerCase(),
      pwd: token,
      accessToken: token,
      appKey: WebIM.config.appkey,
      success: (res) => {
        console.log(res)
      },
      fail: e => {
        console.log(e)
      }
    })
     
    commit('setLoginInfo', {
      username,
      password: null,
      token
    })
  },
  // 登出
  logout ({commit}) {
    WebIM.conn.close('logout')
    
  },
  // 发送提示消息： 医生拒接、同意、结束订单
  sendTipMessage ({commit}, message) {
    const id = WebIM.conn.getUniqueId()
    let { accepter, ext } = message
    let msgObj = new WebIM.message('txt', id) // 创建文本消息
     
    msgObj.set({
      msg: '',
      to: accepter, // 接收消息对象（用户id）
      ext: ext,
      roomType: false,
      success: (id, serverMsgId) => {
        console.log('消息发送成功')
      },
      fail: e => {
        console.log(e, '消息发送失败')
      }
    })
    WebIM.conn.send(msgObj.body)
  },
  // 发送文本消息 群聊和单聊
  sendTextMessage ({commit, state}, message) {
    let {chatType, accepter, messageInfo, contentType,type,dialogueId } = message
    const pMessage = parseFromLocal(message)
    const id = WebIM.conn.getUniqueId() // 生成本地消息id
    let msgObj = new WebIM.message('txt', id) // 创建文本消息
    const chatroom = chatType === 'chatroom'
  
    _this.$http.post('/api-patient/patient/dialogue/asynchronous/msg', pMessage).then(res => {
      if(res.messageId==''||res.messageId==null||res.messageId==undefined){
        console.log('消息上传失败')
        return
      }
  
      msgObj.set({
        msg: messageInfo,
        to: accepter, // 接收消息对象（用户id）
        ext: { type, contentType,dialogueId,messageId:res.messageId,sendDate:res.sendDate },
        roomType: chatroom,
        success: (id, serverMsgId) => {
          if(contentType === 1 || contentType === 2){ 
            commit('addMessage',pMessage)
          }
        },
        fail: e => {
          console.log(e, '消息发送失败')
         
        }

      })
      WebIM.conn.send(msgObj.body)
    })
  },
  // 单聊发送音频消息
   sendPrivateAudio  ({commit, state}, {chatType, accepter, sender, source}) {
      const id = WebIM.conn.getUniqueId()                 // 生成本地消息id
      const msgObj = new WebIM.message('audio', id);      // 创建音频消息

      msgObj.set({
        apiUrl: WebIM.config.apiURL,
        file: source,
        to: accepter,
        roomType: chatType === 'chatroom',
        onFileUploadError: function (data) {
          console.log('音频上传失败')
        },
        onFileUploadComplete: function () {
          console.log('音频上传成功')
        },
        success: function () {
           // messageStore(pMessage)
          console.log('音频发送成功')
        },
        flashUpload: WebIM.flashUpload
    })

    if (chatType === 'groupchat' || chatType === 'chatroom') {
      msgObj.setGroup('groupchat')
    }
    WebIM.conn.send(msgObj.body)
    let pMessage = parseFromLocal(chatType, accepter, sender, source, 'audio')
    commit('addMessage', pMessage)
    
  },
  
}

function messageStore (message) {
   
  _this.$http.post('/api-patient/patient/dialogue/asynchronous/msg', message).then(res => {})
}
export default actions
