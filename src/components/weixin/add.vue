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
              wechatQrcodeUrl : "" ,
              wechatId : ""
          }
      }
    }
</script>

<style lang="less">
    @import "../../../src/less/weixin/add.less" ;   
</style>
