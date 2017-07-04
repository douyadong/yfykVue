<template>
    <div class="article">      
      <div class="wk-panel">
        <businessCard photo="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2677606714,1573372941&fm=117&gp=0.jpg" name="王小五" companyName="志远地产" storeName="虹桥店" phone="18998769098"/>
      </div>
      <div class="wk-panel">
       <h1 class="article-title">{{title}}</h1>
       <h2 class="article-description"><span class="source">{{source}}</span><span class="date">{{modifiedDate}}</span><span class="visit-number"><span class="num">{{visitNumber}}</span> <span>次浏览</span></span></h2>
       <div class="article-content">
        这是文章内容！！！富文本的eee
       </div>
      </div>
       <div class="wk-panel article-comments">
          <h1 class="panel-header">评论 ({{comments && comments.length}})</h1>
          <div style="padding-left:1.5rem;padding-right:1.5rem;">
            <input type="text" v-model="commentText" style="width:100%;font-size:1.8rem;line-height:2.0"> 
            <div class="operate">
              <button class="btn" @click="cancel">取消</button><button class="btn confirm" @click="commit" :disabled="commentText.length===0">评论</button>
            </div>
          </div>
          <comment class="pannel" :items="comments"></comment>
       </div>  

       <infiniteLoading :onInfinite="onInfinite" ref="infiniteLoading"></infiniteLoading>    
    </div>   
    
</template>

<script>   
    import Vue from "vue";
    import comment from "@/components/common/comment";
    import infiniteLoading from 'vue-infinite-loading';  
    import businessCard from "@/components/common/businessCard";
    import apiDataFilter from "@/libraries/apiDataFilter";       

    export default {
      name : "learnDetailHybrid" ,
      components:{comment,infiniteLoading,businessCard},      
      data () {
          return {
            commentText:"",
            articleId:"",
            agentId:"",
            title:"这是标题",
            modifiedDate:"2014-03-05",
            visitNumber:"2536",
            source:"悟空找房",
            //comments:[],
            comments:[{
              url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2677606714,1573372941&fm=117&gp=0.jpg",
              phoneNumber:"152369***36",
              createDate:"2017-03-05",
              content:"这是评论这是评论！！！这是评论这是评论！！！这是评论这是评论！！！这是评论这是评论！！！这是评论这是评论！！！这是评论这是评论！！！这是评论这是评论！！！！"
            },{
              url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2677606714,1573372941&fm=117&gp=0.jpg",
              phoneNumber:"152369***36",
              createDate:"2017-03-05",
              content:"这是评论这是评论！！！！"
            },{
              url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2677606714,1573372941&fm=117&gp=0.jpg",
              phoneNumber:"152369***36",
              createDate:"2017-03-05",
              content:"这是评论这是评论！！！！"
            },{
              url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2677606714,1573372941&fm=117&gp=0.jpg",
              phoneNumber:"152369***36",
              createDate:"2017-03-05",
              content:"这是评论这是评论！！！！"
            },{
              url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2677606714,1573372941&fm=117&gp=0.jpg",
              phoneNumber:"152369***36",
              createDate:"2017-03-05",
              content:"这是评论这是评论！！！！"
            }],
          }
      } ,
      created() {
          //接受路由参数示范
          //console.log("文章id为：" + this.$route.params.id) ;
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
          this.$bigData({
            page_id:2063,
            article_id:this.articleId,
            agent_id:this.agentId
          });
      },
      methods:{
        onInfinite(){
          
          this.comments = this.comments.concat([{
              url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2677606714,1573372941&fm=117&gp=0.jpg",
              phoneNumber:"152369***36",
              createDate:"2017-03-05",
              content:"这是评论这是评论！！！这是评论这是评论！！！这是评论这是评论！！！这是评论这是评论！！！这是评论这是评论！！！这是评论这是评论！！！这是评论这是评论！！！！"
            },{
              url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2677606714,1573372941&fm=117&gp=0.jpg",
              phoneNumber:"152369***36",
              createDate:"2017-03-05",
              content:"这是评论这是评论！！！！"
            },{
              url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2677606714,1573372941&fm=117&gp=0.jpg",
              phoneNumber:"152369***36",
              createDate:"2017-03-05",
              content:"这是评论这是评论！！！！"
            },{
              url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2677606714,1573372941&fm=117&gp=0.jpg",
              phoneNumber:"152369***36",
              createDate:"2017-03-05",
              content:"这是评论这是评论！！！！"
            },{
              url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2677606714,1573372941&fm=117&gp=0.jpg",
              phoneNumber:"152369***36",
              createDate:"2017-03-05",
              content:"这是评论这是评论！！！！"
            }]);
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
        },
        cancel(){
          this.commentText = "";
        },
        commit(){
          apiDataFilter.request({
            apiPath:"common.commitComment",
            successCallback:function(res){
              
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
