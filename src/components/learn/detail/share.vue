<template>
    <div class="article">      
      <div class="wk-panel">
        <businessCard :agent="agent" :cityId="cityId" :data-bigdata='getBigDataParamStr(2063001,{c_agent_id:agentId,agent_id:agentId,article_id:articleId})'/>
      </div>
      <div class="wk-panel" style="padding-bottom:1.5rem">
       <h1 class="article-title">{{article.title}}</h1>
       <h2 class="article-description"><span class="source">{{article.articleSource}}</span><span class="date">{{article.publishTime}}</span><span class="visit-number"><span class="num">{{article.viewNumStr}}</span> <span>次浏览</span></span></h2>
       <div class="article-content" v-html="article.content">
      
       </div>
       <p style="font-size:1.4rem;margin-left:1.5rem;"><i :class="{'iconfont':true,'icon-zan':true,'active':article.isUp}" @click="zan"></i> {{article.thumbUpNumStr}}</p>
      </div>
       <div class="wk-panel article-comments">
          <h1 class="panel-header">评论 ({{pageInfo.total}})</h1>
          <div style="padding-left:1.5rem;padding-right:1.5rem;">
            <input type="text" v-model="commentText" style="width:100%;font-size:1.8rem;line-height:2.0"> 
            <div class="operate">
              <button class="btn" @click="cancel">取消</button><button class="btn confirm" @click="commit" :disabled="commentText.length===0||commiting">评论</button>
            </div>
          </div>
          <comment class="pannel" :items="comments"></comment>
       </div>  

       <infiniteLoading :onInfinite="onInfinite" ref="infiniteLoading">
         <span slot="no-more">
          
        </span>
       </infiniteLoading>

       <assistant :cityId="cityId" :agent="agent" :houseId="null" :eventName="null" :portraitBigDataParams='getBigDataParamStr(2063002,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})' :callBigDataParams='getBigDataParamStr(2063003,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})' :wechatBigDataParams='getBigDataParamStr(2063004,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})' :copyWechatBigDataParams='getBigDataParamStr(2063005,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})'></assistant>       
       <a v-if="isShowCall" :href="'tel:'+article.phoneNum" class="float-call"><span><i style="color:#4081D6" class="iconfont icon-kefurexian"></i></span> <span>电话咨询</span></a>       
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
            isShowCall:false,          
            agent:{

            },
            article:{
              title:"",
              articleSource:"",
              publishTime:"",
              viewNumStr:"",
              content:"",
              thumbUpNumStr:0,
              isUp:false,
              coverUrl:""
            },            
            comments:[],
            commiting:false,
            pageInfo:{
              pageIndex:0,
              pageSize:10, 
              total:0                       
            }
          }
      } ,
      mounted(){
        // //字体
        // this.setArticleFont();

        // //处理链接        
        // this.convertLink();
        
        // //处理视频
        // this.convertVideo();
        
      },
      created() {
        window.document.title = "有房有客分享";
        this.fetchArticle();          
          
          //埋点
          this.$bigData({
            pageName:2063,
            pageParam:{
              article_id: this.articleId,
              agent_id: this.agentId
            },
            type:1//1-pv，2-click
          });
      },
      methods:{
        getBigDataParamStr(eventName,eventParam){
          let obj = {
            eventName:eventName,
            eventParam:eventParam
          }

          return encodeURIComponent(JSON.stringify(obj));
        },
        getQueryString: function(params, name) {
          var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
          var r = params.match(reg) // 获取url中"?"符后的字符串并正则匹配
          var context = ''
          if (r != null)
            context = r[2]
          reg = null
          r = null
          return context == null || context == '' || context == 'undefined' ? '' : context
        },
        convertLink: function() {
          let self = this;          
          let links = $('.article-content').find('a')
          if (!links || !links.length) return false
          $.each(links, function(index, item) {
            let $item = $(item)
            let href = $item.attr('href')
            let params = href.split('?')
            let articleId, categoryId
            if (params) {
              if (params[0] === 'wkzf://discovery/parameter?articleId=') {
                if (params[1]) {
                  articleId = self.getQueryString(params[1], 'articleId')
                  $item.attr('href', '/article/app-share.' + articleId + '.html')
                }
              } else if (params[0] === 'wkzf://discovery/parameter?categoryId=') {
                if (params[1]) {
                  categoryId = self.getQueryString(params[1], 'categoryId')
                  $item.attr('href', '/category/app.' + categoryId + '.html?cityId=' + self.cityId)
                }
              }
            }
          })
        },
        convertVideo: function() {
          let videos = $('.article-content').find('embed')
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
            $('.weixinAudio').wechatAudio({
              autoplay: false
            });
          })
        },
        setArticleFont:function(){
          //修改文章内容中写死的字体大小
          $('.article-content').find("[style*=font-size]").each(function(index,ele){
            $(ele).css('font-size',$(ele)[0].style.fontSize.replace('px','')/10  + 'rem');          
          });
        },
        onInfinite(){         
          this.fetchComments();        
        },
        fetchArticle(){//获取文章内容
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
                  thumbUpNumStr:parseInt(data.data.articleDetailModel.thumbUpNumStr)||0,
                  coverUrl:data.data.articleDetailModel.coverUrl,
                  phoneNum:data.data.articleDetailModel.phoneNum
                };   
                self.isShowCall = !!data.data.articleDetailModel.phoneNum; 
                self.agent = data.data.agentModel;
                if(data.data.articleDetailModel.shareTitle){
                  window.document.title = data.data.articleDetailModel.shareTitle;
                }                

                self.$wechatShare({
                  "title" : data.data.articleDetailModel.shareTitle ,
                  "timelineTitle" : data.data.articleDetailModel.shareTitle ,
                  "content" : data.data.articleDetailModel.shareContent ,
                  "imgUrl" : data.data.articleDetailModel.shareImageUrl ,
                  "linkUrl": data.data.articleDetailModel.shareLinkUrl,
                  "complete":function(){
                    
                  }
                });

                        //字体
        /*self.setArticleFont();

        //处理链接        
        self.convertLink();
        
        //处理视频
        self.convertVideo();*/

        Vue.nextTick(()=>{
          self.setArticleFont();
          self.convertLink();
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
        },
        cancel(){//取消评论，清空评论输入框
          this.commentText = "";
        },
        commit(){//提交评论
          let self = this;
          this.commiting = true;
          apiDataFilter.request({
            apiPath:"learn.commitComment",
            data:{
              articleId: this.articleId,
              comment: this.commentText
            },
            successCallback:function(res){
              self.commentText = "";
              self.commiting = false;
              $.tips("评论成功！！",1,function(){
                self.pageInfo.pageIndex=0;
                self.comments = [];
                self.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');                
              });
            },
            errorCallback:function(){
              self.commiting = false;
            }
          });
        },
        zan(){//点赞
          let self = this;
          if(self.article.isUp){
            return;
          }
          apiDataFilter.request({
            apiPath:"learn.up",
            data:{
              articleId: this.articleId              
            },
            successCallback:function(res){
              self.article.isUp = true;
              self.article.thumbUpNumStr=(self.article.thumbUpNumStr||0)+1;
            },
          });
        }
      }
    }
</script>

<style lang="less">
@import "../../../less/learn/detail.less"; 
.comments{
    margin-top:3.4rem;
}

.iconfont.active{
  color:#92A7C3 ;
}

.float-call{
  position:fixed;
  bottom:8rem;
  right:1.5rem;
  background-color:white;
  text-align: center;
  box-shadow: 0 2px 3px 0;
  border-radius: 3px;
  font-size:1rem;
  line-height:1.4;
  width:5rem;
  padding-top:0.8rem;
  padding-bottom:0.2rem;
  &:active, &:focus, &:link, &:visited{
    color:#4e4e4e;
  }
  *{
    display:block
  }
}

input{
  border: 1px solid #ccc;
}
</style>
