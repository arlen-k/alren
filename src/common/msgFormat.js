// 格式化本地和来自服务器的数据
import dateFormat from './dateFormat.js'
import utils from './utils.js'
 // 时间计算
 
export const parseFromLocal = (message) => {

  let { accepter, sender, contentType, messageInfo, senderName, senderHeadImg, dialogueId } = message
  return {
    accepter, // 接收者id
    sender, // 发送者
    accepterType: 1, // 接收者身份 1是患者，2是医生
    senderType: 2, // 发送者身份 1患者  2医生
    contentType, // 1文本,2语音,3图片,4文件,5小视屏,6视频请求,7语音请求,0分隔符,10其他
    dialogueId, // 会话id
    messageInfo, // 消息内容
    readState: 1, // 0已读 1未读
    firstTag: false, // 是否第一条标记 true 是 false 不是
    sendDate: utils.getDate(), // 发送时间
    senderName,
    senderHeadImg
  }
}
export const parseFromServer = ({message, contentType}) => {
  
  let {from, to, ext, data} = message
  let msgObj = {
    accepter: to, // 接收者id
    accepterType: 2, // 接收者身份 1是患者，2是医生
    contentType: contentType || 1, // 1文本,2语音,3图片,4文件,5小视屏,6视频请求,7语音请求,0分隔符,10其他
    dialogueId: ext.dialogueId, // 会话id
    messageInfo: data, // 消息内容
    readState: 1, // 0已读 1未读
    sendDate: utils.getDate(), // 发送时间
    sender: from, // 发送者id
    senderType: 1, // 发送者身份 1患者  2医生
    messageId: ext.messageId,
    senderName: ext.senderName, // 发送者名字
    senderHeadImg: ext.senderHeadImg
  }
  // 如果是第一条消息的话 还应该携带 dialogueId, orderId等等这些扩展
  if (ext.type === 'initialMessage') {
    let obj = Object.assign({}, {
      question: ext.question,
      dialogueId: ext.dialogueId, // 订单id
      gender: ext.gender === '0' ? '男' : '女', // 性别 0男 1女
      age: ext.age,
      medicalCard: ext.medicalCard || null, // 就诊卡号
      symptomsTime: parse(ext.symptomsTime), // 患病时长
      remark: ext.remark, // 过敏史
      imgList: parseImg(ext.imgList) // 图片列表
    })
    msgObj.firstTag = true
    msgObj.messageInfo = obj
  }
  return msgObj
}

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