<template>
    <ul class="assistant" :class="{ 'no-weixin' : agent.agentWChatId === null }">
        <li class="portrait">
            <router-link :to="'/space/detail/share/' + agent.agentId" :data-bigdata="portraitBigDataParams">
                <dl>
                    <dt><img :src="agent.agentHeadImgUrl + '?x-oss-process=image/resize,w_40'"></dt>
                    <dd class="agent-name">{{ agent.agentName }}</dd>
                    <dd class="agent-tel">{{ agent.agentBelongToCompanyName }}</dd>
                </dl>
            </router-link>
        </li>    
        <li class="tools">
            <a :href="'tel:' + agent.agentMobile" class="bigdata-btn" :data-bigdata="callBigDataParams">
                <span><i class="iconfont icon-kefurexian"></i></span>
                <span>电话咨询</span>
            </a>
        </li>        
        <li class="tools">
            <router-link :to="'/weixin/add?wechatid=' + agent.agentWChatId + '&wechatqr=' +  encodeURIComponent(agent.agentWChartQRImgUrl)" :data-bigdata="wechatBigDataParams">
                <span><i class="iconfont icon-weixinkefu"></i></span>
                <span>添加微信</span>
            </router-link>
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