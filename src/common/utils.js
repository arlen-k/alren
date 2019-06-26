export default {
  empty(obj){
    function json(a){
        const isJson = typeof(a) == "object" &&Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
        return isJson;
    }
    if(obj === undefined || obj === null || obj === ''){
        return true;
    }else if((obj instanceof Array) || (obj instanceof Set)){
        return obj.length == 0;
    }else if(obj instanceof Map){
        return obj.size == 0;
    }else if(json(obj)){
        return Object.keys(obj).length == 0;
    }
    return false;
  },
  getDate(){
    var now = new Date()
    var Hour = now.getHours()<10?('0' + now.getHours()) : now.getHours()
    var Minutes = now.getMinutes()<10?('0' + now.getMinutes()) : now.getMinutes()
    var Seconds = now.getSeconds()<10?('0' + now.getSeconds()) : now.getSeconds()
    var Month = ((new Date()).getMonth() + 1)<10?('0' + ((new Date()).getMonth() + 1)) : (new Date()).getMonth()
    var date = (new Date()).getDate()<10?('0' + (new Date()).getDate()) : (new Date()).getDate()
    var time = Hour+':'+Minutes+':'+ Seconds
    var date = (new Date()).getFullYear() + '-' + Month + '-' + date + ' '+ time
    return  date
  },
  returnCopy(list){  //处理深浅拷贝
    let num = JSON.parse(JSON.stringify(list))
    return list
  },
  isPoneAvailable(str) {
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
        return true;
    } else {
        return false;
    }
  },
  claerFloat(val) {  //整型转换
    return Math.round(val * 100) / 100
  },
  validateNum(num) { //数字
    var reg = /^\d+(?=\.{0,1}\d+$|$)/
    if (reg.test(num)) return true;
    return false;
  },
  validatePosInteger(num) {//验证正整数
    var reg = /^\+?[1-9][0-9]*$/
    if (reg.test(num)) return true;
    return false;
  },
  positiveNumber(num) { //整数
    var reg = /^\d+$/
    if (reg.test(num)) return true;
    return false;
  },
  validateToFixed(num) {//最多两位小数的正数
    var reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
    if (reg.test(num)) return true;
    return false;
  },
  validateToZero(num) {//最多两位小数的正数或者为零
    var reg = /^\d+(?:\.\d{1,2})?$/
    if (reg.test(num)) return true;
    return false;
  },
  isEmpty(value){  //判空
    switch(typeof value){
      case 'object':
        return value == null || value == undefined || Object.keys(value).length === 0;
      case 'array':
        return value.length == 0;
      case 'string':
        return value == null || value == undefined || value == ''
      default:
        return true
    }
  },
  formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
        }
    }
    return fmt
  },
  Storage:{
    //存储单个属性
    set (key,value){
      window.localStorage[key]=value;
    },
    //读取单个属性
    get(key,defaultValue){
      return  window.localStorage[key] || defaultValue;
    },
    remove(key){
      return window.localStorage.removeItem(key);
    },
    //存储对象，以JSON格式存储
    setObject(key,value){
      window.localStorage[key]=JSON.stringify(value);
    },
    //读取对象
    getObject(key) {
      return JSON.parse(window.localStorage[key] || '{}');
    }
  },
  Session:{
    //存储session信息
    set(key,value){
      window.sessionStorage[key]=value;
    },
    //读取单个属性
    get(key,defaultValue){
      return  window.sessionStorage[key] || defaultValue;
    },
    remove(key){
      return window.sessionStorage.removeItem(key);
    },
    //存储对象，以JSON格式存储
    setObject(key,value){
      window.sessionStorage[key]=JSON.stringify(value);
    },
    //读取对象
    getObject(key) {
      return JSON.parse(window.sessionStorage[key] || '{}');
    }
  },
  clearStorage(){
    sessionStorage.clear()
  }
}