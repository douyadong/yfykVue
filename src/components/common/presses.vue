<template>
    <div class="presses">
        <!--资讯遍历开始-->
        <router-link :to="'/learn/detail/share/' + press.articleId+'?agentId='+agentId" class="press" v-for="(press , index) in items" :key="press.articleId" :data-bigdata="getUvParamsString({ eventName : eventName , articleId : press.articleId , otherParams : otherParams })">
            <!--
                var articleCoverType:Int = 0 //文章封面类型1图片 2视频 3音频（板式二字段）
                var articleCoverShowOrder:Int = 0 // 板式二图文或与视频显示顺序 1纯图 2纯文 3纯视频 4纯语音 5文+图 6图+文 7文+视频 8视频+文
                var articleCoverShowType:Int = 0 //文章封面图展示类型 1:单张小图，2:单张大图，3:三张j'图片(3.6新增)
            -->
            <div class="cover" v-if="[ 1 , 3 , 6 , 8 ].indexOf(press.articleCoverShowOrder) !== -1 && press.articleCoverShowType === 2">
                <img v-lazy="press.articleCoverUrlList[0] + '?x-oss-process=image/resize,w_450'" class="img-responsive">
                <div class="play"><i></i></div>
            </div>
            <ul class="thumbs" v-if="[ 1 , 6 ].indexOf(press.articleCoverShowOrder) !== -1 && press.articleCoverShowType === 3">
                <li><img v-lazy="press.articleCoverUrlList[0] + '?x-oss-process=image/resize,w_120'"></li>
                <li><img v-lazy="press.articleCoverUrlList[1] + '?x-oss-process=image/resize,w_120'"></li>
                <li><img v-lazy="press.articleCoverUrlList[2] + '?x-oss-process=image/resize,w_120'"></li>
            </ul>
            <dl class="summary" v-if="[ 2 , 5 , 6 , 7 , 8 ].indexOf(press.articleCoverShowOrder) !== -1" :class="{ 'has-thumb' : press.articleCoverShowType === 1 }">
                <dt><img v-lazy="press.articleCoverUrlList[0] + '?x-oss-process=image/resize,w_120'" class="img-responsive"></dt>
                <dd class="title">{{ press.articleTitle }}</dd>
                <dd class="digest">{{ press.articleIntro }}</dd>
            </dl>
            <div class="cover" v-if="[ 5 , 7 ].indexOf(press.articleCoverShowOrder) !== -1 && press.articleCoverShowType === 2">
                <img v-lazy="press.articleCoverUrlList[0] + '?x-oss-process=image/resize,w_450'" class="img-responsive">
                <div class="play" v-if="press.articleCoverShowOrder == 7"><i></i></div>
            </div>
            <ul class="thumbs" v-if="press.articleCoverShowOrder === 5 && press.articleCoverShowType === 3">
                <li><img v-lazy="press.articleCoverUrlList[0] + '?x-oss-process=image/resize,w_120'"></li>
                <li><img v-lazy="press.articleCoverUrlList[1] + '?x-oss-process=image/resize,w_120'"></li>
                <li><img v-lazy="press.articleCoverUrlList[2] + '?x-oss-process=image/resize,w_120'"></li>
            </ul>
            <div class="outline top-gap">
                <div class="pull-left">{{ press.articleSource }} {{ press.publishTime}}</div>
                <div class="pull-right"><span class="pv">{{ press.viewNumStr }}</span> <span>次浏览</span></div>
            </div>            
        </router-link>
        <!--资讯遍历结束-->
    </div>
</template>

<script>
    export default {
        name : "presses" ,
        data () {
            return {}
        } ,
        methods : {
            getUvParamsString : function({ eventName , articleId , otherParams }) {
                let eventParam = { article_id : articleId } ;
                if(otherParams !== undefined && otherParams !== null ) {
                    eventParam = Object.assign( eventParam , otherParams ) ;
                }              
                return encodeURIComponent(JSON.stringify({ 
                    eventName : eventName , 
                    eventParam : eventParam ,
                    type : 2
                })) ;
            }
        } ,
        props : ["agentId", "items" , "eventName" , "otherParams" ]
    }
</script>
<style lang="less" scoped>
     @import "../../../src/less/components/presses.less" ;    
</style>
