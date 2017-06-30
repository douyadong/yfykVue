<template>
    <div class="article">
      <div class="wk-panel">
       <h1 class="article-title">{{title}}</h1>
       <h2 class="article-description"><span class="source">{{source}}</span><span class="date">{{modifiedDate}}</span><span class="visit-number"><span class="num">{{visitNumber}}</span> <span>次浏览</span></span></h2>
       <div class="article-content">
        这是文章内容！！！富文本的eee
       </div>
      </div>
       <div class="wk-panel article-comments">
          <h1 class="panel-header">评论 ({{comments && comments.length}})</h1>
          <comment class="pannel" :items="comments"></comment>
       </div>  

       <infiniteLoading :onInfinite="onInfinite" ref="infiniteLoading"></infiniteLoading>    
    </div>   
    
</template>

<script>   
    import Vue from "vue";
    import comment from "@/components/common/comment.vue";
    import infiniteLoading from 'vue-infinite-loading';    

    export default {
      name : "learnDetailHybrid" ,
      components:{comment,infiniteLoading},      
      data () {
          return {
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
