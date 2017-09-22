<template>
   <div class="all-comments wk-panel">
       <!--<div class="comment-all-info panel-body" v-for="(item,index) in comments" :key="index">
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
        <infiniteLoading :onInfinite="onInfinite" ref="infiniteLoading">
            <span slot="no-more"></span>
       </infiniteLoading>    -->
       123
   </div>
   
</template>

<script>
    import infiniteLoading from "vue-infinite-loading"; 
    import apiDataFilter from "@/libraries/apiDataFilter";   
    import $ from "jquery";    
    export default{
        name:"guestAllComments",
        components: { infiniteLoading },
        data(){
            return{
                articleId:this.$route.params.id,
                cityId:this.$route.query.cityId,
                agentId:this.$route.query.agentId, 
                comments:[],
                pageInfo:{
                    pageIndex:0,
                    pageSize:10,
                    total:0
                },
            }
        },
        // methods:{
        //      onInfinite(){
        //         this.fetchComments(); 
        //     },
        //     // 获取所有评论信息；
        //     fetchComments(){//获取评论数据
        //         let self = this;
        //         apiDataFilter.request({
        //         apiPath:"learn.comments",
        //         data:{
        //             articleId:this.articleId,
        //             pageIndex:this.pageInfo.pageIndex,
        //             pageSize:this.pageInfo.pageSize,
        //         }, 
        //         successCallback:function(res){
        //             let data = res.body;   
        //             console.log(1);             
        //             self.pageInfo.pageIndex += (data.data&& data.data.length || 0);
        //             self.comments = self.comments.concat(data.data);
        //             self.pageInfo.total = data.count;
        //             self.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');  
        //             if(self.comments.length === data.count){
        //             self.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        //             }             
        //             } 
        //         });
        //     }
        // }
    }
</script>

<style lang="less" scoped>
// @import "../../../less/estate/comments.less";
</style>

