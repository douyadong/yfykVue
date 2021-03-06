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
        "dev" : "//10.0.18.78:8107" ,
        "test" : "//10.0.18.79:8107" ,
        "sim" : "//m.sim.wkzf" ,
        "prod" : "https://m.wkzf.com"
    } ,
    "suffix": { //后缀代表接口去掉prefix的部分，这里可以是无限级的树状结构，根据自己的需要
        "common" : {
            "bigData":"buriedPoint/sendData.rest",
        } ,
        "member" : {
            "pictVerifyCode" : "member/getVertifyCode.rest" ,
            "identifyCode" : "member/checkAndGenerateIdentifyCode.rest" ,
            "login" : "member/loginFromMobilePhone.rest" ,
            "checkLoginStatus" : "member/h5IsLogin.rest"
        } ,
        "learn" : {
            "detail" : "yfyk/quJingShareArticleDetail.rest",
            "comments": "article/queryArticleCommentList.rest",
            "commitComment":"yfyk/agentShareArticleComment.rest",
            "up" : "article/thumbUp.rest",
            "category" : "article/newsColumnList.action" ,
            "recommend" : "article/recommendList.action" ,
            "list" : "article/categoryArticleList.action"
        } ,
        "rent" : {
            // "detail" : "yfyk/getHouseRentDetailInfo.rest"
               "detail" : "yfyk/queryHouseDetailForYfyk.rest"
        } ,
        "space": {
            "detail" : "yfyk/agentInfoDetail.rest" ,
            "esf" : "yfyk/agentRecmdSecondHouseList.rest" ,
            "xf" : "yfyk/agentRecmdNewHouseList.rest" ,
            "rent" : "yfyk/agentShopRentHouseList.rest" ,
            "press" : "yfyk/agentRecmdArticleList.rest" ,
            "rate" : "yfyk/queryAgentCommentList.rest",
            "addComment":"commentAgent/h5AddComment.rest"
        },
        "esf":{
           "detail": "yfyk/getOldHouseDetailInfo.rest"
        },
        "estate":{
            "detail":"estate/yfykEstateInfo.rest"
        }
    }
} ;
