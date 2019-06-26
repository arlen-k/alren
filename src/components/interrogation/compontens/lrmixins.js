let mixin={
   methods:{
    lookImg(url){
      this.$emit('lookImg',url)
    },
    playVoice(localId){
      this.$emit('playVoice',localId)
    },
    stop($event){
        voicePlayUtil.stop($event, this.info);
    },
    ended(){
        voicePlayUtil.ended(this.info);
    },
    
   }
}
export default mixin;