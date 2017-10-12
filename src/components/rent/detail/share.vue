<template>
    <div id="rentDetailShare">
        <assistant :cityId="cityId" :agent="apiData.simpleAgentModel" :callBigDataParams="getUvParamsString({ eventName : 2057002 })" />
       <download-app />
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
                <div class="message">
                    <h1>{{ apiData.simpleHouseRentDetailInfo.subEstateName }}</h1>
                    <div class="money">{{ apiData.simpleHouseRentDetailInfo.rentPrice }} 元 / 月</div>
                </div>
                <!--<ul>
                    <li><span>带看</span><span>20</span></li>
                    <li><span>浏览</span><span>140</span></li>
                    <li><span>分享</span><span>88</span></li>
                </ul>-->
            </div>
            <!--<div class="update-time">
                <ul>
                    <li><dl><dt>房源编号：</dt><dd>{{apiData.simpleHouseRentDetailInfo.houseId}}</dd></dl></li>
                    <li><dl><dt>更新：</dt><dd>{{apiData.simpleHouseRentDetailInfo.publishHouseTime.slice(5)}}</dd></dl></li>
                    <li><dl><dt>发布：</dt><dd>{{apiData.simpleHouseRentDetailInfo.updateHouseTime.slice(5)}}</dd></dl></li>
                </ul>
            </div>-->
        </div>
        <!--房子简介-->
        <div class="wk-panel house-info">
            <div  class=" panel-body lr-padding tb-padding ">
                <ul class="column-3">
                    <li v-if="apiData.simpleHouseRentDetailInfo.houseId<10000"><dl><dt>{{ apiData.simpleHouseRentDetailInfo.payTypeStr }}</dt><dd>付款方式</dd></dl></li>
                    <li><dl><dt>{{ apiData.simpleHouseRentDetailInfo.houseTypeStr }}</dt><dd>户型</dd></dl></li>
                    <li><dl><dt>{{ apiData.simpleHouseRentDetailInfo.spaceArea }} m&sup2;</dt><dd>面积 </dd></dl></li>
                </ul>
                <hr>
                <ul class="outline">
                    <li class="percent-70"><dl><dt>类型</dt><dd>{{ apiData.simpleHouseRentDetailInfo.houseChildTypeStr }}</dd></dl></li>
                    <li class="percent-30"><dl><dt>装修</dt><dd>{{ apiData.simpleHouseRentDetailInfo.renovationStr }}</dd></dl></li>
                    <li class="percent-70"><dl><dt>楼层</dt><dd>{{ apiData.simpleHouseRentDetailInfo.houseFloor}}</dd></dl></li>
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
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasBad }" class="iconfont icon-bed ">床</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasTV }" class="iconfont icon-tv ">电视</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasInternet }" class="iconfont icon-internet ">宽带</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasAirConditioning }" class="iconfont icon-airconditioner right">空调</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasWashMachine }" class="iconfont icon-washer">洗衣机</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasWardrobe }" class="iconfont icon-wardrobe ">衣柜</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasWaterHeater }" class="iconfont icon-heater ">热水器</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasHeating }" class="iconfont icon-heating right">暖气</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasBalcony }" class="iconfont icon-balcony">阳台</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasGas }" class="iconfont icon-gas ">煤气</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasMicrowave }" class="iconfont icon-microwave ">微波炉</li>
                <li :class=" { no : ! apiData.simpleHouseRentDetailInfo.houseSupporting.hasFridge }" class="iconfont icon-refrigerator right">冰箱</li>       
            </ul>
        </div>
        <!--房源描述部分-->
        <div class="wk-panel description top-gap">
            <!--自有房源房源描述-->
            <div v-if="apiData.simpleHouseRentDetailInfo.houseId<10000" class="self-house">
                <div class="panel-header">房源描述</div>
                <div  class="panel-body  lr-padding tb-padding">
                    <dl><dt>主要卖点</dt><dd>{{ apiData.simpleHouseRentDetailInfo.sellPoint || "暂无描述" }}</dd></dl>
                    <dl><dt>业主心态</dt><dd>{{ apiData.simpleHouseRentDetailInfo.ownerMotivation || "暂无描述" }}</dd></dl>
                    <dl><dt>周边配套</dt><dd>{{ apiData.simpleHouseRentDetailInfo.aroundSupport || "暂无描述" }}</dd></dl>
                </div>
            </div>
            <!--外来房源房源描述-->
            <div v-else-if="apiData.simpleHouseRentDetailInfo.houseId>10000&&text.length>30" class="outside-house ">
                <div class="panel-header">房源描述</div>
                <div class="outside-info panel-body lr-padding" :class="{moreInfo:moreInfo}" ref="sansInfo">{{text}}</div>
                <div  v-if="moreInfo" @click="outsideMoreInfo" class="is-look lr-padding">{{isLook}}</div>
            </div>
        </div>
        <!--小区信息-->
        <div class="wk-panel top-gap estate-info">
            <div class="info panel-header">小区信息</div>
            <div class="estate-detail">
                <div class="estate-img">
                    <img :src="estate.src" alt="">
                </div>
                <div class="estate-text">
                    <ul>
                        <li class="estate-name">{{estate.name}}</li>
                        <li>
                            <span>{{estate.year}}</span><span class="division">|</span><span>{{estate.total}}</span>
                            <router-link :to="'/estate/detail/share'" class="iconfont icon-arrowR skip"></router-link>
                        </li>
                        <li>{{estate.address}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <!--位置及周边部分-->
        <div class="wk-panel location top-gap">
            <div class="panel-header">位置及周边</div>
            <div class="location-container">
                <img :src="'https://api.map.baidu.com/staticimage/v2?ak=GByG2pAz1WlmY7wX1rlIM4nd&width=640&height=426&center=' + apiData.simpleHouseRentDetailInfo.longitude + ',' + apiData.simpleHouseRentDetailInfo.latitude + '&zoom=18'" class="img-responsive">
                <div class="cover">
                    <i class="iconfont icon-arrowTS"></i><span>{{ apiData.simpleHouseRentDetailInfo.subEstateInitName }}</span>
                </div>
                <div class="mark"></div>
            </div>
        </div>
        <!--结束-->
    </div>
</template>

<script>
    import downloadApp from "@/components/common/downloadApp" ;
    import assistant from "@/components/common/assistant" ;
    import $ from "jquery";
    import { swiper , swiperSlide } from "vue-awesome-swiper" ;
    import apiDataFilter from "@/libraries/apiDataFilter" ;
    export default {
      name : "rentDetailShare" ,
      data () {
          return {
              pageStates : {
                  swiperActiveIndex : 1 //相册当前在第几帧
              } ,
              pageConfs : {
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
                  simpleAgentModel : {}
              },
              text:`耳机哦非法分开服务费我也蚂蜂窝IWO夫君
              耳机哦非法分开服务费我也蚂蜂窝IWO夫君为客疯狂费劲儿
              我开房间噢诶无附件为额风口浪尖嗯耳机哦非法分开服务费我也
              蚂蜂窝IWO夫君为客疯狂费劲儿我开房间噢诶无附件为额风口浪尖嗯
              耳机哦非法分开服务费我也蚂蜂窝IWO夫君为客疯狂费劲儿我开房间噢
              诶无附件为额风口浪尖嗯耳机哦非法分开服务费我也蚂蜂窝IWO夫君为客疯狂费
              劲儿我开房间噢诶无附件为额风口浪尖嗯耳机哦非法分开服务费我也蚂蜂窝
              IWO夫君为客疯狂费劲儿我开房间噢诶无附件为额风口浪尖嗯为客疯狂费劲儿
              我开房间噢诶无附件为额风口浪尖嗯我if将诶`,
              moreInfo:true,//是否超过5行
              textHeight:'',//定义原本外部房源信息盒子高度
              isLook:'查看更多',//点击查看更多外部房源信息
              estate:{
                  //模拟小区信息;
                  src:'https://img.wkzf.com/e15d7d3d78974f1dbe076c7e8967c714.CL',
                  name:'虹东校区',
                  year:'1993年竣工',
                  total:'150户',
                  address:'虹桥路996弄'
              }
          }
      } ,
      methods : {
          //获取用户点击埋点参数方法
          getUvParamsString : function({ eventName , otherParams }) {
              let eventParam = { house_id : this.apiData.simpleHouseRentDetailInfo.houseId } ;
              if(otherParams !== undefined && otherParams !== null ) {
                  eventParam = Object.assign( eventParam , otherParams ) ;
              }
              return encodeURIComponent(JSON.stringify({
                  eventName : eventName ,
                  eventParam : eventParam ,
                  type : 2
              })) ;
          },
         //点击查看更多显示更多房源描述信息
         outsideMoreInfo(){
            if($('.is-look').text()=='查看更多'){
                this.$refs.sansInfo.style.height=this.textHeight+'px';
                this.isLook='收起'
            };
            if($('.is-look').text()=='收起'){
                this.$refs.sansInfo.style.height=25*5+'px';
                this.isLook='查看更多'
            }
         }
      } ,
      created() {
          let houseId = this.$route.params.houseId ;
          let agentId = this.$route.params.agentId ;
          this.cityId = this.$route.query.cityId;
          apiDataFilter.request({
              apiPath : "rent.detail" ,
              data : { "houseId" : houseId , "agentId" : agentId } ,
              successCallback : res => {
                  console.log(res)
                  Object.assign(this.$data.apiData , res.body.data) ;
                  document.title = "租房详情" ;
                  this.$nextTick(function(){
                    //   console.log(this.$refs.sansInfo)
                    //   this.$refs.sansInfo.style.color="red";
                      let houseInfo=this.$refs.sansInfo.clientHeight;
                      this.textHeight=this.$refs.sansInfo.clientHeight;
                    //   console.log(this.$refs.sansInfo.clientHeight);
                    //   超出控制高度;
                      if(houseInfo/25>5){
                        this.$refs.sansInfo.style.height=25*5+'px';
                      }
                  });
                  //定制页面微信分享参数
                  let wechatShare = res.body.data.weChatShare ;
                  this.$wechatShare({
                      "title" : wechatShare.title ,
                      "timelineTitle" : wechatShare.timelineTitle ,
                      "content" : wechatShare.content ,
                      "imgUrl" : wechatShare.picUrl ,
                      "success" : function() { console.log("分享成功！") ;  } ,
                      "fail" : function() { console.log("分享失败！") ;  } ,
                      "cancel" : function() { console.log("您取消了分享！") ; } ,
                      "complete" : function() { console.log("分享完成！") ; }
                  }) ;

                  //页面埋点功能
                this.$bigData({
                  pageName : 2057 ,
                  pageParam : {
                      agent_id : agentId ,
                      house_id : this.apiData.simpleHouseRentDetailInfo.houseId
                  } ,
                  type : 1
                }) ;
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
