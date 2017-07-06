<template>
    <div class="presses">
        <!--资讯遍历开始-->
        <div class="press" v-for="(press , index) in items" :key="press.articleId">
            <div class="cover" v-if="[ 1 , 3 , 6 , 8 ].indexOf(press.articleCoverShowOrder) !== -1 && press.articleCoverShowType === 2">
                <img :src="press.articleCoverUrlList[0] + '?x-oss-process=image/resize,w_450'" class="img-responsive">
                <div class="play"><i></i></div>
            </div>
            <ul class="thumbs" v-if="[ 1 , 6 ].indexOf(press.articleCoverShowOrder) !== -1 && press.articleCoverShowType === 3">
                <li><img :src="press.articleCoverUrlList[0] + '?x-oss-process=image/resize,w_120'"></li>
                <li><img :src="press.articleCoverUrlList[1] + '?x-oss-process=image/resize,w_120'"></li>
                <li><img :src="press.articleCoverUrlList[2] + '?x-oss-process=image/resize,w_120'"></li>
            </ul>
            <dl class="summary" v-if="[ 2 , 5 , 6 , 7 , 8 ].indexOf(press.articleCoverShowOrder) !== -1" :class="{ 'has-thumb' : press.articleCoverShowType === 1 }">
                <dt><img :src="press.articleCoverUrlList[0] + '?x-oss-process=image/resize,w_120'" class="img-responsive"></dt>
                <dd class="title">{{ press.articleTitle }}</dd>
                <dd class="digest">{{ press.articleIntro }}</dd>
            </dl>
            <div class="cover" v-if="[ 5 , 7 ].indexOf(press.articleCoverShowOrder) !== -1 && press.articleCoverShowType === 2">
                <img :src="press.articleCoverUrlList[0] + '?x-oss-process=image/resize,w_450'" class="img-responsive">
                <div class="play"><i></i></div>
            </div>
            <ul class="thumbs" v-if="press.articleCoverShowOrder === 5 && press.articleCoverShowType === 3">
                <li><img :src="press.articleCoverUrlList[0] + '?x-oss-process=image/resize,w_120'"></li>
                <li><img :src="press.articleCoverUrlList[1] + '?x-oss-process=image/resize,w_120'"></li>
                <li><img :src="press.articleCoverUrlList[2] + '?x-oss-process=image/resize,w_120'"></li>
            </ul>
            <div class="outline top-gap">
                <div class="pull-left">{{ press.articleSource }} {{ press.publishTime}}</div>
                <div class="pull-right"><span class="pv">{{ press.viewNumStr }}</span> <span>次浏览</span></div>
            </div>            
        </div>
        <!--资讯遍历结束-->
    </div>
</template>

<script>
    export default {
        name : "presses" ,
        data () {
            return {
                
            }
        } ,
        props : ["items"]
    }
</script>
<style lang="less" scoped>
     @import "../../../src/less/components/presses.less" ;    
</style>