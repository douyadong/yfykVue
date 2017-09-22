<template>
   <div class="all-comments wk-panel">
       <div class="comment-all-info panel-body" v-for="(item,index) in review.comment.commentList" :key="index">
            <div class="panel-item">
                <p class="comment-phone">
                    <img src="https://imgwater.oss.aliyuncs.com/a791b7e705ed42139ae13fd4b594aa24" alt="">
                    <span>{{item.guest.guestPhoneNum}}</span>
                    <i class="iconfont icon-youpingsvg"></i>
                    <i class="iconfont icon-yezhu" v-if="item.landlord== 1"></i>
                </p>
                <h4 :data-orderLevel="item.orderLevel">{{item.comment}}</h4>
                <ul v-if="item.imgList.length">
                    <li v-for="(val,index) in item.imgList" :key="index">
                        <img :src="val" alt="" class="img-responsive">
                    </li>
                </ul>
                <p class="comment-time-like">
                    <span class="comment-time">{{item.createTimeStr}}</span>
                    <span class="click-like">
                        <i class="comment-like iconfont icon-zan" @click="clickZan($event)"></i>
                        <span class="comment-like-amount" data-zan="0">{{item.upAmount}}</span>
                    </span>
                </p>
            </div>
        </div>
        <infiniteLoading @infinite="onInfinite" ref="infiniteLoading">
            <span slot="no-more">没有更多评论了</span>
        </infiniteLoading>
   </div>
   
</template>

<script>
    export default{
        name:"guestAllComments",
        data(){
            return{

            }
        },
        created(){

        }
    }
</script>

<style lang="less" scoped>
@import "../../../less/estate/comments.less";
</style>

