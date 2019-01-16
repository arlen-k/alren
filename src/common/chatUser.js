   this.$nextTick(function () {//聊天
            layui.use('layim', function(layim){
                //基础配置
                layim.config({

                    init: {
                        mine: {
                            username: "远程支持", //我的昵称
                            id: "100000123", //我的ID
                            status: "online", //在线状态 online：在线、hide：隐身
                            remark: "在医生的角度里我无可匹敌", //我的签名
                            avatar:'/static/img/qun.3dbd731.png'
                        },
                        friend: [{
                            groupname: "妇科",
                            id: 1,
                            online: 2,
                            list: [{
                                    username: "彭芝兰医生",
                                    id: "100001",//  /static/img/1.11c653f.png
                                    avatar:"http://upload.motherchildren.com/2018/0504/20180504015853448.jpg",
                                    sign: "在医生的角度里我无可匹敌"
                                },
                                {
                                    username: "杨延林医生",
                                    id: "108101",//   /static/img/2.9abb916.png
                                    avatar: "http://upload.motherchildren.com/2018/0504/20180504015922778.jpg",
                                    sign: "在医生的角度里我无可匹敌"
                                },
                                {
                                    username: "王红静医生",
                                    id: "168168",
                                    avatar:"http://upload.motherchildren.com/2018/0504/20180504015851602.jpg",//  /static/img/3.137a68f.png
                                    sign: "在医生的角度里我无可匹敌",
                                    status: "offline"
                                }]
                            },
                            {
                                groupname: "儿科",
                                id: 2,
                                online: 3,
                                list: [{
                                        username: "刘宏伟医生",
                                        id: "121286",//   /static/img/4.fa37d47.png
                                        avatar: "http://upload.motherchildren.com/2018/0504/20180504020300992.jpg",
                                        sign: "在自己实力不济的时候，不要去相信什么媒体和记者。他们不是善良的人，有时候候他们的采访对当事人而言就是陷阱"
                                    },
                                    {
                                        username: "谭世桥医生",
                                        id: "10034001",//  /static/img/5.b4a7e88.png
                                        avatar: "http://upload.motherchildren.com/2018/0504/20180504020259257.jpg",
                                        sign: "在医生的角度里我无可匹敌"
                                    }]
                                }],
                            group: [{
                                groupname: "医生群",
                                id: "101",
                                avatar: "/static/img/小界面.17df033.png"
                            },
                            {
                                groupname: "同病患者群",
                                id: "102",
                                avatar: "/static/img/9.f55bc92.png"
                            }]
                        },



                    title: '远程支持',//自定义主面板最小化时的标题
                    right: '50px', //主面板相对浏览器右侧距离
                    minRight: '50px', //聊天面板最小化时相对浏览器右侧距离
                    min: true, //是否始终最小化主面板，默认false
                    notice: false, //是否开启桌面消息提醒，默认false

                });

            })
        })
