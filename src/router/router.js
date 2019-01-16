const route = [{
    name:'login',
    path:'/login',
    component:resolve => require(['../components/Login.vue'],resolve)
},{
    name:'index',
    path:'',
    component:resolve => require(['../components/index.vue'],resolve),
    children:[{
        //控制台
        name:[0],
        path:'/console',
        component:resolve => require(['../components/console/index.vue'],resolve),
    },{
        //应用管理
        name:[1],
        path:'/app',
        component:resolve => require(['../components/application/index.vue'],resolve), 
        children:[{
            name:[1,0],
            path:'/app/audit',
            component:resolve => require(['../components/application/auditList.vue'],resolve), 
        },{
            name:[],
            path:'/app/auditDetail/:type', 
            component:resolve => require(['../components/application/auditDetail.vue'],resolve), 
        },{
            name:[1,1],
            path:'/app/list',
            component:resolve => require(['../components/application/repository.vue'],resolve), 
        },{
            name:[1,2],
            path:'/app/add',
            component:resolve => require(['../components/application/addApp.vue'],resolve), 
        },{
            name:[1,3],
            path:'/app/detail',
            component:resolve => require(['../components/application/appDetail.vue'],resolve), 
        }]
    },{
      //开发者管理
        name:[2],
        path:'/developer',
        component:resolve => require(['../components/developer/index.vue'],resolve),
        children:[{
            name:[2,0],
            path:'/developer/list',
            component:resolve => require(['../components/developer/list.vue'],resolve)
        },{
            name:[2,1],
            path:'/developer/detail',
            component:resolve => require(['../components/developer/detail.vue'],resolve) 
        },{
            name:[2,2],
            path:'/developer/add',
            component:resolve => require(['../components/developer/add.vue'],resolve) 
        }]
      },{
        //开发资源管理
        name:[3],
        path:'/resource',
        component:resolve => require(['../components/resource/index.vue'],resolve),
        children:[{
            name:[3,0],
            path:'/resource/list',
            component:resolve => require(['../components/resource/list.vue'],resolve) 
        }]
    },{
        //统计报表
        name:[4],
        path:'/statistics',
        component:resolve => require(['../components/statistics/index.vue'],resolve),
        children:[{
            name:[4,0],
            path:'/statistics/distribution',
            component:resolve => require(['../components/statistics/distribution.vue'],resolve) 
        },{
            name:[4,1],
            path:'/statistics/deploy',
            component:resolve => require(['../components/statistics/deploy.vue'],resolve) 
        },{
            name:[4,2],
            path:'/statistics/run',
            component:resolve => require(['../components/statistics/run.vue'],resolve) 
        }]
    },{
        //运营管理
        name:[5],
        path:'/operate',
        component:resolve => require(['../components/operate/index.vue'],resolve),
        children:[{
            name:[5,0],
            path:'/operate/recommend',
            component:resolve => require(['../components/operate/appList.vue'],resolve) 
        },{
            name:[5,1],
            path:'/operate/gateway',
            component:resolve => require(['../components/operate/gateway.vue'],resolve)  
        },{
            name:[5,2],
            path:'/operate/notice',
            component:resolve => require(['../components/operate/notice.vue'],resolve)  
        },{
            name:[5,3],
            path:'/operate/comments',
            component:resolve => require(['../components/operate/comments.vue'],resolve)  
        }]
    },{
        //系统设置
        name:[6],
        path:'/system',
        component:resolve => require(['../components/system/index.vue'],resolve),
        children:[{
            name:[6,0],
            path:'/system/manager',
            components:resolve => require(['../components/system/managerList.vue'],resolve) 
        },{
            name:[6,1],
            path:'/system/type',
            component:resolve => require(['../components/system/managerType.vue'],resolve) 
        },{
            name:[6,2],
            path:'/system/logs',
            component:resolve => require(['../components/system/logs.vue'],resolve) 
        }]
    }]
}]


export default route
