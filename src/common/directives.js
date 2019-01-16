import Vue from 'vue';
	
Vue.directive('goback',{
	/**
		注意指令的简写形式
		是bind和update的简写
	**/
	inserted : function(el, binding){
		$(el).click(function(){
			window.history.back();
		});
	}
})


