import Vue from 'vue';

Vue.filter('businessFilter',function(value){

    // console.log(getter);
    if(value){
        return value.substr(0,2);
    }

})


Vue.filter('formatTimeFilter',function(format){
        return new Date(format).format('yyyy-MM-dd hh:mm:ss');
})

Vue.filter('formatDateFilter',function(format){
        return new Date(format).format('yyyy-MM-dd');
})

Vue.filter('formatDateNoDayFilter',function(format){
        return new Date(format).format('yyyy-MM');
})
