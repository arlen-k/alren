let Loading= {};

Loading.install = (Vue, options)=>{
  let LoadingComponent = Vue.extend({
      template : '<div id="loading" class="ivu-spin ivu-spin-fix ivu-spin-show-text">' +
                  '<div class="ivu-spin-main">' +
                    '<span class="ivu-spin-dot"></span>' +
                    '<div class="ivu-spin-text">' +
                      '<i class="spin-icon-load ivu-icon ivu-icon-load-c"></i>' +
                    '</div>' +
                  '</div>' +
                '</div>'
  });

  Vue.loading = ()=>{
      let loading = document.getElementById('loading');
      if(!loading){
         document.body.appendChild(new LoadingComponent().$mount().$el);
      }
  }

  Vue.hideLoading = ()=>{
      document.getElementById('loading').remove();
  }
}

export default Loading;
