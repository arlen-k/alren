import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'
import Qs from 'qs'

let _this = new Vue();
let service = axios.create();
 
// 请求拦截器
service.interceptors.request.use(config => {
    if(config.url.substring(0,11)=='/api-doctor'){
      config.headers['x-auth-token'] = sessionStorage.clinicSessionId
    }
    a() 
    return config
}, error => {
    //请求错误时做些事
    return Promise.reject(error)
})

//添加响应拦截器   看到此处的同志 注意 不要学此方式处理数据，并不是很好。有很大的优化空间，业务应急 
service.interceptors.response.use(response => {
    a()
    let data = response.data
    if(response.status == 200){
        if(data.status == 1){         // 返回状态为1           
            return data.data===null?data:data.data
        }else{
            // 这几个接口不做错误提示
            if(response.config.url != "/clinic_wechat/api/checkDoctorIsLogin"&&response.config.url != "/api-doctor/doctor/orderComment/doctorinfo"){
                Toast(data.msg)
            }
            let res = parseError(data)
            return response.data
        }
    }else{
        let res = parseError(data)
        return Promise.reject(res)
    }
}, error => {
    let res = parseError(error)
    return Promise.reject(res)
})

let parseError = (error) =>{
    let result = {};
    if(error.message){
        result.info = error.message
    }else if(!_this.$utils.empty(error.msg)){
        result.info = error.msg;
    }else{
        result.info = '系统繁忙'
    }
    return result;
}
let get= (url,data,config)=>{
    config = config || {};
    config.params = data;
    let p = service.get(url,config);
     
    if(_this.$utils.empty(config) || _this.$utils.empty(config.cancleCatch)){
        p.catch((error)=>{
            Toast(error.info || '网络繁忙 请稍后再试')
        });
    }
    return p;
}
let post= (url,data,config)=>{
    let p = null
    // 是否取消qs
    if(url=='/clinic_file/web/file/info'){  //文件上传除外
        p = service.post(url,data,config);
    }else if(config && config.cancelQs){
        p = service.post(url,data, config);
    }else{
        p = service.post(url,Qs.stringify(data),config);
    }

    // 取消catch里面的操作
    if(!config || !config.cancelCatch){
        p.catch((error)=>{
            Toast(error.info || '网络繁忙 请稍后再试')
        });
    }
    return p;
}
let put= (url,data,config)=>{
    let p = null
    let params = new URLSearchParams()
    for (let item in data){
       params.append(item,data[item])
    }
    p = service.put(url,params,config);
    if(_this.$utils.empty(config) || _this.$utils.empty(config.cancleCatch)){
        p.catch((error)=>{
            Toast(error.info || '网络繁忙 请稍后再试')
        });
    }
    return p;
}
function a(){
    console.log([
        "                   _ooOoo_",
        "                  o8888888o",
        "                  88\" . \"88",
        "                  (| -_- |)",
        "                  O\\  =  /O",
        "               ____/`---'\\____",
        "             .'  \\\\|     |//  `.",
        "            /  \\\\|||  :  |||//  \\",
        "           /  _||||| -:- |||||-  \\",
        "           |   | \\\\\\  -  /// |   |",
        "           | \\_|  ''\\---/''  |   |",
        "           \\  .-\\__  `-`  ___/-. /",
        "         ___`. .'  /--.--\\  `. . __",
        "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
        "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
        "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
        "======`-.____`-.___\\_____/___.-`____.-'======",
        "                   `=---='",
        "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
        "         佛祖保佑       永无BUG"
    ].join('\n'));
}
export default {
    get,
    post,
    put
}
