<template>
  <div class="xf-comments">
    <div class="base"></div>
    <div class="wk-panel  comments">
      <!--<p class="status-name">用户评论 <span>{{getInfoData.commentsData.amount}} <i class=" iconfont icon-arrowR"></i></span></p>-->
      <div class="comments-detail">
        <div class="single-comment first-comment" v-for="(singleComment , index ) in getInfoData.commentsData.commentList" :key="singleComment.id"  >
          <div class="comments-top">
            <img src="../../assets/default_head_img.png" :alt="singleComment.guest.avatar.imgType">
            <span>{{singleComment.guest.guestPhoneNum}}</span>
            <i class="iconfont icon-youpingsvg" v-if="singleComment.orderLevel == 10"></i>
            <i class="iconfont icon-yezhu" v-if="singleComment.landlord== 1"></i>
          </div>
          <div class="comment-content">
            <p>{{singleComment.comment}}</p>
          </div>
          <p class="time">{{singleComment.createTimeStr}} <span><i class="iconfont icon-zan "></i>{{singleComment.upAmount}}</span></p>
        </div>
        <!--<a class="more-status">我来点评</a>-->
      </div>
    </div>
    <infiniteLoading @infinite="onInfinite" ref="infiniteLoading">
      <span slot="no-more"></span>
    </infiniteLoading>
  </div>
</template>

<script>
  import data from '../../../mock/xf/detail';
  import infiniteLoading from "vue-infinite-loading";
  import apiDataFilter from "@/libraries/apiDataFilter";
  export default {
    name: "xfComments",
    components: { infiniteLoading },
    data() {
      return {
        articleId: this.$route.params.id,
        getInfoData:{
          commentsData: data.data.comment
        },
        pageInfo:{
          pageIndex:0,
          pageSize:10,
          total:0
        },
      }
    },
    methods:{
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
            self.pageInfo.pageIndex += (data.data && data.data.length || 0);
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
<style lang="less">
  @import "../../../src/less/xf/comments.less" ;
</style>
