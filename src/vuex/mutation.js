const mutations = {
    changeSpin (state, val) {
      state.spin = val
    },
    changeName (state, val) {
      state.nav.tabName = val
    },
    changeNameDic (state, val) {
      state.nav.tabNameDic = val
    },
    changeColIndex (state, val) {
      state.colIndex = val
    },
    changeDictCategoryId (state, val) {
      state.dictCategoryId = val
    },
    setActivePath (state, val) {
      state.activePath = val
    },
    getHeadPortrait (state, val) {
      state.headPortrait = val
    },
    setCurrentPath (state, pathArr) {
      state.currentPath = pathArr
    },
    changePlanTotal (state, total) {
      state.planTotal = total
    },
    breadListStateAdd(state,obj){
      state.currentPath.push(obj);
    },
    breadListStateRemove(state,num){
      state.currentPath=state.currentPath.slice(0,num);
    }
}

export default mutations
