<template>
    <div id="rentDetailHybrid">
        <assistant :agent="apiData.simpleAgentModel" :bigDataParams="pageConfs.assistantBigDataParams" />
       <download-app />
       <!--<albums :items="apiData.simpleHouseRentDetailInfo.houseImageAndVideoList" :houseId="apiData.simpleHouseRentDetailInfo.houseId" :eventName="pageConfs.albumsEventName" />-->
       <!--相册内容-->
       <swiper :options="pageConfs.swiperOption">            
            <swiper-slide v-for="(slide , index) in apiData.simpleHouseRentDetailInfo.houseImageAndVideoList" :key="slide.imgKey">
                <video :src="slide.videoSrc" :poster="slide.imageSrc" controls="controls" preload="none"  class="img-responsive" style="height : 210px ; " v-if="slide.isVideo"></video>                
                <img :src="slide.imageSrc" class="img-responsive" v-else>
                <div class="pagination">{{ pageStates.swiperActiveIndex }} / {{ apiData.simpleHouseRentDetailInfo.houseImageAndVideoList.length }}</div>
            </swiper-slide>            
        </swiper>
       <!--房源概要部分-->
       <div class="wk-panel summary">
            <div class="panel-header">
                <h1>{{ apiData.simpleHouseRentDetailInfo.subEstateName }}</h1>
                <div class="money">{{ apiData.simpleHouseRentDetailInfo.rentPrice }} 元 / 月</div>
            </div>
            <div  class="panel-body lr-padding tb-padding">
                <ul class="column-3">
                    <li><dl><dt>付款方式</dt><dd>{{ apiData.simpleHouseRentDetailInfo.payTypeStr }}</dd></dl></li>
                    <li><dl><dt>户型</dt><dd>{{ apiData.simpleHouseRentDetailInfo.houseTypeStr }}</dd></dl></li>
                    <li><dl><dt>面积</dt><dd>{{ apiData.simpleHouseRentDetailInfo.spaceArea }} m&sup2;</dd></dl></li>
                </ul>
                <hr>
                <ul class="outline">
                    <li class="percent-70"><dl><dt>类型</dt><dd>{{ apiData.simpleHouseRentDetailInfo.houseChildTypeStr }}</dd></dl></li>
                    <li class="percent-30"><dl><dt>装修</dt><dd>{{ apiData.simpleHouseRentDetailInfo.renovationStr }}</dd></dl></li>
                    <li class="percent-70"><dl><dt>楼层</dt><dd>{{ apiData.simpleHouseRentDetailInfo.floor }}/{{ apiData.simpleHouseRentDetailInfo.totalfloor }}层</dd></dl></li>
                    <li class="percent-30"><dl><dt>朝向</dt><dd>{{ apiData.simpleHouseRentDetailInfo.orientationStr }}</dd></dl></li>
                    <li class="percent-100"><dl><dt>地址</dt><dd>{{ apiData.simpleHouseRentDetailInfo.subEstateInitName }}</dd></dl></li>
                </ul>
                <hr>
                <ul class="subway-school">
                    <li><dl><dt>地铁</dt><dd>{{ apiData.simpleHouseRentDetailInfo.subwayStr }}</dd></dl></li>
                    <li><dl><dt>学校</dt><dd>{{ apiData.simpleHouseRentDetailInfo.schoolStr }}</dd></dl></li>           
                </ul>
            </div>
        </div>
        <!--房源配套部分-->
        <div class="wk-panel support top-gap">
            <div class="panel-header">房源配套</div>
            <ul  class="panel-body  lr-padding tb-padding">
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasBad }">床</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasWardrobe }">衣柜</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasBalcony }">阳台</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasHeating }">暖气</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasGas }">煤气</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasWashMachine }">洗衣机</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasFridge }">冰箱</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasMicrowave }">微波炉</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasWaterHeater }">热水器</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasAirConditioning }">空调</li>       
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasTV }">电视机</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasInternet }">宽带</li>
            </ul>
        </div>
        <!--房源描述部分-->
        <div class="wk-panel description top-gap">
            <div class="panel-header">房源描述</div>
            <div  class="panel-body  lr-padding tb-padding">
                <dl><dt>主要卖点</dt><dd>{{ apiData.simpleHouseRentDetailInfo.sellPoint || "暂无描述" }}</dd></dl>
                <dl><dt>业主心态</dt><dd>{{ apiData.simpleHouseRentDetailInfo.ownerMotivation || "暂无描述" }}</dd></dl>
                <dl><dt>周边配套</dt><dd>{{ apiData.simpleHouseRentDetailInfo.aroundSupport || "暂无描述" }}</dd></dl>
            </div>
        </div>
        <!--位置及周边部分-->
        <div class="wk-panel location top-gap">
            <div class="panel-header">位置及周边</div>
            <div class="location-container">
                <img :src="'https://api.map.baidu.com/staticimage/v2?ak=GByG2pAz1WlmY7wX1rlIM4nd&width=640&height=426&center=' + apiData.simpleHouseRentDetailInfo.longitude + ',' + apiData.simpleHouseRentDetailInfo.latitude + '&zoom=18'" class="img-responsive">
                <div class="cover">
                    <p><i class="iconfont icon-dingwei"></i>地址：{{ apiData.simpleHouseRentDetailInfo.subEstateInitName }}</p>            
                </div>
                <div class="mark"><i class="iconfont icon-dingwei"></i></div>
            </div>    
        </div>
        <!--结束-->
    </div>    
</template>

<script>
    import downloadApp from "@/components/common/downloadApp" ;
    import assistant from "@/components/common/assistant" ;
    import { swiper , swiperSlide } from "vue-awesome-swiper" ;
    import apiDataFilter from "@/libraries/apiDataFilter" ;
    export default {
      name : "rentDetailHybrid" ,
      data () {
          return {
              pageStates : {
                  swiperActiveIndex : 1 //相册当前在第几帧
              } ,
              pageConfs : {
                  assistantBigDataParams : "" ,  //电话咨询按钮埋点参数                 
                  swiperOption : {  // 整个相册 swiper插件的选项                     
                      name : "currentSwiper" ,
                      // 所有配置均为可选（同Swiper配置）
                      autoplay : 0 , //自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换  
                      grabCursor : true ,  //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
                      setWrapperSize : true ,
                      autoHeight : false ,  //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化                      
                      //定义几个回调函数
                      onInit : swiper => {
                          this.pageStates.swiperActiveIndex = swiper.activeIndex + 1 ;
                      } ,
                      onSlideChangeEnd : swiper => {
                        this.pageStates.swiperActiveIndex = swiper.activeIndex + 1 ;
                      }       
                  }
              } ,
              apiData : {
                  simpleHouseRentDetailInfo : {} ,
                  simpleAgentModel : {} ,
                  weChatShare : {}
              }            
          }
      } ,
      created() {          
          let houseId = this.$route.params.houseId ;
          let agentId = this.$route.params.agentId ;         
          apiDataFilter.request({
              apiPath : "rent.detail" ,
              data : { "houseId" : houseId , "agentId" : agentId } ,              
              successCallback : res => {                 
                  Object.assign(this.$data.apiData , res.body.data) ;
                  document.title = "租房详情" ;
              }
          }) ;
      } ,
      components : {
          downloadApp ,
          assistant ,
          swiper ,
          swiperSlide
      }
    }
</script>

<style lang="less" scoped>
    @import "../../../../src/less/rent/detail.less" ;   
</style>