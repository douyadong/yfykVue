<template>
    <div class="essays">
        <!--开始遍历咨询列表
            var coverType:Int = 0 //文章封面类型1图片 2视频 3音频（板式二字段）
            var articleCoverShowOrder:Int = 0 // 板式二图文或与视频显示顺序 1纯图 2纯文 3纯视频 4纯语音 5文+图 6图+文 7文+视频 8视频+文
            var articleCoverType:Int = 0 //文章封面图展示类型 1:单张小图，2:单张大图，3:三张j'图片(3.6新增)
        -->
        <router-link :to="{ path : '/learn/detail/share/' + essay.articleId , query : { openId : pageStates.openId } }" class="essay-item top-gap" v-for="( essay , index ) in items" :key="essay.articleId">             
            <div class="cover" v-if="[ 1 , 3 , 6 , 8 ].indexOf(essay.articleCoverShowOrder) !== -1 && essay.articleCoverType === 2">
                <img :src="essay.articleCoverUrlList[0] + '?x-oss-process=image/resize,w_450'" class="img-responsive">
                <div class="play"><i></i></div>
            </div>            
            <ul class="thumbs" v-if="[ 1 , 6 ].indexOf(essay.articleCoverShowOrder) !== -1 && essay.articleCoverType === 3">
                <li><img :src="essay.articleCoverUrlList[0] + '?x-oss-process=image/resize,w_120'"></li>
                <li><img :src="essay.articleCoverUrlList[1] + '?x-oss-process=image/resize,w_120'"></li>
                <li><img :src="essay.articleCoverUrlList[2] + '?x-oss-process=image/resize,w_120'"></li>
            </ul>
            <dl class="summary" :class="{ 'has-thumb' : essay.articleCoverType === 1 }" v-if="[ 2 , 5 , 6 , 7 , 8 ].indexOf(essay.articleCoverShowOrder) !== -1">
                <dt><img :src="essay.articleCoverUrlList[0] + '?x-oss-process=image/resize,w_120'" class="img-responsive"></dt>
                <dd class="title">{{ essay.title }}</dd>
                <dd class="digest">{{ essay.subTitle }}</dd>
            </dl>            
            <div class="cover" v-if="[ 5 , 7 ].indexOf(essay.articleCoverShowOrder) !== -1 && essay.articleCoverType === 2">
                <img :src="essay.articleCoverUrlList[0] + '?x-oss-process=image/resize,w_450'" class="img-responsive">
                <div class="play" v-if="essay.articleCoverShowOrder == 7"><i></i></div>
            </div>
            <ul class="thumbs" v-if="essay.articleCoverShowOrder === 5 && essay.articleCoverType === 3">
                <li><img :src="essay.articleCoverUrlList[0] + '?x-oss-process=image/resize,w_120'"></li>
                <li><img :src="essay.articleCoverUrlList[1] + '?x-oss-process=image/resize,w_120'"></li>
                <li><img :src="essay.articleCoverUrlList[2] + '?x-oss-process=image/resize,w_120'"></li>
            </ul>            
            <div class="outline top-gap">
                <div class="pull-left">{{ essay.articleSource }} {{ essay.showTimeStr }}</div>
                <div class="pull-right"><span class="pv">{{ essay.viewNum }}</span> <span>次浏览</span></div>
            </div>            
        </router-link>
        <!--文章遍历结束-->
    </div>
</template>

<script>     
    export default {
        name : "essays" ,      
        data () {            
            return {
                "pageStates" : {
                    "openId" : this.$route.query.openId 
                }      
            }
        } ,       
        props : [ "items" ]
    }
</script>
<style lang="less">
    @import "../../../src/less/components/essays.less" ;
</style>