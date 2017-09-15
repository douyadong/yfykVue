/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：yfyk2h5
2. 文件名：src -> router -> index.js
3. 作者：zhaohuagang@lifang.com
4. 备注：系统路由
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import Vue from "vue" ;
import Router from "vue-router" ;
/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
加载路由用到的组件
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import learnDetailHybrid from "@/components/learn/detail/hybrid" ;
import learnDetailShare from "@/components/learn/detail/share" ;
import rentDetailHybrid from "@/components/rent/detail/hybrid" ;
import rentDetailShare from "@/components/rent/detail/share" ;
import spaceDetailHybrid from "@/components/space/detail/hybrid" ;
import spaceDetailShare from "@/components/space/detail/share" ;
import spaceRateWrite from "@/components/space/rate/write" ;
import spaceRateList from "@/components/space/rate/list" ;
import weixinAdd from "@/components/weixin/add" ;
import login from "@/components/login/index" ;
import esfDetailShare from "@/components/esf/detail/share"
import estateDetailShare from "@/components/estate/detail/share"
import xfDetail from "@/components/xf/detail";
/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
使用路由插件
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
Vue.use(Router) ;
/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
路由定义
@mode : hash | history，默认为hash，就是路由中域名和后面部分用#隔开，如：http://localhost:8080/#/agent，如果改成history模式，这个路由风格就变成了：
    http://localhost:8080/agent，但是这种模式需要对nginx | apache等appserver进行配置：
    Nginx 的站点设置增加：
    location / {
        try_files $uri $uri/ /index.html ;
    }
    Apache的站点设置增加：
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </IfModule>
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default new Router({
    mode : "history" ,
    routes : [
        {
            path : "/learn/detail/hybrid/:id" ,
            name : "learnDetailHybrid",
            component : learnDetailHybrid
        } ,
        {
            path : "/learn/detail/share/:id" ,
            name : "learnDetailShare",
            component : learnDetailShare
        } ,
        {
            path : "/rent/detail/hybrid/:houseId/:agentId" ,
            name : "rentDetailHybrid",
            component : rentDetailHybrid
        } ,
        {
            path : "/rent/detail/share/:houseId/:agentId" ,
            name : "rentDetailShare",
            component : rentDetailShare
        } ,
        {
            path : "/space/detail/hybrid/:agentId" ,
            name : "spaceDetailHybrid",
            component : spaceDetailHybrid
        } ,
        {
            path : "/space/detail/share/:agentId" ,
            name : "spaceDetailShare",
            component : spaceDetailShare
        } ,
        {
            path : "/space/rate/write/:agentId" ,
            name : "spaceRateWrite",
            component : spaceRateWrite
        } ,
        {
            path : "/space/rate/list/:agentId" ,
            name : "spaceRateList",
            component : spaceRateList
        } ,
        {
            path : "/weixin/add" ,
            name : "weixinAdd",
            component : weixinAdd
        } ,
        {
            path : "/login" ,
            name : "login",
            component : login
        },{
            path: "/esf/detail/share/:houseId/:agentId/:cityId",
            name: "esfDetailShare",
            component: esfDetailShare
        },{
            path:"/estate/detail/share",
            name:"estateDetailShare",
            component:estateDetailShare
        },{
        path: "/newHouseDetail",
        name: "newHouseDetail",
        component: xfDetail
      }
    ]
}) ;
