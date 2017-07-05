<template>
    <div class="article">      
      <div class="wk-panel">
        <businessCard photo="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2677606714,1573372941&fm=117&gp=0.jpg" name="王小五" companyName="志远地产" storeName="虹桥店" phone="18998769098"/>
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

       <assistant :agent="null" :houseId="null" :eventName="null"></assistant>
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
        font-weight:600;
        margin-left:1.5rem;
        border:none;
      }
      .operate{
        margin-top:1.9rem;
        font-size:1.4rem;        
        color: #7C7C7C;
        text-align: right;
        .btn{
            border:none;
            background-color:white;
            &.confirm{
              padding:.4rem 1.2rem;
              border:1px solid #7C7C7C; 
              color:#7C7C7C;           
              border-radius:.2rem;
              margin-left: 3rem;
              background-color:white;
          }
        }
        
      }
    }
  }

  .comments{
      margin-top:3.4rem;
    }
</style>
