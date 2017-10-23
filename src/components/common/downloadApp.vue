<template>
    <div class="download-app">
        <dl>
            <dt><i class="iconfont icon-logotuxing"></i></dt>
            <dd>找对人，买好房</dd>
            <dd>就在悟空找房！</dd>
        </dl>
        <a href="javascript:;" class="wk-btn wk-btn-transparent wk-btn-xs" @click="wakeup" :data-bigdata="downloadBigDataParams">下载APP</a>
    </div>
</template>

<script>
    import WakeupApp from "@/libraries/wakeupApp.js" ;
    export default {
        name : "downloadApp" ,
        data () {
            return {}
        } ,
        props:["downloadBigDataParams"],
        methods : {
            wakeup : function() {
                new WakeupApp({
                    androidSchemes : "wkzf://external_call" ,
                    isoSchemes : "wkzf://external_call" ,
                    androidDownloadLink : "//m.wkzf.com/download/transit" ,
                    iosDownloadLink : "//m.wkzf.com/download/transit"
                }) ;
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../src/less/components/downloadApp.less" ;   
</style>