<template>
   <div class="comments-list wk-panel">
       <div class="comment-list-info panel-body" v-for="(item,index) in commentsList" :key="index">
            <div class="panel-item">
                <p class="comment-phone">
                    <img src="https://imgwater.oss.aliyuncs.com/a791b7e705ed42139ae13fd4b594aa24" alt="">
                    <span>{{item.guest.guestPhoneNum}}</span>
                    <i class="iconfont icon-youpingsvg"></i>
                    <i class="iconfont icon-yezhu yezhu" v-if="item.landlord== 1"></i>
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
                        <i class="comment-like iconfont icon-zan" :class="{isUp:item.isUp}" @click="clickZan($event)"></i>
                        <span class="comment-like-amount"  :data-zan="zan[index]">{{item.upAmount}}</span>
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
    import commentsList from "../../../../mock/estate/comment.json";
    import infiniteLoading from "vue-infinite-loading";
    import apiDataFilter from "@/libraries/apiDataFilter"; 
    import $ from "jquery";
    export default{
        name:"estateDetailComments",
        components:{infiniteLoading},
        data(){
            return{
                commentsList:commentsList,//评论信息列表
                zan:[],//实时显示data-zan属性值得变化;
                pageInfo:{
                    pageIndex:0,//评论的起始条数
                    pageSize:10,//评论信息每次加载多少条
                    total:0
                }
            }
        },
        created(){
            console.log(commentsList);
            //  为zan数组每个值赋值为0，为点赞功能实现做准备；
            if(this.commentsList.length){
                for(let i=0;i<this.commentsList.length;i++){
                    this.zan[i]=0;
                }
            };
        },
        methods:{
            clickZan(e){
                let count=$('.comment-like').index($(e.target));//获取点击哪个元素的事件源在所有该元素的下标；
                if(!this.zan[count]){
                    // 实现点赞功能；
                    this.commentsList[count].upAmount++;
                    this.zan[count]=1;
                    this.commentsList[count].isUp=1;
                }else{
                    // 取消点赞功能；
                     this.commentsList[count].upAmount--;
                     this.zan[count]=0;
                     this.commentsList[count].isUp=0;
                };
                
            },
            onInfinite(){
                this.fetchComments();
            }, 
            fetchComments(){//获取评论数据
                let self = this;
                apiDataFilter.request({
                    apiPath:"learn.comments",
                    data:{
                        articleId:this.articleId,
                        pageIndex:this.pageInfo.pageIndex,
                        pageSize:this.pageInfo.pageSize,
                    }, 
                    successCallback:function(res){
                        let data = res.body;                
                        self.pageInfo.pageIndex += (data.data&& data.data.length || 0);
                        self.comments = self.comments.concat(data.data);
                        self.pageInfo.total = data.count;
                        self.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');  
                        if(self.comments.length === data.count){
                            self.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                        }             
                    } 
                });
            }   
        }
    }
</script>

<style lang="less" scoped>
@import "../../../less/estate/comments.less";
</style>

