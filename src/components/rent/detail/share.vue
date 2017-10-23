<template>
    <div id="rentDetailShare">
        <assistant :cityId="cityId" :agent="apiData.houseAgent" :callBigDataParams="getUvParamsString({ eventName : 2057002 })" />
        <download-app />
       <!--相册内容-->
       <!--3.6版本相册-->
        <!--<swiper :options="pageConfs.swiperOption">
            <swiper-slide v-for="(slide , index) in apiData.houseImages" :key="index">
                <video :src="slide.videoSrc" :poster="slide.imageSrc" controls="controls" preload="none"  class="img-responsive" style="width:100%;height : 210px ; " v-if="slide.video"></video>                
                <img :src="slide" class="img-responsive" v-else>
                <div class="pagination">{{ pageStates.swiperActiveIndex }} / {{ apiData.houseImages.length }}</div>
            </swiper-slide>
        </swiper> -->

        <!--3.7版本相册-->
        <swiper :options="pageConfs.swiperOption">            
            <swiper-slide style="text-align:center" v-for="(slide , index) in houseImageAndVideoList" :key="slide.url">                
                <!-- <video :src="slide.videoUrl" :poster="slide.videoSmallImage" controls="controls" preload="none"  class="img-responsive" style="width:100%;height : 210px ; " v-if="slide.isVideo"></video> -->
                <template  v-if="slide.isVideo">
                    <div style="position:relative" @click="playVideo(slide.video)">                    
                        <img style="margin:0 auto;dislay:block;" :src="slide.videoImage" class="img-responsive"> 
                        <div style="display:flex;justify-content:center;align-items:center;position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px;width:60px;height:60px;border-radius:50%;background-color:rgba(0,0,0,.3)">
                            <div style="width:0;height:0;border-top:14px solid transparent;border-left:20px solid rgba(0,0,0,.5);border-bottom:14px solid transparent;margin-left:4px;">

                            </div>
                        </div>
                    </div>
                </template>
                               
                <img @click="previewImage()" :src="slide.url" class="img-responsive" v-else>
                <div class="pagination">{{ pageStates.swiperActiveIndex }} / {{ houseImageAndVideoList.length }}</div>
            </swiper-slide>            
        </swiper>
        <!--房源概要部分-->
        <div class="wk-panel summary">
            <div class="panel-header">
                <div class="message">
                    <h1>{{ apiData.subEstateName }}</h1>
                    <div class="money">{{ apiData.rentPriceStr }} 元 / 月</div>
                </div>
                <!--<ul>
                    <li><span>带看</span><span>20</span></li>
                    <li><span>浏览</span><span>140</span></li>
                    <li><span>分享</span><span>88</span></li>
                </ul>-->
            </div>
        </div>
        <!--房子简介-->
        <div class="wk-panel house-info">
            <div  class=" panel-body lr-padding tb-padding">
                <ul class="column-3">
                    <li v-if="apiData.isWKhouse==1"><dl><dt>{{ apiData.payTypeStr }}</dt><dd>付款方式</dd></dl></li>
                    <li><dl><dt>{{ apiData.houseTypeStr }}</dt><dd>户型</dd></dl></li>
                    <li><dl><dt>{{ apiData.spaceArea }} m&sup2;</dt><dd>面积 </dd></dl></li>
                </ul>
                <hr>
                <ul class="outline">
                    <li class="percent-70"><dl><dt>类型</dt><dd>{{ apiData.houseChildTypeStr }}</dd></dl></li>
                    <li class="percent-30"><dl><dt>装修</dt><dd>{{ apiData.renovationStr }}</dd></dl></li>
                    <li class="percent-70"><dl><dt>楼层</dt><dd>{{ apiData.floorStr}}</dd></dl></li>
                    <li class="percent-30"><dl><dt>朝向</dt><dd>{{ apiData.orientationStr }}</dd></dl></li>
                    <li class="percent-100"><dl><dt>地址</dt><dd>{{ apiData.estateAddr}}</dd></dl></li>
                </ul>
                <hr>
                <ul class="subway-school">
                    <li><dl><dt>地铁</dt><dd>{{ apiData.subwayStr }}</dd></dl></li>
                    <li><dl><dt>学校</dt><dd>{{ apiData.schoolStr }}</dd></dl></li>
                </ul>
            </div>
        </div>
        <!--房源配套部分-->
        <div class="wk-panel support top-gap">
            <div class="panel-header">房源配套</div>
            <ul  class="panel-body  lr-padding tb-padding">
                <li :class=" { no : ! apiData.houseSupporting.hasBad }" class="iconfont icon-bed ">床</li>
                <li :class=" { no : ! apiData.houseSupporting.hasTV }" class="iconfont icon-tv ">电视</li>
                <li :class=" { no : ! apiData.houseSupporting.hasInternet }" class="iconfont icon-internet ">宽带</li>
                <li :class=" { no : ! apiData.houseSupporting.hasAirConditioning }" class="iconfont icon-airconditioner right">空调</li>
                <li :class=" { no : ! apiData.houseSupporting.hasWashMachine }" class="iconfont icon-washer">洗衣机</li>
                <li :class=" { no : ! apiData.houseSupporting.hasWardrobe }" class="iconfont icon-wardrobe ">衣柜</li>
                <li :class=" { no : ! apiData.houseSupporting.hasWaterHeater }" class="iconfont icon-heater ">热水器</li>
                <li :class=" { no : ! apiData.houseSupporting.hasHeating }" class="iconfont icon-heating right">暖气</li>
                <li :class=" { no : ! apiData.houseSupporting.hasBalcony }" class="iconfont icon-balcony">阳台</li>
                <li :class=" { no : ! apiData.houseSupporting.hasGas }" class="iconfont icon-gas ">煤气</li>
                <li :class=" { no : ! apiData.houseSupporting.hasMicrowave }" class="iconfont icon-microwave ">微波炉</li>
                <li :class=" { no : ! apiData.houseSupporting.hasFridge }" class="iconfont icon-refrigerator right">冰箱</li>       
            </ul>
        </div>
        <!--房源描述部分-->
        <div class="wk-panel description top-gap">
            <!--自有房源房源描述-->
            <div v-if="apiData.isWKhouse==1" class="self-house">
                <div class="panel-header">房源描述</div>
                <div  class="panel-body  lr-padding tb-padding">
                    <dl><dt>主要卖点</dt><dd>{{ apiData.sellPoint || "暂无描述" }}</dd></dl>
                    <dl><dt>业主心态</dt><dd>{{ apiData.ownerMotivation || "暂无描述" }}</dd></dl>
                    <dl><dt>周边配套</dt><dd>{{ apiData.aroundSupport || "暂无描述" }}</dd></dl>
                </div>
            </div>
            <!--外来房源房源描述-->
            <div v-else-if="apiData.isWKhouse==2&&apiData.sellPoint.length>30" class="outside-house ">
                <div class="panel-header">房源描述</div>
                <div class="outside-info panel-body lr-padding" :class="{moreInfo:moreInfo}" ref="sansInfo">{{apiData.sellPoint}}</div>
                <div  v-if="moreInfo" @click="outsideMoreInfo" class="is-look lr-padding">{{isLook}}</div>
            </div>
        </div>
        <!--小区信息-->
        <div class="wk-panel top-gap estate-info">
            <div class="info panel-header">小区信息</div>
            <div class="estate-detail">
                <div class="estate-img">
                    <img :src="apiData.estateImgUrl" alt="">
                </div>
                <div class="estate-text">
                    <ul>
                        <li class="estate-name">{{apiData.subEstateName}}</li>
                        <li class="jiantou">
                            <span>{{apiData.completedStr}}年竣工</span><span class="division">|</span><span>{{apiData.totalHouse}}户</span>
                            <router-link :to="'/estate/detail/share'" class="iconfont icon-arrowR skip"></router-link>
                        </li>
                        <li>{{apiData.estateAddr}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <!--位置及周边部分-->
        <div class="wk-panel location ">
            <a :href="mapUrl">
                <div class="location-container">
                    <img :src="'https://api.map.baidu.com/staticimage/v2?ak=GByG2pAz1WlmY7wX1rlIM4nd&width=640&height=426&center=' + apiData.longitude + ',' + apiData.latitude + '&zoom=18'" class="img-responsive">
                    <div class="cover">
                        <i class="iconfont icon-arrowTS"></i><span>{{ apiData.estateAddr}}</span>
                    </div>
                    <div class="mark"></div>
                </div>
            </a>
        </div>
        <!--相似房源推荐-->
        <div class="alike-house top-gap wk-panel" v-if="apiData.similarHouses.length!=0">
            <div class="house-recommend panel-header">相似房源推荐</div>
            <rent-sources :statusStyle="styleStatus" :dataItems="apiData.similarHouses" :agentId="agentId"></rent-sources>
        </div>
        <!--结束-->
    </div>
</template>

<script>
    import downloadApp from "@/components/common/downloadApp" ;
    import assistant from "@/components/common/assistant" ;
    import rentSources from "@/components/common/rentSources";
    import $ from "jquery";
    import { swiper , swiperSlide } from "vue-awesome-swiper" ;
    import apiDataFilter from "@/libraries/apiDataFilter" ;
    import config from "@/configs/api";
    let prefix = config.prefix[apiDataFilter.getEnv()];
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
                  houseImages:[]
              },
              moreInfo:true,//是否超过5行
              textHeight:'',//定义原本外部房源信息盒子高度
              isLook:'查看更多',//点击查看更多外部房源信息
              styleStatus:false,//控制相似房源公共组件样式；
              agentId:'',
          }
      } ,
      methods : {
          //获取用户点击埋点参数方法
          getUvParamsString : function({ eventName , otherParams }) {
              let eventParam = { house_id : this.apiData.houseId } ;
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
         },
        //  视频点击
         playVideo(video){
            this.$router.push({
                path:"/videoPlay?video=" + video
            });
          },
      } ,
      created() {
          let houseId = this.$route.params.houseId ;
          let agentId = this.$route.params.agentId ;
          this.cityId = this.$route.query.cityId;
          this.agentId=agentId;
		  let self = this;
          apiDataFilter.request({
              apiPath : "rent.detail" ,
              data : { "houseId" : houseId , "agentId" : agentId } ,
              successCallback : res => {
                  console.log(res)
                  this.apiData=Object.assign({}, res.body.data) ;
                  console.log(this.$data.apiData)
                  //document.title = "租房详情" ;
                  self.$nativeBridge.invokeMethod('updateTitle',['租房详情'],function(){
                    console.log('更新标题成功');
                  },function(){
                    console.log('更新标题失败');
                  });
                  this.$nextTick(function(){
                     if(this.apiData.isWKhouse==2){
                        let houseInfo=this.$refs.sansInfo.clientHeight;
                        this.textHeight=this.$refs.sansInfo.clientHeight;
                        //   超出控制高度;
                        if(houseInfo/25>5){
                            this.$refs.sansInfo.style.height=25*5+'px';
                        }
                     }
                  });
                  //定制页面微信分享参数
                  let wechatShare = res.body.data.weChatShare ;
                  console.log(wechatShare);
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
                      house_id : this.apiData.houseId
                  } ,
                  type : 1
                }) ;
              }
          }) ;
      } ,
      computed:{
            houseImageAndVideoList:function(){
                let result = [];
                if(this.apiData.houseVideos){
                    result.push({
                        isVideo: true,
                        video: encodeURIComponent(JSON.stringify({
                            videoUrl:this.apiData.houseVideos.videoUrl,
                            videoImage: this.apiData.houseVideos.imgUrl
                        })),
                        url:this.apiData.houseVideos.videoUrl,
                        videoUrl:this.apiData.houseVideos.videoUrl,
                        videoImage: this.apiData.houseVideos.imgUrl
                    });
                }
                if(this.apiData.houseImages){
                    this.apiData.houseImages.forEach(function(img){
                        result.push({
                            url:img                         
                        });
                    });
                }

                return result;
            },
            mapImgUrl:function(){
                return 'https://api.map.baidu.com/staticimage/v2?ak=GByG2pAz1WlmY7wX1rlIM4nd&width=640&height=426&center='+this.apiData.estate.longitude+','+this.apiData.estate.latitude+'&zoom=18';
            },
            mapUrl:function(){
                return prefix + '/esf/map.html?longitude=' + this.apiData.longitude + '&latitude=' + this.apiData.latitude + '&houseName='+this.apiData.subEstateName + '&houseAddress=' + this.apiData.estateAddr;
            }
        },
      components : {
          downloadApp ,
          assistant ,
          rentSources,
          swiper ,
          swiperSlide
      }
    }
</script>

<style lang="less" scoped>
    @import "../../../../src/less/rent/detail.less" ;
</style>
