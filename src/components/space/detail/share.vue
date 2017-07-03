<template>
    <div id="spaceDetailShare">
        <assistant :agent="apiData.simpleAgentModel" houseId="" :eventName="pageConfs.assistantTelEventName" />
        <div class="wk-panel card">
            <dl class="outline">
                <dt><img src="https://imgwater-test.wkzf.com/45bd6d1ee7d049a2b632685767ea4bdb" class="img-responsive"></dt>
                <dd>
                    <div class="agent-name">
                        <span class="name">程茂盛</span>
                        <span class="good">好</span>
                    </div>
                    <div class="volume">
                        <img src="../../../assets/volume.png">
                        <span>成交 100 套</span>
                    </div>
                </dd>
                <dd>志远地产 | 虹桥店</dd>
            </dl>
            <hr>
            <a href="javascript:;" class="more" @click="spreadOptional" v-show=" ! pageStates.optionsVisibility">查看更多</a>
            <transition  name="slide-fade">         
                <div class="optional" v-show="pageStates.optionsVisibility">                         
                    <dl>
                        <dt>熟悉商圈</dt>
                        <dd>长宁区虹桥、古北、仙霞板块，虹许路</dd>
                    </dl>
                    <hr>
                    <dl>
                        <dt>自我介绍</dt>
                        <dd class="content" ref="introduce" :class="{ ellipsis : pageStates.introduceExtendable }">五年成功的房产经纪经验，促成了1000多套不动产的交易达成，是个不折不扣的销售牛人，不服来战</dd>
                        <dd class="switch" v-show="pageStates.introduceExtendable" @click="spreadIntroduceContent"><i class="iconfont icon-arrowDSS"></i></dd>
                    </dl>
                    <hr>
                    <dl>
                        <dt>成交故事</dt>
                        <dd class="content" ref="story" :class="{ ellipsis : pageStates.storyExtendable }">王先生看中一套静安区的900万的房子苦于没钱，百般无赖找到了我，最终我卖血抽签买好送给他了，这才叫友邦保险白求恩吧！</dd>
                        <dd class="switch" v-show="pageStates.storyExtendable" @click="spreadStoryContent"><i class="iconfont icon-arrowDSS"></i></dd>
                    </dl>
                </div>
            </transition>
        </div>
        <div class="wk-tabs top-gap">
            <!--tabs-handle部分-->
            <ul class="wk-panel tabs-handle">
                <li><a href="javascript:;" :class="{ on : pageStates.activeTab=='esf' }" @click="swapToTab('esf');">二手房</a></li>
                <li><a href="javascript:;" :class="{ on : pageStates.activeTab=='xf' }" @click="swapToTab('xf');">新房</a></li>
                <li><a href="javascript:;" :class="{ on : pageStates.activeTab=='press' }" @click="swapToTab('press');">房产资讯</a></li>
            </ul>
            <!--tabs-frame部分-->
            <transition  name="slide-fade">
                <div class="tabs-frame esf lr-padding" v-show="pageStates.activeTab=='esf'"><esf-sources :items="apiData.esfSources"/></div>
            </transition>
            <transition  name="slide-fade">
                <div class="tabs-frame xf lr-padding" v-show="pageStates.activeTab=='xf'"><xf-sources :items="apiData.xfSources"/></div>
            </transition>
            <transition  name="slide-fade">
                <div class="tabs-frame press lr-padding" v-show="pageStates.activeTab=='press'"><xf-sources :items="apiData.presses"/></div>
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
    export default {
      name : "spaceDetailShare" ,
      data () {
          return {
              pageStates : {
                  optionsVisibility : false ,  //熟悉商圈，自我介绍，成交故事这块可选显示区域的显示状态
                  activeTab : "esf" ,  //停留在哪个tab上 ,
                  introduceExtendable : false ,  //自我介绍文本内容是否可展开
                  storyExtendable : false  //成交故事内容是否可展开
              } ,
              pageConfs : {
                  assistantTelEventName : 201705  //页面底部助手条电话咨询按钮埋点的事件名称
              } ,              
              apiData : {
                  simpleAgentModel : {} ,  //经纪人数据
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
                  this.pageStates.introduceExtendable = parseInt(this.$refs.introduce.clientHeight , 10) > 40 ;
                  this.pageStates.storyExtendable = parseInt(this.$refs.story.clientHeight , 10) > 40 ;                  
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
          }
      } ,
      components : {
          assistant ,
          xfSources ,
          esfSources ,
          presses
      }
    }
</script>

<style lang="less" scoped>
    @import "../../../../src/less/space/detail.less" ;   
</style>
