//使用此工具需要在data上提前初始化play和loaded参数为false

let play = (_this, e, data) => {
    data.play = true;
    data.loaded = true;
    _this.$nextTick(()=>{
        let audio = $(e.target).textarea.parentElement.nextElementSibling;
        audio.currentTime = 0;
        audio.play();
        audio.addEventListener('error',function(){
            data.play = false;
            data.loaded = false;
            //1.用户终止 2.网络错误 3.解码错误 4.URL无效
            let code = audio.error.code;
            if(code == 2){
                _this.$toast("网络异常");
            }else if(code == 3){
                _this.$toast("解码错误");
            }else if(code == 4){
                _this.$toast("无效链接");
            }
        });
    })
};
let stop = (e,data) =>{
    let audio = $(e.target).textarea.parentElement.nextElementSibling;
    audio.pause();
    data.play = false;
};
let ended = (data) => {
    data.play = false;
};
export default{
    play,
    stop,
    ended
}