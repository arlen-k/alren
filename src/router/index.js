import router from "./router";
import store from '../store/index'
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if(from.path=="/personal/personalHome"&&to.path=="/login"||from.path=="/interrogation/InReceptionState"&&to.path=="/loginInterrogation"){
        store.state.changeMsg++
    	return
    }
    if(from.path=="/interrogation/chat"&&to.path=="/interrogation/InReceptionHandle"||from.path=="/interrogation/rejectionrDetail"&&to.path=="/interrogation/InReceptionHandle"){
        next('/interrogation/InReceptionState')
        return
    }
    next() 
})
export default router
