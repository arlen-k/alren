//混合
let mixin = {
    methods:{
        //页面返回
        returnBack(){

            this.$router.go(-1);
        }

    }
};

export default mixin;
