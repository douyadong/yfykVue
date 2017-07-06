<template>
    <ul class="assistant" :class="{ 'no-weixin' : agent.agentWChatId === null }">
        <li class="portrait">
            <a :href="'/space/detail/share/' + agent.agentId" :data-bigdataparams="portraitBigDataParams">
                <dl>
                    <dt><img :src="agent.agentHeadImgUrl + '?x-oss-process=image/resize,w_40'"></dt>
                    <dd class="agent-name">{{ agent.agentName }}</dd>
                    <dd class="agent-tel">{{ agent.agentBelongToCompanyName }}</dd>
                </dl>
            </a>
        </li>    
        <li class="tools">
            <a :href="'tel:' + agent.agentMobile" class="bigdata-btn" :data-bigdataparams="callBigDataParams">
                <span><i class="iconfont icon-kefurexian"></i></span>
                <span>电话咨询</span>
            </a>
        </li>        
        <li class="tools">
            <a :href="'/weixin/add?wechatid=' + agent.agentWChatId + '&wechatqr=' +  encodeURIComponent(agent.agentWChartQRImgUrl)" :data-bigdataparams="wechatBigDataParams">
                <span><i class="iconfont icon-weixinkefu"></i></span>
                <span>添加微信</span>
            </a>
        </li>        
    </ul>
</template>

<script>   
    export default {
        name : "assistant" ,
        data () {
            return {
                
            }
        } ,        
        props : [ "agent" , "portraitBigDataParams" , "callBigDataParams" , "wechatBigDataParams" ]
    }
</script>
<style lang="less" scoped>
    @import "../../../src/less/components/assistant.less" ;   
</style>