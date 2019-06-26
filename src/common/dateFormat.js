let week = {         
    "0" : "日",         
    "1" : "一",         
    "2" : "二",         
    "3" : "三",         
    "4" : "四",         
    "5" : "五",         
    "6" : "六"        
};   
/** 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、毫秒(S)、周(E)、季度(q)
    特别说明(样例)：
    E:周三
    EE:星期三
    q季度:3季度
    Q季度:三季度
    S:12
    SSS:012

    dateFormat(new Date(),"yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.32
 *  dateFormat(new Date(),"yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 周二 20:09:04        
 *  dateFormat(new Date(),"yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 *  dateFormat(new Date(),"yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */
let format = (date,format)=>{
    if(!format){
        throw Error("format无效"+format);
    }
    if(!date){
        return "";
    }
    if(date instanceof Date){
    }else if(!isNaN(date)){
        if(typeof(date) == "string"){
            date = parseInt(date);
        }
        date = new Date(date);
    }else{
        return "";
    }
    let o = {         
        "M+" : date.getMonth()+1, //月份         
        "d+" : date.getDate(), //日         
        "h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时         
        "H+" : date.getHours(), //小时         
        "m+" : date.getMinutes(), //分         
        "s+" : date.getSeconds(), //秒         
    };
    let s={
        "q" : Math.floor((date.getMonth()+3)/3), //季度
        "S" : date.getMilliseconds() //毫秒  
    }
    let Q = {
        "1" : "一",         
        "2" : "二",         
        "3" : "三",         
        "4" : "四"
    }
    //解析日期
    //年
    if(/(yyyy+)/.test(format)){
        format=format.replace(RegExp.$1, date.getFullYear()+"");    
    }
    if(/(yy+)/.test(format)){
        let fullYear = date.getFullYear();
        if(fullYear<1000 && fullYear>9999){
            throw "当前yy格式接受年份范围为[1000-9999]";
        }
        format=format.replace(RegExp.$1, (fullYear+"").substr(2));    
    }
    //星期      
    if(new RegExp("(EE)").test(format)){    
        format=format.replace(RegExp.$1, "星期"+week[date.getDay()+""]);         
    }
    if(new RegExp("(E)").test(format)){    
        format=format.replace(RegExp.$1, "周"+week[date.getDay()+""]);         
    }
    //季度
    if(new RegExp("(q)").test(format)){
        format=format.replace(RegExp.$1, s.q);
    }
    if(new RegExp("(Q)").test(format)){
        format=format.replace(RegExp.$1, Q[s.q]);        
    }
    //毫秒
    if(new RegExp("(SSS)").test(format)){
        let v = s.S;
        if(v<10){
            v = "00"+v;
        }else if(v<100){
            v="0"+v;
        }
        format=format.replace(RegExp.$1, v);        
    }
    if(new RegExp("(S)").test(format)){
        let v = s.S;
        format=format.replace(RegExp.$1, v);        
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(format)){ 
            format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }
    }
    return format;
}
export default{
    format:format
}