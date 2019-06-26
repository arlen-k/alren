const state = {
    userInfo:'', //登陆详情
    doctorInfo:{},
    logoUrl:'', //logo 头像
    phoneInfo:'', //手机验证号和验证码
    chatFoorterState:false,
    dialogueId:'',
    chatHead:true,
    showHome:false,
 	// ---------以下为环信
 	changeMsg:1,
 	username: null,
	password: null,
	isLogin: false,  //是否登陆成功
	hasToken: false,
	token: null, // 可以用token登陆环信
	chatUser: null, // 聊天者
	roster: {}, // 好友列表，
	chatList: {}, // 聊天列表
	msgGroup: [] // 存放的消息组 和哪个人的聊天记录
}

export default state
