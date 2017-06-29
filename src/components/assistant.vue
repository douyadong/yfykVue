<template>
    <ul class="assistant" :class="{ 'no-weixin' : agent.agentWChatId === null }">
        <li class="portait">
            <dl>
                <dt><img :src="headPortraitUrl"></dt>
                <dd class="agent-name">{{ agent.agentName }}</dd>
                <dd class="agent-tel">{{ agent.agentBelongToCompanyName }}</dd>
            </dl>
        </li>    
        <li class="tools">
            <a :data-href="mobileHref" class="bigdata-btn" :data-bigdataparams="bigDataParams">
                <span><i class="iconfont icon-kefurexian"></i></span>
                <span>电话咨询</span>
            </a>
        </li>        
        <li class="tools">
            <a :href="addWeixinPageUrl">
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
        props : {
            agent : {
                type : Object ,
                required : true
            } ,
            houseId : {
                type : Number
            } ,
            eventName : {
                type : Number ,
                required : true
            }
        } ,
        computed : {
            headPortraitUrl() {
                return this.agent.agentHeadImgUrl + "?x-oss-process=image/resize,w_40" ;
            } ,
            mobileHref() {
                return "tel:" + this.agent.agentMobile ;
            } ,
            addWeixinPageUrl() {
                return "/weixin/add?wechatid=" + this.agent.agentWChatId + "&wechatqr=" + encodeURIComponent(this.agent.agentWChartQRImgUrl) ;
            } ,
            bigDataParams() {
                return "{pageName:'',pageParam:{house_id:" + this.houseId+ "},eventName:" + this.eventName + ",eventParam:{house_id:" + this.houseId + "},nextPageName:'',nextPageParam:{},city:''}" ;
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../src/less/components/assistant.less" ;   
</style>