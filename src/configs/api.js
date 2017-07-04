/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：yfyk2h5
2. 文件名：src -> configs -> api.js
3. 作者：zhaohuagang@lifang.com
4. 备注：由于很多应用只是把数据接口当做model层，而不是直接接触数据库，本文件提供数据接口配置
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {    
    "timeout": 60 * 1000 ,  //超时请求时间，单位：毫秒
    "successStatusCode" : 1 ,    
    "prefix" : {
        "dev" : "http://10.0.18.78:8107" ,
        "test" : "http://10.0.18.79:8107" ,
        "sim" : "http://m.sim.wkzf" ,
        "prod" : "http://www.vue.me"
    } ,
    "suffix": { //后缀代表接口去掉prefix的部分，这里可以是无限级的树状结构，根据自己的需要
        "common" : {
            "bigData":"buriedPoint/sendData.rest",
        } ,
        "learn" : {
            "detail" : "yfyk/quJingShareArticleDetail.rest",  
            "comments": "article/queryArticleCommentList.rest",  
            "commitComment":"article/commentArticle.rest"        
        } ,
        "rent" : {
            "detail" : "home.php"
        } ,
        "space": {
            "detail" : "reportPandect/getBanner.action"
        }
    }
} ;