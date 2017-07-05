<template>
    <div class="article">      
      <div class="wk-panel">
        <businessCard :agent="agent"/>
      </div>
      <div class="wk-panel">
       <h1 class="article-title">{{article.title}}</h1>
       <h2 class="article-description"><span class="source">{{article.articleSource}}</span><span class="date">{{article.publishTime}}</span><span class="visit-number"><span class="num">{{article.viewNumStr}}</span> <span>次浏览</span></span></h2>
       <div class="article-content" v-html="article.content">
      
       </div>
      </div>
       <div class="wk-panel article-comments">
          <h1 class="panel-header">评论 ({{pageInfo.total}})</h1>
          <div style="padding-left:1.5rem;padding-right:1.5rem;">
            <input type="text" v-model="commentText" style="width:100%;font-size:1.8rem;line-height:2.0"> 
            <div class="operate">
              <button class="btn" @click="cancel">取消</button><button class="btn confirm" @click="commit" :disabled="commentText.length===0">评论</button>
            </div>
          </div>
          <comment class="pannel" :items="comments"></comment>
       </div>  

       <infiniteLoading :onInfinite="onInfinite" ref="infiniteLoading">
         <span slot="no-more">
          
        </span>
       </infiniteLoading>

       <assistant :agent="agent" :houseId="null" :eventName="null"></assistant>
    </div>   
    
</template>

<script>   
    import Vue from "vue";
    import comment from "@/components/common/comment";
    import infiniteLoading from 'vue-infinite-loading';  
    import businessCard from "@/components/common/businessCard";
    import apiDataFilter from "@/libraries/apiDataFilter";       
    import $ from "jquery";
    import "@/libraries/jquery.tips.js";
    import assistant from "@/components/common/assistant";

    export default {
      name : "learnDetailHybrid" ,
      components:{comment,infiniteLoading,businessCard,assistant},      
      data () {
          return {
            commentText:"",
            articleId:this.$route.params.id,
            cityId:this.$route.query.cityId,
            agentId:this.$route.query.agentId,
            agent:{

            },
            article:{
              title:"",
              articleSource:"",
              publishTime:"",
              viewNumStr:"",
              content:""
            },            
            comments:[],
            pageInfo:{
              pageIndex:0,
              pageSize:10,
              total:null//把total==null认为是首次加载              
            }
          }
      } ,
      created() {
        this.fetchArticle();
          /*
          this.$wechatShare({
            "title" : "标题" ,
            "timelineTitle" : "标题2" ,
            "content" : "内容" ,
            "imgUrl" : "" ,
            "environment" : "prod",
            "success":function(){
              console.log('success');
            },
            "fail":function(){
              console.log('success');
            },
            "cancel":function(){
              console.log('success');
            },
            "complete":function(){
              console.log('success');
            }

          });*/

          //埋点
          /*this.$bigData({
            page_id:2063,
            article_id:this.articleId,
            agent_id:this.agentId
          });*/
      },
      methods:{
        onInfinite(){
            if(this.pageInfo.total != null && this.pageInfo.pageIndex>=this.pageInfo.total){
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            return;
          }
          

          this.fetchComments();        
        },
        fetchArticle(){
          let self = this;
          apiDataFilter.request({
            apiPath:"learn.detail",
              data:{
                cityId:this.cityId,
                articleId:this.articleId,
                agentId:this.agentId
              }, 
              errorCallback:function(){

              },
              successCallback:function(res){
                let data = res.body;
                self.article = {
                  title:data.data.articleDetailModel.title,
                  articleSource:data.data.articleDetailModel.articleSource,
                  publishTime:data.data.articleDetailModel.publishTime,
                  viewNumStr:data.data.articleDetailModel.viewNumStr,
                  content:data.data.articleDetailModel.content
                };    
                self.agent = data.data.agentModel;        
              }
          });
        },
        fetchComments(){
            let self = this;            
                      
            apiDataFilter.request({
              apiPath:"learn.comments",
              data:{
                articleId:this.articleId,
                pageIndex:this.pageInfo.pageIndex,
                pageSize:this.pageInfo.pageSize,
              }, 
              /*errorCallback:function(){
                console.log();
              },*/
              successCallback:function(res){
                let data = res.body;                
                self.pageInfo.total = data.count;
                self.pageInfo.pageIndex += (data.data&& data.data.length || 0);
                self.comments = self.comments.concat(data.data);
                console.log('data',data.data,self.pageInfo);
                self.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
              } 
            });
        },
        cancel(){
          this.commentText = "";
        },
        commit(){
          let self = this;
          apiDataFilter.request({
            apiPath:"learn.commitComment",
            data:{
              articleId: this.articleId,
              comment: this.commentText
            },
            successCallback:function(res){
              self.commentText = "";
              $.tips("评论成功！！",1,function(){
                self.pageInfo.pageIndex=0;
                self.pageInfo.total = null;
                self.comments = [];
                self.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                //self.fetchComments();
              });
            },
          });
        }
      }
    }
</script>

<style lang="less" scoped>
@import "../../../less/learn/detail.less"; 
.comments{
    margin-top:3.4rem;
}

input{
  border: 1px solid #999999;
}
</style>
