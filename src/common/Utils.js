window.Log = function(type, info){
	if(typeof arguments[1]=='undefined'){
		console.log(type);
	}else{
		console.log(type, info);
	}
}

window.charLength = function(str) {
  if (str == null) return 0;
  if (typeof str != "string"){
    str += "";
  }
  return str.replace(/[^\x00-\xff]/g,"01").length;
}

export const isEmpty = function(value) {
      return (Array.isArray(value) && value.length === 0) 
          || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
    }

//日期转换
Date.prototype.format = function (format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
};

//locationStorage
export const Storage = {
		 //存储单个属性
        set :function(key,value){
            window.localStorage[key]=value;
        },
        //读取单个属性
        get:function(key,defaultValue){
            return  window.localStorage[key] || defaultValue;
        },
        remove:function(key){
            return window.localStorage.removeItem(key);
        },
        //存储对象，以JSON格式存储
        setObject:function(key,value){
            window.localStorage[key]=JSON.stringify(value);
        },
        //读取对象
        getObject: function (key) {
            return JSON.parse(window.localStorage[key] || '{}');
        }
	}

export const Trim = function(str)
    {
         return str.replace(/(^\s*)|(\s*$)/g, "");
    }

export const StrLen = function(sString) {
  var j = 0;
  var s = sString;
  if (s=="") return j;
  for (var i=0; i<s.length; i++)
  {
   if (s.substr(i,1).charCodeAt(0)>255) j = j + 2;
   else j++
  }
  return j;
}

export const Utils = {
    Storage,isEmpty,Trim,StrLen
};
