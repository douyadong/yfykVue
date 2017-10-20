<template>
    <dl>
        <dt><img :src="wechatQrcodeUrl"></dt>
        <dd>扫码加微信</dd>
        <dd>微信号：{{ wechatId }}</dd>
    </dl>   
</template>

<script>   
    export default {
        name : "weixinAdd" ,
        data () {
            return {
                wechatQrcodeUrl : decodeURIComponent(this.$route.query.wechatqr) ,
                wechatId : this.$route.query.wechatid
            }
        } ,
        created() {
            document.title = "买房卖房就找悟空找房" ;
            this.$nativeBridge.invokeMethod('updateTitle',['买房卖房就找悟空找房'],function(){
                console.log('更新标题成功');
            },function(){
                console.log('更新标题失败');
            });
            
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../src/less/weixin/add.less" ;   
</style>
