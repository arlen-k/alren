const mutations = {
  //  存储用户的登陆信息
  setLoginInfo (state, {username, password, token}) {
    state.username = username
    state.password = password
    state.token = token
    state.isLogin = true
    sessionStorage.setItem('username', username)
    sessionStorage.setItem('token', token)
  },
  // 添加消息
  addMessage (state, pMessage) {
     if(state.msgGroup==null){
      state.msgGroup = []
     }
    state.msgGroup.push(pMessage)
  },
}
export default mutations
