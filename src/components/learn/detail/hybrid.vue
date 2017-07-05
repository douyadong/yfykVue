<template>
    <div class="article">
      <div class="wk-panel">
       <h1 class="article-title">{{article.title}}</h1>
       <h2 class="article-description"><span class="source">{{article.articleSource}}</span><span class="date">{{article.publishTime}}</span><span class="visit-number"><span class="num">{{article.viewNumStr}}</span> <span>次浏览</span></span></h2>
       <div class="article-content" v-html="article.content">        
       </div>
      </div>
       <div class="wk-panel article-comments">
          <h1 class="panel-header">评论 ({{comments && comments.length}})</h1>
          <comment class="panel" :items="comments"></comment>
       </div>  

       <infiniteLoading :onInfinite="onInfinite" ref="infiniteLoading">
         <span slot="no-more">
          
        </span>
       </infiniteLoading>    
    </div>       
</template>

<script> 
    import Vue from "vue";
    import comment from "@/components/common/comment.vue";
    import infiniteLoading from "vue-infinite-loading"; 
    import apiDataFilter from "@/libraries/apiDataFilter";       

    export default {
      name : "learnDetailHybrid" ,
      components:{comment,infiniteLoading},      
      data () {
          return { 
            articleId:this.$route.params.id,
            cityId:this.$route.query.cityId,
            agentId:this.$route.query.agentId,            
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

          });

          //埋点
          /*this.$bigData({
            page_id:2061,
            pageParam:{
              article_id:this.articleId,
              agent_id:this.agentId,
            },            
            type:1,
            page_time:Date.now()
          });*/
      },
      methods:{
        onInfinite(){
          if(this.pageInfo.total != null && this.pageInfo.pageIndex>=this.pageInfo.total){
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            return;
          }
          console.log('infinite',this.pageInfo);

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

                /*self.comments = res.articleDetailModel.commentList || [];
                self.pageInfo.pageIndex = self.comments.length;
                self.pageInfo.total = res.articleDetailModel.commentNum;*/
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
        }
      }
    }
</script>

<style lang="less" scoped>
@import "../../../less/variables.less";
.article{    
    background-color:@light-gay-background-color;
    .article-title{
      font-size:2.4rem;      
      margin-left:1.5rem;
      padding-top:2.2rem;
      line-height:1.4;
      color:@default-font-color;
      font-weight:normal;
      background-color:white;
    }
    .article-description{
      margin-top:.5rem;
      margin-left:1.5rem;
      margin-bottom:2rem;
      font-size:1.4rem;
      color:@light-font-color;
      font-weight:normal;
      background-color:white;
      .source{

      }
      .date{
        margin-left:.5rem;
      }
      .visit-number{
        float:right;
        margin-right:2rem;
        .num{
          color:@default-font-color;
        }
        
      }
    }
    .article-content{      
      background-color:white;
      padding:0 1.5rem 2.4rem 1.5rem;
    }    
    .article-comments{
      margin-top:1rem;
      h1{
        font-weight:normal;
        margin-left:1.5rem;
      }
    }
  }
</style>
