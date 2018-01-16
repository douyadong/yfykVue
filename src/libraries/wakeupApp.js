/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：yfyk
2. 文件名：src -> libraries -> wakeupApp.js
3. 作者：zhaohuagang@lifang.com
4. 备注：唤醒APP
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import $ from "jquery" ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
WakeupApp类的定义
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
class WakeupApp {
    constructor({ androidSchemes , isoSchemes , androidDownloadLink , iosDownloadLink }) {
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        地址配置
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.opts = {
            androidSchemes : androidSchemes ,
            isoSchemes : isoSchemes ,
            androidDownloadLink : androidDownloadLink ,
            iosDownloadLink : iosDownloadLink
        } ;        
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        ua的值
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.ua = navigator.userAgent ; 
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        全局的定时器
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.timeout = null ;
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        全局的超时时间
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.t = 1000 ;
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        是否安装app标志
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.hasApp = true ;
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        初始化
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.init() ;
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    初始化
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    init() {
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        判断是否为微信,如果为微信，则退出
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        if (this.browser() == "wechat") {
            alert("请在手机浏览器里打开！") ;
            return ;
        }
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        打开跳转链接
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.openDownloadLink() ;
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        是否安装app标志
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.isHasApp() ;
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    打开跳转链接
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    openDownloadLink() {        
        window.setTimeout(() => {
            let browser = this.browser() ;
            let downloadUrl = "" ;
            if (browser === "ios") downloadUrl = this.opts.iosDownloadLink ;
            else if (browser === "android") downloadUrl = this.opts.androidDownloadLink ;
            if ( ! this.hasApp) {
                top.window.location = downloadUrl ;
                console.log("未安装") ;
            } 
            else console.log("已安装") ;
        } , 2000) ;
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    本地是否安装app
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    isHasApp () {        
        let ifr = $('<iframe id="ifr"></iframe>') ;
        let browser = this.browser() ;
        let t1 = Date.now() ;
        if (browser === "ios") window.open(this.opts.isoSchemes) ;
        else if (browser == "android") ifr.attr("src", this.opts.androidSchemes) ;
        $("body").append(ifr) ;
        this.timeout = window.setTimeout(() => {
            this.tryToOpenApp(t1) ;
        } , this.t ) ;
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    tryToOpenApp
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    tryToOpenApp(t1) {
        let t2 = Date.now() ;
        if (! t1 || t2 - t1 < this.t + 200) {
            this.hasApp = false ;
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    检测浏览器类型
    1.wechat :微信
    2.ios：苹果系统
    3.android ：安卓系统
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    browser() {
        let browser = "" ;
        if (this.ua.match(/MicroMessenger/i)) {
            browser = "wechat" ;
        }
        else if (this.ua.match(/(iPhone|iPod|iPad);?/i)) {
            browser = "ios" ;
        }
        else if (this.ua.match(/android/i)) {
            browser = "android" ;
        }
        return browser ;
    }

}

export default WakeupApp ;