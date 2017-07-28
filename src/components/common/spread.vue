<template>
    <div class="spread">
        <img  src="../../assets/spread.png" class="img-responsive">
        <a href="javascript:;" class="generate" @click="generate" data-clipboard-text="">生成我的个人品牌形象文章</a>
    </div>
</template>

<script>   
    import Clipboard from "clipboard" ; 
    import $ from "jquery" ;
    import "@/libraries/jquery.modal" ;    
    export default {
        name : "spread" ,
        data () {
            return {
                
            }
        } , 
        props : [ "title" ] ,
        methods : {
            generate() {
                let clipboardContent = { "url" : encodeURIComponent(window.location.href.replace( "share" , "hybrid" )) , "title" : this.title } ;
                //先设置按钮的data-clipboard-text属性
                $(".generate").attr("data-clipboard-text" , JSON.stringify(clipboardContent)) ;     
                let clipboard = new Clipboard(".generate") ;
                clipboard.on("success" , function(e) {                                 
                    $.modal({
                        "id" : "spreadSuccessDialog" ,
                        "title" : "提示信息" ,
                        "content" : "已获取该文章链接打开有房有客将自动进入该文章，分享后即可生成您个人品牌形象的文章，快去试试吧~" ,                        
                        "buttons" : [
                            { "text" : "我知道了" , "clickInterface" : function(){ $.modal.close("spreadSuccessDialog") ; } }                             
                        ]
                    }) ;
                }) ;
                clipboard.on("error" , function(e) {
                   $.modal({
                        "id" : "spreadErrorDialog" ,
                        "title" : "提示信息" ,
                        "content" : "<p>长按复制下面的链接后打开有房有客，可自动进入该文章，分享后即可生成您个人品牌形象的文章~</p><br><p style=\"word-wrap:break-word\">" + JSON.stringify(clipboardContent) + "</p>" ,
                        "buttons" : [
                            { "text" : "确定" , "clickInterface" : function(){ $.modal.close("spreadErrorDialog") ; } }                             
                        ]
                    }) ;
                }) ;
            }
         }            
    }
</script>
<style lang="less">
       @import "../../../src/less/components/spread.less" ;
</style>