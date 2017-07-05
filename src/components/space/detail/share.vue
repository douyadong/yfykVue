<template>
    <div id="spaceDetailShare">
        <assistant :agent="apiData.agentDetail" :bigDataParams="pageConfs.assistantBigDataParams" />
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
                <li><a href="javascript:;" :class="{ on : pageStates.activeTab=='esf' }" @click="swapToTab('esf');">推荐二手房</a></li>
                <li><a href="javascript:;" :class="{ on : pageStates.activeTab=='xf' }" @click="swapToTab('xf');">推荐新房</a></li>
                <li><a href="javascript:;" :class="{ on : pageStates.activeTab=='press' }" @click="swapToTab('press');">房产资讯</a></li>
            </ul>
            <!--tabs-frame部分-->
            <transition  name="slide-fade">
                <div class="wk-panel" v-show="pageStates.activeTab=='esf'">
                    <esf-sources :items="apiData.esfSources"/>
                    <!--<infinite-loading :on-infinite="infiniteLoadingEsf" ref="infiniteLoadingEsf"/>-->
                </div>                
            </transition>
            <transition  name="slide-fade">
                <div class=" wk-panel" v-show="pageStates.activeTab=='xf'">
                    <xf-sources :items="apiData.xfSources"/>
                    <!--<infinite-loading :on-infinite="infiniteLoadingXf" ref="infiniteLoadingXf"/>-->
                </div>                
            </transition>
            <transition  name="slide-fade">
                <div class="wk-panel" v-show="pageStates.activeTab=='press'">
                    <xf-sources :items="apiData.presses"/>
                    <!--<infinite-loading :on-infinite="infiniteLoadingPress" ref="infiniteLoadingPress"/>-->
                </div>                
            </transition>
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
                  introduceExtendable : false ,  //自我介绍文本内容是否可展开
                  storyExtendable : false ,  //成交故事内容是否可展开 ,
                  esfPageIndex : 1 , // 二手房源当前页码
                  xfPageIndex : 1 ,  //新房房源当前页码
                  pressPageIndex : 1 //房产资讯当前页码
              } ,
              pageConfs : {
                  assistantBigDataParams : ""  //页面底部助手条电话咨询按钮埋点的参数
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
          //展开熟悉商圈，自我介绍，成交故事这块可选显示区域，Vue.nextTick表示在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
          spreadOptional : function() {
              this.pageStates.optionsVisibility = true ;               
              Vue.nextTick(() => {
                  this.pageStates.introduceExtendable = parseInt(this.$refs.introduce.clientHeight , 10) > 42 ;
                  this.pageStates.storyExtendable = parseInt(this.$refs.story.clientHeight , 10) > 42 ;                  
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
          } ,
          /*
          //无限加载二手房          
          infiniteLoadingEsf : function() {
              this.$refs.infiniteLoadingEsf.$emit("$InfiniteLoading:loaded") ;
          } ,
          //无限加载新房
          infiniteLoadingXf : function() {
              this.$refs.infiniteLoadingXf.$emit("$InfiniteLoading:loaded") ;
          } ,
        //无限加载资讯
          infiniteLoadingPress : function() {
              this.$refs.infiniteLoadingPress.$emit("$InfiniteLoading:loaded") ;
          }
          */
      } ,
      created() {          
          let agentId = this.$route.params.agentId ; 
          //获取经纪人信息 
          apiDataFilter.request({
              apiPath : "space.detail" ,
              data : { "agentId" : agentId } ,              
              successCallback : res => {
                  let agent = res.body.data.agentDetail ; 
                  this.$data.apiData.agentDetail = agent ; 
                  document.title = "买房卖房就找悟空找房" + agent.agentName ;
              }
          }) ;
          //获取推荐二手房信息
          apiDataFilter.request({
              apiPath : "space.esf" ,
              data : { "agentId" : agentId , "pageIndex" : 0 , "pageSize" : 20 } ,              
              successCallback : res => {
                  let result = res.body.data.secondHouseSummaryModels ; 
                  this.$data.apiData.esfSources = result ;                   
              }
          }) ;
          //获取推荐新房信息
          apiDataFilter.request({
              apiPath : "space.xf" ,
              data : { "agentId" : agentId , "pageIndex" : 0 , "pageSize" : 20 } ,              
              successCallback : res => {
                  let result = res.body.data.newHouseSummaryModels ; 
                  this.$data.apiData.xfSources = result ;                   
              }
          }) ;
          //获取房产资讯信息
          
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
