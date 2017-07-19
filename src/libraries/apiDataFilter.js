/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：yfyk
2. 文件名：src -> libraries -> apiDataFilter.js
3. 作者：zhaohuagang@lifang.com
4. 备注：请求api接口获取数据
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
加载相关资源
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import Vue from "vue" ;
import apiConf from "../configs/api" ;
import $ from 'jquery';
import '@/libraries/jquery.tips';
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
apiDataFilter的定义
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
let apiDataFilter =  {    
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    请求数据 , successCallback的唯一参数为：response，返回的json数据应该这样取得：response.body
    @method : get | post | jsonp
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    request({ apiPath , data = {} , method = "get" , contentType , jsonp = "callback" , successCallback , errorCallback}) {
        let apiUrl = this.pathToUrl(apiPath) ;
        method =  method.toLowerCase() ;
        let opts = {
            "timeout" : apiConf.timeout
        } ;
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        如果启用jsonp模式，而且如果设置了jsonp参数
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/ 
        if( method === "jsonp" && jsonp !== "" && jsonp !== undefined ) opts.jsonp = jsonp ;
        if(method === "post")  {
            if(contentType) opts.headers["content-type"] = contentType ;
            opts.body = data ;        
        }
        else opts.params = data ;
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        不是生产环境在控制台输出请求log
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/ 
        if(this.getEnv() !== "prod") {
            console.log("http请求(" + apiUrl + ")后端接口数据("+method+")：" + JSON.stringify(data)) ;
        }        
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        发起请求
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        console.log(errorCallback);
        errorCallback = errorCallback || this.errorCallback;
        Vue.http[method](apiUrl , opts ).then( (res) => {
            let status = parseInt(res.body.status , 10) ;
            if(status === apiConf.successStatusCode) successCallback(res) ;
            else {errorCallback(res&&res.body&&res.body.message)} ;
        } , errorCallback) ;        
    } ,
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    通过域名来获取当前阶段环境
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    getEnv() {
        let env = "test" ;
        let domain = document.domain ;
        switch (domain) {
            case "myfyk.test.wkzf" :
                env = "test" ;
                break ;
            case "myfyk.sim.wkzf" :
                env = "sim" ;
                break ;
            case "m.yfyk365.com" :
                env = "prod" ;
                break ;
            default :
                env = "dev" ;
                break ;
        }
        return env ;
    } ,
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    请求错误处理方法
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    errorCallback(res) {        
        //console.log("API error") ;
        
        $.tips(res || "网络错误，请重试^_^",3);
    } ,
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    根据apiPath返回apiUrl
    @apiPath：从api配置中suffix往下层写如："example.rent.detail"
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    pathToUrl(apiPath) {
        let pathArray = apiPath.split(".") ;
        let prefix = apiConf.prefix[this.getEnv()] ;
        let suffix = apiConf.suffix ;
        for(let n = 0 ; n < pathArray.length ; n ++) {
            suffix = suffix[pathArray[n]] ;
        }
        if(suffix === undefined) suffix = "" ;
        return prefix + "/" + suffix ;
    }   
     /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    整个工具定义结束
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
}

export default apiDataFilter ;
