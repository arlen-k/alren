import { mapState, mapActions, } from 'vuex'
let mixin={
	mounted(){
		this.loginLetter() 
    },
    computed: {
    	...mapState(['isLogin']),
	},
    methods:{
		...mapActions(['loginByToken']),  
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
	}  
}
export default mixin