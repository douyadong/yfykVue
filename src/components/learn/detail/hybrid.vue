<template>
    <div class="article">
        <p class="not-verified" v-if="(!openId)&&(agent.agentVerifiedStatus != 1)">
          请完善实名认证，分享文章将可带有您的个人名片及联系方式
        </p>
        <div class="wk-panel">
            <h1 class="article-title">{{article.title}}</h1>
            <h2 class="article-description"><span class="source">{{article.articleSource}}</span><span class="date">{{article.publishTime}}</span></h2>
            <div class="article-content" v-html="article.content"></div>
            <!-- <div class="panel-body lr-padding tb-padding"><img  src="../../../assets/spread.png" class="img-responsive"></div>   --> 
            <div class="article-statistics">
              <span class="share-num" v-if="article.shareCountStr">
                <span class="num">{{article.shareCountStr}}</span> <span>分享</span>&nbsp;&nbsp;
              </span>
              <span class="visit-num">
                <span class="num">{{article.viewNumStr}}</span> <span>浏览</span>
              </span>
            </div>         
        </div>
        <a v-if="openId&&(!agentId)" class="public-number wk-panel" :href="'http://wechatsoatest.wkzf.com/agent/weChat/verifyPlatform.action?openId='+openId+'&articleUrl='+articleUrl+'&reset=1&source=0&state=1'">
          登录后可分享文章,立即登录<span class="iconfont icon-arrowR"></span>
        </a>
        <div v-if="!openId">
          <div class="wk-panel article-comments">
            <h1 class="panel-header">评论 ({{pageInfo.total}})</h1>
            <comment class="panel" :items="comments"></comment>
          </div>
          <infiniteLoading :onInfinite="onInfinite" ref="infiniteLoading">
            <span slot="no-more"></span>
          </infiniteLoading>
       </div>    
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
            domain:'',//截取域名为了测试分享走通 
            openId:false, //用来判断是否是公众号入口 
            wxAgentId:false,//用于判断公众号是否登录;
            wxCityId:false,//公众号传递的城市Id;
            articleUrl:window.location.href,//文章页面地址
            agent:{
              agentModel:'',
              agentVerifiedStatus: 1
            } ,         
            article:{
              title:"",
              articleSource:"",
              publishTime:"",
              viewNumStr:"",
              content:"",
              coverUrl:"",
              shareCountStr:""
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
        // 注册一个全局函数，解决android webview 中音频播放，app切换出去，音频仍在播放的问题
        window.pauseAudio = function () {
        $('audio').each(function (i, el) {
              el.pause()
            })
            $('.audio_area').removeClass('playing')
          }
        },
      created() {       
          //window.document.title = "取经文章详情页";  
          this.domain=window.location.hostname ;
          this.openId=this.$route.query.openId ;//通过地址栏获取openId;
          //this.openId=this.$cookie.get('wxpipOpenId') ; //公众号的openId 
          //this.wxAgentId=this.$cookie.get('wxpipAgentId') ;  //公众号agentId，从取经列表页存储cookie获取用来判断是否登录
          console.log(this.openId);
          if(this.openID){
              if(this.$route.query.agentId){
                // 登录之后获取;
                this.wxAgentId=this.$route.query.agentId;
              }
          };
          this.wxCityId=this.$cookie.get('wxpipCityId') ; //公众号传递的cityId;
          this.fetchArticle(); 
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
        removeBlankAttr:function(){
          $('.article-content a[target=_blank]').removeAttr('target');
        },
        onInfinite(){         
          this.fetchComments();          
        },

        fetchArticle(){
          let self = this;
          apiDataFilter.request({
            apiPath:"learn.detail",
              data:{
                cityId:this.cityId||0,
                articleId:this.articleId,
                agentId:this.agentId
              }, 
              errorCallback:function(){
                
              },
              successCallback:function(res){
                let data = res.body;
                /*if(data.data.articleDetailModel.contentType == 1) {
                  window.location.href = data.data.articleDetailModel.content;
                  return;
                }*/
                self.article = {
                  title:data.data.articleDetailModel.title,
                  articleSource:data.data.articleDetailModel.articleSource,
                  publishTime:data.data.articleDetailModel.publishTime,
                  viewNumStr:data.data.articleDetailModel.viewNumStr,
                  shareCountStr: (function(shareCount){
                    if(shareCount<10000){
                      return shareCount;
                    }else{
                      let tenThousand = parseInt(shareCount/10000);
                      let thousand = parseInt(shareCount/1000%10);
                      let result = "万+";
                      if(thousand>0){
                        result = tenThousand + "." + thousand + result;
                      }else{
                        result = tenThousand + result;
                      }

                      return result;
                    }
                  })(data.data.articleDetailModel.shareCount),
                  content:data.data.articleDetailModel.content,
                  coverUrl:data.data.articleDetailModel.coverUrl
                };
                self.agent.agentVerifiedStatus = (data.data.agentModel&&data.data.agentModel.agentVerifiedStatus)||'';
                self.agent.agentModel=data.data.agentModel||'' ;
                if(data.data.articleDetailModel.title){
                  window.document.title = data.data.articleDetailModel.title;
                  self.$nativeBridge.invokeMethod('updateTitle',[data.data.articleDetailModel.title],function(){

                  },function(){});
                } 
                Vue.nextTick(()=>{
                  self.setArticleFont();              
                  self.convertVideo();
                  self.removeBlankAttr();
                })
                // 公众号入口页面是否可以分享到朋友圈或朋友;
                if(self.openId){
                  if(!self.agentId){
                    console.log('不可以分享');
                    self.$wechatShare({
                      "title" : data.data.articleDetailModel.shareTitle ,
                      "timelineTitle" : data.data.articleDetailModel.shareTitle ,
                      "content" : data.data.articleDetailModel.shareContent ,
                      "imgUrl" : data.data.articleDetailModel.shareImageUrl ,
                      "share" :true,//隐藏分享朋友圈该项
                      "linkUrl": "http://"+self.domain+"/learn/detail/share/"+self.articleId+"?agentId="+self.agentId+"&cityId="+self.cityId,
                      "complete":function(){
                    
                      }
                    });
                    wx.ready(function() {
    		              wx.hideMenuItems({
                        menuList: ["menuItem:share:appMessage","menuItem:share:timeline"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                      }); 	                    		
	                  });
                  }else{
                    // 已经登录可以分享
                    console.log(self.domain+"/learn/detail/share/"+self.articleId+"?agentId="+self.agentId+"&cityId="+self.cityId);
                    console.log(data.data.articleDetailModel.shareTitle,data.data.articleDetailModel.shareImageUrl)
                    self.$wechatShare({
                      // "title" : data.data.articleDetailModel.shareTitle ,
                      "timelineTitle" : data.data.articleDetailModel.shareTitle ,
                      // "content" : data.data.articleDetailModel.shareContent ,
                      "imgUrl" : "https://img.wkzf.com/8d4db9f8f59a40ef90ab22c03c1bd7c8" ,
                      "share" :false,//不隐藏分享朋友圈该项
                      // "linkUrl": "http://"+self.domain+"/learn/detail/share/"+self.articleId+"?agentId="+self.agentId+"&cityId="+self.cityId,//要由http或https协议
                      "complete":function(){
                    
                      }
                    });
                  }
                }
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
.public-number{
  // border-top: 1px solid @light-line-gray-color ;
  box-shadow: 0 -2px 6px 0 rgba(0,0,0,0.10);
  color:#FC4C5A ; 
  display: block ;
  font-size: 1.6rem ;
  padding:1.7rem 0 ;
  text-align: center ;

}
</style>
