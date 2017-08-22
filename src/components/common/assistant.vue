<template>
    <ul class="assistant" :class="{ 'no-weixin' : agent.agentWChatId === null }">
        <li :class="{bubble:true,hidden:bubbleHidden}">
            <div class="content">
                点击查看经纪人详情
            </div>
            <div class="triangle">
            </div>
        </li>
        <li class="portrait">
            <router-link :to="'/space/detail/share/' + agent.agentId+'?cityId='+cityId" :data-bigdata="portraitBigDataParams">
                <dl>
                    <dt><img :src="agent.headRoundImgUrl + '?x-oss-process=image/resize,w_40'"></dt>
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
            <a :data-bigdata="wechatBigDataParams" @click="showWX">
                <span><i class="iconfont icon-weixinkefu"></i></span>
                <span>添加微信</span>
            </a>
        </li>        
    </ul>
</template>

<script>   
    import $ from 'jquery';
    import "@/libraries/jquery.modal";
    import Clipboard from "clipboard";
    export default {
        name : "assistant" ,
        mounted(){
            $('body').one('touchstart',function(){
                $('.bubble').fadeOut();
            }).one('tap',function(){
                $('.bubble').fadeOut();
            });
        },
        data () {
            let  hidden = true;
            if(this.showBubble){
                hidden = !!localStorage.bubbleHidden;
                localStorage.bubbleHidden = true; 
            }
                       
            return {
                bubbleHidden: hidden
            }
        } ,             
        props : [ "agent" , "portraitBigDataParams" , "callBigDataParams" , "wechatBigDataParams", "copyWechatBigDataParams","cityId","showBubble" ],        
        methods:{
            showWX(){
                let self = this;
                let str = '<dl>'+
                            '<dt><img style="width:14rem" src="'+this.agent.agentWChartQRImgUrl+'"></dt>'+
                            '<dd style="color: #999999;">长按识别二维码加微信</dd>'+
                            '<dd style="color: #4E4E4E;">微信号：<span id="wechartCode">'+this.agent.agentWChatId+'</span></dd>'+
                          '</dl>';
                $.confirm({
                    "id" : "confirmDialog" ,
                    "title" : "" ,
                    "content" : str ,
                    "confirmText" : "取消" ,
                    "confirmInterface" : function() { $.modal.close("confirmDialog") ; } ,
                    "cancelText" : "复制微信号" ,
                    "cancelInterface" : function() { 
                        if(self.copyWechatBigDataParams){
                            let data = JSON.parse(decodeURIComponent(self.copyWechatBigDataParams));
                            data.type = 1;
                            console.log(data);
                            self.$bigData(data);
                        }
                        
                     } 
                });

                $('#confirmDialog .wkzf-btn:eq(1)').addClass('btn-confirm');
                $('.btn-confirm').attr('data-clipboard-target',"#wechartCode");
                var clipboard = new Clipboard('.btn-confirm');

                clipboard.on('success', function(e) {
                    console.log('xxxxxx');
                    $.tips("复制成功!",3);
                });

                clipboard.on('error', function(e) {
                    console.log('xxxxxxsdfdf');
                   $.tips("复制失败!",3);
                });
            }
        }
    }
</script>
<style lang="less">
    @import "../../../src/less/components/assistant.less" ;
    .wkzf-modal{
        width: 27rem;
        max-width:80%;          
        border-radius: 12px; 
        .wkzf-btn:nth-child(2){
            color: #FC4C5A;
            font-size: 1.6rem;
            border-left:none;
        }
    }    

    .wkzf-tips{
        z-index:9999;
    } 
</style>