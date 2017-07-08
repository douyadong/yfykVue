<template>
    <div class="article">
      <p class="not-verified" v-if="agent.agentVerifiedStatus != 1">
        请完善实名认证，分享文章将可带有您的个人名片及联系方式
      </p>
      <div class="wk-panel">
       <h1 class="article-title">{{article.title}}</h1>
       <h2 class="article-description"><span class="source">{{article.articleSource}}</span><span class="date">{{article.publishTime}}</span><span class="visit-number"><span class="num">{{article.viewNumStr}}</span> <span>次浏览</span></span></h2>
       <div class="article-content" v-html="article.content">        
       </div>
      </div>
       <div class="wk-panel article-comments">
          <h1 class="panel-header">评论 ({{pageInfo.total}})</h1>
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
    import $ from "jquery";    

    export default {
      name : "learnDetailHybrid" ,
      components:{comment,infiniteLoading},      
      data () {
          return { 
            articleId:this.$route.params.id,
            cityId:this.$route.query.cityId,
            agentId:this.$route.query.agentId,  
            agent:{
              agentVerifiedStatus: 1
            } ,         
            article:{
              title:"",
              articleSource:"",
              publishTime:"",
              viewNumStr:"",
              content:"",
              coverUrl:""
            },          
            comments:[],
            pageInfo:{
              pageIndex:0,
              pageSize:10,
              total:0
            }
          }
      } ,
      mounted(){
        //this.setArticleFont();

        //this.convertVideo();

        // 注册一个全局函数，解决android webview 中音频播放，app切换出去，音频仍在播放的问题
        window.pauseAudio = function () {
        $('audio').each(function (i, el) {
              el.pause()
            })
            $('.audio_area').removeClass('playing')
          }
        },
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
          this.$bigData({
            pageName:2061,
            pageParam:{
              article_id: this.articleId,
              agent_id: this.agentId
            },
            type:1//1-pv，2-click
          });
      },
      methods:{
        convertVideo: function() {

          let videos = $('.article-content').find('embed')
          console.log('convertvideo...',videos)
          if (!videos || !videos.length) return false
          let self = this;
          $.each(videos, function(index, item) {
            var $item = $(item)
            var coverUrl = self.article.coverUrl
            var $video, audio
            var src = $item.attr('src')
            var split = src && src.split('.')
            var type = split[split.length - 1]
            if (type.toLowerCase() === 'mp3') {
              audio = '<p class="weixinAudio">'
              audio += '<audio src="' + src + '" id="media" width="1" height="1" preload="auto"></audio>'
              audio += '<span id="audio_area" class="db audio_area">'
              audio += '<span class="audio_arrow_back"></span>'
              audio += '<span class="audio_arrow"></span>'
              audio += '<span class="audio_wrp db">'
              audio += '<span class="audio_play_area">'
              audio += '<i class="icon_audio_default"></i>'
              audio += '<i class="icon_audio_playing"></i>'
              audio += '</span>'
              audio += '<span id="audio_progress" class="progress_bar"></span>'
              audio += '</span>'
              audio += '</span>'
              audio += '<span id="audio_length" class="audio_length tips_global"></span>'
              audio += '</p>'
              $item.after($(audio))
              $item.remove()
            } else {
              $video = $('<video src="' + $item.attr('src') + '" controls="controls" width="100%">您的浏览器不支持 video 标签。</video>')
              $video.attr({
                poster: coverUrl,
                preload: 'auto'
              })
              $item.attr({
                'type': '',
                'width': '100%',
                'height': '100%'
              })
              $item.after($video)
              $item.remove()
            }            
            // $('.weixinAudio').wechatAudio({
            //   autoplay: false
            // });          
          })
        },
        setArticleFont:function(){
          //修改文章内容中写死的字体大小
          $('.article-content').find("[style*=font-size]").each(function(index,ele){
            $(ele).css('font-size',$(ele)[0].style.fontSize.replace('px','')/10  + 'rem');          
          });
        },
        onInfinite(){
          // if(this.pageInfo.total != null && this.pageInfo.pageIndex>=this.pageInfo.total){
          //   this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          //   return;
          // }          
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
                  content:data.data.articleDetailModel.content,
                  coverUrl:data.data.articleDetailModel.coverUrl
                };
                self.agent.agentVerifiedStatus = data.data.agentModel.agentVerifiedStatus;

                Vue.nextTick(()=>{
                  self.setArticleFont();              
                  self.convertVideo();
                })
              }
          });
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

<style lang="less">
@import "../../../less/learn/detail.less";
.not-verified{
  font-size:1.6rem;
  padding: 1.5rem;  
  color: maroon;
} 
</style>
