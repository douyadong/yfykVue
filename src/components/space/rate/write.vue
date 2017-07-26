<template>
    <div class="write-rate">
        <div class="header">
            <div class="head-portrait"><img :src="apiData.headRoundImgUrl + '?x-oss-process=image/resize,w_60'"></div>
            <h2>{{apiData.agentName}}</h2>
            <span class="good" v-if="apiData.isWellAgent== 1">好</span>
        </div>        
        <fieldset><legend>为经纪人评分</legend></fieldset>
        <div class="stars">
            <i class="iconfont icon-star" v-for="n in 5" @click="checkStar(n)"></i>            
        </div>
        <transition  name="slide-fade">
            <div class="tags" v-if="pageStates.starCount > 0 && pageStates.starCount < 4">            
                <span v-for="( tag , index ) in apiData.badTags" :data-value="tag.id" @click="checkTag">{{ tag.label }}</span>            
            </div>
        </transition>
        <transition  name="slide-fade">
            <div class="tags" v-if="pageStates.starCount > 3 && pageStates.starCount < 6">            
                <span v-for="( tag , index ) in apiData.goodTags" :data-value="tag.id"  @click="checkTag">{{ tag.label }}</span>
            </div>
        </transition>
        <textarea placeholder="经纪人的服务您还满意吗？您的评价将督促我们不断进步!" v-model="model.content"></textarea>
        <div class="switch wrap">
            <span>匿名评价</span>
            <vue-switch size="md" color="blue"
             v-model="model.nameless" open-name="" close-name="" open-value="1" close-value="0"></vue-switch>
        </div>
        <div class="submit"><button class="wk-btn wk-btn-block wk-btn-lg wk-btn-primary" @click="commit">提交评价</button></div>
    </div>
</template>

<script>
    import $ from "jquery" ;
    import Switch from 'vue-switch/switch-2';
    import apiDataFilter from '@/libraries/apiDataFilter';  
    import utils from "@/libraries/utils" ;  

    export default {
        components:{
            'vue-switch':Switch
        },
        name : "spaceRateWrite" ,
        data () {
            return {
                pageStates : {
                    starCount : 0 
                } ,
                apiData : {
                    agentName:"",//经纪人名字
                    isWellAgent:0,//是否好经纪人
                    headRoundImgUrl:"",
                    badTags : [                        
                    ] ,
                    goodTags : [                        
                    ]
                },
                currentLabels:[],
                model:{
                    nameless: false,
                    agentId:"",
                    score:0,
                    content:"",
                    commentType:3,//主动评论
                    labels:[]
                }
            }
        } ,
        created(){
            let self = this;
            this.model.agentId = this.$route.params.agentId;
            apiDataFilter.request({
                apiPath:"space.detail",
                data:{
                    agentId: this.$route.params.agentId
                },
                successCallback:function(res){
                    self.apiData = {
                        agentName:res.body.data.agentDetail.agentName,
                        isWellAgent:res.body.data.agentDetail.isWellAgent,
                        headRoundImgUrl:res.body.data.agentDetail.headRoundImgUrl,
                        badTags:res.body.data.agentDetail.tags && res.body.data.agentDetail.tags.filter(function(tag){
                            return tag.type ==2
                        }) || [],
                        goodTags:res.body.data.agentDetail.tags && res.body.data.agentDetail.tags.filter(function(tag){
                            return tag.type ==1
                        }) || []
                    };
                }
            });
        },
        methods : {
            checkStar(n) {
                let $source = $(event.target) ;

                if($source.hasClass('on')){//从当前到最后都灭掉
                    $('.stars i:gt('+(n-1)+')').removeClass('icon-star2').removeClass('on').addClass('icon-star');

                }else{//从头到当前都点亮
                    $('.stars i:lt('+n+')').removeClass('icon-star').addClass('icon-star2').addClass('on');
                }

                // if($source.hasClass('on') && n != this.pageStates.starCount){
                //     return;
                // }
                
                // if(!$source.hasClass('on') && n != this.pageStates.starCount + 1){
                //     return;
                // }

                // $source.toggleClass("icon-star").toggleClass("icon-star2").toggleClass("on") ;
                // $source.parent().siblings(".tags").children("span").removeClass("on") ;
                this.pageStates.starCount = $source.parent().children(".on").length ;
            } ,
            checkTag(event) {
                let $source = $(event.target) ;
                $source.toggleClass("on") ; 
            },
            commit(){                
                let self = this;
                utils.checkLoginStatus({ onCallback:function(){
                    let labels = [];
                    $('.tags span.on').each(function(index,ele){
                        labels.push({labelId:$(ele).data('value')});                    
                    });
                    self.model.labels = labels;
                    self.model.score = self.pageStates.starCount;
                    if(self.model.score == 0){
                        $.tips("请给经纪人打分^_^",3);
                        return;
                    }

                    apiDataFilter.request({
                        apiPath:"space.addComment",
                        method:"post",
                        data:self.model,
                        successCallback:function(res){
                            $.tips("评论成功！",3,function(){
                                self.$router.push({
                                    path:"/space/detail/share/"+self.$route.params.agentId
                                });
                            });                        
                        }
                    });
                }, offCallback:function(){
                    var href = "/space/rate/write/" + self.$route.params.agentId; 
                    self.$router.push({path:"/login?redirect=" + encodeURIComponent(href) });
                } })                     
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../less/space/rate/write.less" ; 
    .vue-switch.z-on::after{
        left:20px !important;
    }
    .vue-switch::after{
        width:25px !important;
        height:25px !important;
    }
    .vue-switch{
        height:30px !important;
    }
</style>
