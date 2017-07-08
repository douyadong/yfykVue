<template>
    <div id="spaceDetailShare">
        <assistant :agent="apiData.agentDetail" :callBigDataParams="getUvParamsString({ eventName : 2065008 })" :wechatBigDataParams="getUvParamsString({ eventName : 2065009 })" />
        <div class="wk-panel card">
            <dl class="outline">
                <dt><img :src="apiData.agentDetail.agentHeadImgUrl" class="img-responsive"></dt>
                <dd>
                    <div class="agent-name">
                        <span class="name">{{ apiData.agentDetail.agentName }}</span>
                        <span class="good" v-if="apiData.agentDetail.isWellAgent">好</span>
                    </div>
                    <div class="volume">
                        <img src="../../../assets/volume.png">
                        <span>成交 {{ apiData.agentDetail.agentVolume }} 套</span>
                    </div>
                </dd>
                <dd>{{ apiData.agentDetail.agentBelongToCompanyName }}</dd>
            </dl>
            <hr>
            <a href="javascript:;" class="more" @click="spreadOptional" v-show=" ! pageStates.optionsVisibility">查看更多</a>
            <transition  name="slide-fade">         
                <div class="optional" v-show="pageStates.optionsVisibility">
                    <dl>
                        <dt>熟悉商圈</dt>
                        <dd>{{ apiData.agentDetail.agentBizTown }}</dd>
                    </dl>
                    <hr>
                    <dl>
                        <dt>自我介绍</dt>
                        <dd class="content" ref="introduce" :class="{ ellipsis : pageStates.introduceExtendable }">{{ apiData.agentDetail.agentIntroduction }}</dd>
                        <dd class="switch" v-show="pageStates.introduceExtendable" @click="spreadIntroduceContent"><i class="iconfont icon-arrowDSS"></i></dd>
                    </dl>
                    <hr>
                    <dl>
                        <dt>成交故事</dt>
                        <dd class="content" ref="story" :class="{ ellipsis : pageStates.storyExtendable }">{{ apiData.agentDetail.agentStory }}</dd>
                        <dd class="switch" v-show="pageStates.storyExtendable" @click="spreadStoryContent"><i class="iconfont icon-arrowDSS"></i></dd>
                    </dl>
                </div>
            </transition>
        </div>
        <div class="wk-tabs top-gap">
            <!--tabs-handle部分-->
            <ul class="wk-panel tabs-handle">
                <li><a href="javascript:;" :class="{ on : pageStates.activeTab=='esf' }" @click="swapToTab('esf');" :data-bigdata="getUvParamsString({ eventName : 2065001 })">推荐二手房</a></li>
                <li><a href="javascript:;" :class="{ on : pageStates.activeTab=='xf' }" @click="swapToTab('xf');" :data-bigdata="getUvParamsString({ eventName : 2065002 })">推荐新房</a></li>
                <li v-if="pageStates.hasPress"><a href="javascript:;" :class="{ on : pageStates.activeTab=='press' }" @click="swapToTab('press');" :data-bigdata="getUvParamsString({ eventName : 2065003 })">房产资讯</a></li>
            </ul>
            <!--tabs-frame部分-->            
            <div class="wk-panel" v-if="pageStates.activeTab=='esf'">
                <transition  name="slide-fade">
                    <!--为什么这里要多套一层容器，是用上面wk-panel容器显示来改变页面滚动条状态从而来触发切换到的tab的循环加载插件加载-->
                    <div  v-if="pageStates.activeTabContent=='esf'">
                        <esf-sources :items="apiData.esfSources" eventName="2065005" :otherParams="{ agent_id : apiData.agentDetail.agentId }" />
                        <infinite-loading :on-infinite="infiniteLoadingEsf" ref="infiniteLoadingEsf">
                            <div slot="no-more" class="no-more">没有更多了！</div>
                        </infinite-loading>
                    </div>
                </transition>
            </div>           
            <div class=" wk-panel" v-if="pageStates.activeTab=='xf'">
                <transition  name="slide-fade">
                    <div  v-if="pageStates.activeTabContent=='xf'">
                        <xf-sources :items="apiData.xfSources" eventName="2065006" :otherParams="{ agent_id : apiData.agentDetail.agentId }" />
                        <infinite-loading :on-infinite="infiniteLoadingXf" ref="infiniteLoadingXf">
                            <div slot="no-more" class="no-more">没有更多了！</div>
                        </infinite-loading>
                    </div>
                </transition>
            </div>
            <div class="wk-panel" v-if="pageStates.activeTab=='press'">
                <transition  name="slide-fade">
                    <div  v-if="pageStates.activeTabContent=='press'">
                        <presses :items="apiData.presses" eventName="2065007" :otherParams="{ agent_id : apiData.agentDetail.agentId }" />
                        <infinite-loading :on-infinite="infiniteLoadingPress" ref="infiniteLoadingPress">
                            <div slot="no-more" class="no-more">没有更多了！</div>
                        </infinite-loading>
                    </div>
                </transition>
            </div>
            <!--tabs内容结束-->         
        </div>
    </div>    
</template>

<script>
    import Vue from "vue" ;
    import assistant from "@/components/common/assistant" ;
    import xfSources from "@/components/common/xfSources" ;
    import esfSources from "@/components/common/esfSources" ;
    import presses from "@/components/common/presses" ;
    import apiDataFilter from "@/libraries/apiDataFilter" ;
    import InfiniteLoading from "vue-infinite-loading" ;   
    export default {
      name : "spaceDetailShare" ,
      data () {
          return {
              pageStates : {
                  optionsVisibility : false ,  //熟悉商圈，自我介绍，成交故事这块可选显示区域的显示状态
                  activeTab : "esf" ,  //停留在哪个tab上 ,
                  activeTabContent : "esf" ,  //tab内容停留在哪个上
                  introduceExtendable : false ,  //自我介绍文本内容是否可展开
                  storyExtendable : false ,  //成交故事内容是否可展开 ,
                  esfPageIndex : 0 , // 二手房源当前页数据起始条数
                  xfPageIndex : 0 ,  //新房房源当前页数据起始条数
                  pressPageIndex : 0 ,//房产资讯当前页数据起始条数
                  hasPress:false
              } ,
              pageConfs : {                  
                  pageSize : 10  //推荐信息每次加载多少条
              } ,              
              apiData : {
                  agentDetail : {} ,  //经纪人数据
                  esfSources : [] , //二手房源
                  xfSources : [] ,  //新房房源
                  presses : []  //房产资讯
              }             
          }
      } ,
      methods : {
          //获取埋点参数方法
          getUvParamsString : function({ eventName , otherParams }) {
              let eventParam = { agent_id : this.$route.params.agentId } ;
              if(otherParams !== undefined && otherParams !== null ) {
                  eventParam = Object.assign( eventParam , otherParams ) ;
              }              
              return encodeURIComponent(JSON.stringify({ 
                  eventName : eventName , 
                  eventParam : eventParam ,
                  type : 2
              })) ;
          } ,
          //展开熟悉商圈，自我介绍，成交故事这块可选显示区域，Vue.nextTick表示在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
          spreadOptional : function() {
              this.pageStates.optionsVisibility = true ;               
              Vue.nextTick(() => {
                  this.pageStates.introduceExtendable = parseInt(this.$refs.introduce.clientHeight , 10) > 45 ;
                  this.pageStates.storyExtendable = parseInt(this.$refs.story.clientHeight , 10) > 45 ;                  
              }) ;
          } ,
          //展开自我介绍文本
          spreadIntroduceContent : function() {
              this.pageStates.introduceExtendable = false ;
          } ,
          //展开成交故事文本
          spreadStoryContent : function() {
              this.pageStates.storyExtendable = false ;
          } ,
          //切换二手房 | 新房 | 房产资讯 tabs
          swapToTab : function(tabName) {              
              this.pageStates.activeTab = tabName ; 
              //让外层容器切换，改变了页面滚动条状态后再改变下面activeTabContent的值从而触发infiniteLoading
              window.setTimeout(() => {
                  this.pageStates.activeTabContent = tabName ; 
              } , 100 ) ; 
          } ,          
          //无限加载二手房          
          infiniteLoadingEsf : function() {
              let agentId = this.$route.params.agentId ; 
              apiDataFilter.request({
                  apiPath : "space.esf" ,
                  data : { "agentId" : agentId , "pageIndex" : this.pageStates.esfPageIndex , "pageSize" : this.pageConfs.pageSize } ,              
                  successCallback : res => {
                      let result = res.body.data.secondHouseSummaryModels ; 
                      this.$data.apiData.esfSources = this.$data.apiData.esfSources.concat(result) ;  //将房源数据累加
                      this.pageStates.esfPageIndex += result.length ;  //将取数据指针累加，方便上拉加载调用
                      this.$refs.infiniteLoadingEsf.$emit("$InfiniteLoading:loaded") ;  //标识本次数据加载完成
                      if(res.body.data.page.total === this.$data.apiData.esfSources.length) {
                        this.$refs.infiniteLoadingEsf.$emit("$InfiniteLoading:complete") ;  //标识所有数据加载完毕
                      }
                  }
              }) ;
              
          } ,
          //无限加载新房
          infiniteLoadingXf : function() {
              let agentId = this.$route.params.agentId ; 
              apiDataFilter.request({
                  apiPath : "space.xf" ,
                  data : { "agentId" : agentId , "pageIndex" : this.pageStates.xfPageIndex , "pageSize" : this.pageConfs.pageSize } ,              
                  successCallback : res => {                      
                      let result = res.body.data.newHouseSummaryModels ;
                      this.$data.apiData.xfSources = this.$data.apiData.xfSources.concat(result) ;  //将房源数据累加
                      this.pageStates.xfPageIndex += result.length ;  //将取数据指针累加，方便上拉加载调用
                      this.$refs.infiniteLoadingXf.$emit("$InfiniteLoading:loaded") ;  //标识本次数据加载完成                 
                      if(res.body.data.page.total === this.$data.apiData.xfSources.length) {
                        this.$refs.infiniteLoadingXf.$emit("$InfiniteLoading:complete") ;  //标识所有数据加载完毕             
                      }
                  }
              }) ;              
          } ,
         //无限加载资讯
          infiniteLoadingPress : function() {
              let agentId = this.$route.params.agentId ; 
              apiDataFilter.request({
                  apiPath : "space.press" ,
                  data : { "agentId" : agentId , "startIndex" : this.pageStates.pressPageIndex , "pageSize" : this.pageConfs.pageSize } ,              
                  successCallback : res => {                      
                      let result = res.body.data.agentRecmdArticleDetailModels ;
                      if(result){
                        this.$data.apiData.presses = this.$data.apiData.presses.concat(result) ;  //将房源数据累加
                        this.pageStates.pressPageIndex += result.length ;  //将取数据指针累加，方便上拉加载调用
                        this.$refs.infiniteLoadingPress.$emit("$InfiniteLoading:loaded") ;  //标识本次数据加载完成                 
                        if(res.body.data.page.total === this.$data.apiData.presses.length) {
                          this.$refs.infiniteLoadingPress.$emit("$InfiniteLoading:complete") ;  //标识所有数据加载完毕             
                        }
                      }else{//此时认为数据加载完成了
                        this.$refs.infiniteLoadingPress.$emit("$InfiniteLoading:loaded") ;  //
                        this.$refs.infiniteLoadingPress.$emit("$InfiniteLoading:complete") ;
                      }
                  }
              }) ;              
          }
         
      } ,
      created() {            
          let agentId = this.$route.params.agentId ; 
          //页面埋点功能
          this.$bigData({
            pageName : 2065 ,
            pageParam : {
                agent_id : agentId
            } ,
            type : 1
          }) ;
          //获取经纪人信息 
          apiDataFilter.request({
              apiPath : "space.detail" ,
              data : { "agentId" : agentId } ,              
              successCallback : res => {
                  let agent = res.body.data.agentDetail ; 
                  this.$data.apiData.agentDetail = agent ; 
                  //页面标题和分享内容设置
                  let generalTitle = "买房卖房就找悟空找房" + agent.agentName ;
                  let shareContent = agent.agentIntroduction || "我已收到80%客户的好评，欢迎随时联系" ;
                  document.title = generalTitle ;  //设置页面title
                  //页面微信分享设置
                  this.$wechatShare({                      
                      "content" : shareContent ,
                      "imgUrl" : agent.agentHeadImgUrl ,                      
                      "success" : function() { console.log("分享成功！") ;  } ,
                      "fail" : function() { console.log("分享失败！") ;  } ,
                      "cancel" : function() { console.log("您取消了分享！") ; } ,
                      "complete" : function() { console.log("分享完成！") ; }
                  }) ; 
              }
          }) ;   

          //查询是否有文章，决定是否显示资讯tab
          apiDataFilter.request({
              apiPath : "space.press" ,
              data : { "agentId" : agentId , "startIndex" : 0 , "pageSize" : 1 } ,              
              successCallback : res => {                      
                  let result = res.body.data.agentRecmdArticleDetailModels ;
                  if(result && result.length > 0){
                    this.pageStates.hasPress = true;
                    
                  }else{//此时认为数据加载完成了
                    this.pageStates.hasPress = false;
                  }
              }
          }) ; 

      } ,
      components : {
          assistant ,
          xfSources ,
          esfSources ,
          presses ,
          InfiniteLoading
      }
    }
</script>

<style lang="less" scoped>
    @import "../../../../src/less/space/detail.less" ;   
</style>
