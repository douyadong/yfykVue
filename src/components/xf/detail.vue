<template>
  <div class="xf-detail">
    <!--滚动图部分-->
    <div class="top-swiper">
      <!--相册内容-->
      <swiper :options="pageConfs.swiperOption">
        <swiper-slide v-for="(slide , index) in apiData.simpleHouseRentDetailInfo.houseImageAndVideoList" :key="slide.imgKey">
          <video :src="slide.videoSrc" :poster="slide.imageSrc" controls="controls" preload="none"  class="img-responsive" style="height : 210px ; " v-if="slide.isVideo"></video>
          <img :src="slide.imageSrc" class="img-responsive" v-else>
          <div class="pagination">{{ pageStates.swiperActiveIndex }} / {{ apiData.simpleHouseRentDetailInfo.houseImageAndVideoList.length }}</div>
        </swiper-slide>
      </swiper>
    </div>
    <!--房产简介-->
    <div class="wk-panel description-box">
      <div class="description">
        <h3 class="house-name">新城金郡 M11 金座三期花园</h3>
        <p>临近中环，性价比之王</p>
        <h3 class="house-price">36509 元／㎡<span>[ 参考价格 ]</span></h3>
        <ul>
          <li v-for="(item , index) in getInfoData.buildingInformation" :class="giveColor(item)">{{item}}</li>
        </ul>
        <p class="time"><span>开盘时间：2016-06-23</span><span>交房时间：2016-09-20</span> </p>
      </div>
      <div class="favourable">
        <ul>
          <li v-for="(benefitItem , index) in getInfoData.benefitInfo" v-if="index < 3"><i class="iconfont icon-hui"></i>{{benefitItem.title}}</li>
        </ul>
        <div class="more"><p @click='showHide()'><i class="iconfont ">&#xe622;</i></p></div>
      </div>
    </div>
    <!--楼盘动态-->
    <div class="wk-panel building-status">
      <p class="status-name">楼盘动态</p>
      <div class="status-article">
        <div class="single-article" v-for="(item , index) in getInfoData.buildingStatus" :key="item.id" v-if="index < 2">
          <h3>{{item.title}}</h3>
          <p>{{item.content}}</p>
          <span>{{item.publishTimeStr}}</span>
        </div>
        <router-link to="/xf/status"><a class="more-status">查看更多</a></router-link>
      </div>
    </div>
    <!--在售户型-->
    <div class="wk-panel on-sell-building">
      <p class="status-name">在售户型</p>
      <div class="onSell-building">
        <ul :style="{ width: getSellBuLenth() + 'rem' }">
          <li v-for="(onSellBuildingItem , index) in getInfoData.onSellBuilding">
            <div class="pic"><img :src="onSellBuildingItem.thumbnail"/></div>
            <div class="description">
              <p class="description-first"><span>{{onSellBuildingItem.name}}</span><span>{{onSellBuildingItem.price}}万起</span></p>
              <p class="description-second"><span>{{onSellBuildingItem.bedRoomSum}}室{{onSellBuildingItem.balconySum}}厅{{onSellBuildingItem.wcSum}}卫</span><span>{{onSellBuildingItem.spaceArea}}㎡</span></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--楼盘特色-->
    <div class="wk-panel building-character">
      <p class="status-name">项目特色</p>
      <div class="character-content">
        <div class="single-character" v-for="CharacterItem in getInfoData.buildingCharacter">
          <div class="sprite-icon">
            <span class="sprite" :class="choseCharacter(CharacterItem.featureType)"></span>
          </div>
          <div class="benefit-content">
            <p class="title">{{CharacterItem.featureName}}</p>
            <p class="content">{{CharacterItem.featureDescription}}</p>
          </div>
        </div>
      </div>
    </div>
    <!--楼盘信息-->
    <div class="wk-panel building-info">
      <p class="status-name">楼盘信息</p>
      <div class="info-dec">
        <div class="info-top">
          <div>
            <p><span>产权年限</span>{{getInfoData.buildingInfoDec.propertyRight || "--"}}年</p>
            <p v-if="getInfoData.buildingInfoDec.buildDecoration === 1"><span>装修标准</span>毛坯</p>
            <p v-if="getInfoData.buildingInfoDec.buildDecoration === 2"><span>装修标准</span>精装</p>
            <p v-if="getInfoData.buildingInfoDec.buildDecoration === 3"><span>装修标准</span>豪装</p>
          </div>
          <div>
            <p><span>规划户数</span>{{getInfoData.buildingInfoDec.planRoom || "--"}}户</p>
            <p><span>物业类型</span>{{getInfoData.buildingInfoDec.propertyTypeStr || "--"}}</p>
          </div>
        </div>
        <div class="info-down">
          <div>
            <span>规划车位</span>
            <p>{{getInfoData.buildingInfoDec.parkingSpace || "--"}}</p>
          </div>
          <div>
            <span>楼盘地址</span>
            <p>{{getInfoData.buildingInfoDec.initName || "--"}}</p>
          </div>
          <div>
            <span>开发商</span>
            <p>{{getInfoData.buildingInfoDec.developers || "--"}}</p>
          </div>
        </div>
        <a class="more-status">查看更多</a>
      </div>
    </div>
    <!--楼盘画报-->
    <div class="wk-panel building-poster">
      <p class="status-name">楼盘信息</p>
      <div class="poster-info">
        <p class="title">{{getInfoData.posterData.title}}</p>
        <p class="time">{{getInfoData.posterData.publishTimeStr}}</p>
        <div class="poster-pic"><img :src="getInfoData.posterData.fileKey" :alt="getInfoData.posterData.fileName"></div>
        <p class="poster-content">{{getInfoData.posterData.content}}</p>
        <a class="more-status">查看更多</a>
      </div>
    </div>
    <!--用户评论-->
    <div class="wk-panel  comments">
      <p class="status-name">用户评论 <span>{{getInfoData.commentsData.amount}} <i class=" iconfont icon-arrowR"></i></span></p>
      <div class="comments-detail">
        <div class="single-comment" v-for="(singleComment , index ) in getInfoData.commentsData.commentList" :key="singleComment.id" v-if="index < 2" :class="{'first-comment': index == 0} ">
          <div class="comments-top">
            <img src="../../assets/default_head_img.png" :alt="singleComment.guest.avatar.imgType">
            <span>{{singleComment.guest.guestPhoneNum}}</span>
            <i class="iconfont icon-youpingsvg" v-if="singleComment.orderLevel == 10"></i>
            <i class="iconfont icon-yezhu" v-if="singleComment.landlord== 1"></i>
          </div>
          <div class="comment-content">
            <p>{{singleComment.comment}}</p>
          </div>
          <p class="time">{{singleComment.createTimeStr}} <span><i class="iconfont icon-zan "></i>{{singleComment.upAmount}}</span></p>
        </div>
        <a class="more-status">我来点评</a>
      </div>
    </div>
    <!--位置及周边-->
    <div class="wk-panel location">
      <p class="status-name">位置及周边</p>
      <div class="location-pic">
        <img  :src="locationUrl()"/>
        <div class="address">
          <p><i class=" iconfont icon-dingwei"></i>地址：{{getInfoData.locationData.initName}}</p>
          <p><i class=" iconfont icon-ditie"></i>地铁：{{getInfoData.locationData.subwayLabel}}</p>
        </div>
      </div>
    </div>
    <!--周边楼盘-->
    <div class="wk-panel nearby">
      <p class="status-name">周边楼盘</p>
      <div class="nearby-list">
        <div class="single-nearby" v-for="(singleNearby , index ) in getInfoData.nearbyData" :key="singleNearby.id">
          <div class="nearby-pic">
            <img :src="singleNearby.imageUrl" alt="">
          </div>
          <div class="nearby-content">
            <p class="name">{{singleNearby.estateName || '--'}}</p>
            <p class="space">{{singleNearby.startSpace}}㎡ - {{singleNearby.endSpace}}㎡ <span>{{singleNearby.avgPriceWou}}元/㎡</span></p>
            <p class="districtName">{{singleNearby.districtName}} {{singleNearby.townName}}</p>
            <ul>
              <li v-if="singleNearby.isSoonOpen == 1"><p>即将开盘</p></li>
              <li v-if="singleNearby.hasActivity == 1"><p>地铁</p></li>
              <li v-if="singleNearby.isSubwayEstate == 1"><p>有优惠</p></li>
              <li v-if="singleNearby.hasVideo == 1"><p>有视频</p></li>
            </ul>
          </div>
        </div>
      </div>

    </div>

    <assistant :showBubble="true" :cityId="cityId" :agent="agent" :houseId="null" :eventName="null" :portraitBigDataParams='getBigDataParamStr(2063002,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})' :callBigDataParams='getBigDataParamStr(2063003,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})' :wechatBigDataParams='getBigDataParamStr(2063004,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})' :copyWechatBigDataParams='getBigDataParamStr(2063005,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})'></assistant>
    <!--楼盘优惠弹出层-->
    <div class="benefit-more"  :class="{normalHide : moduleShow} ">
      <div class="benefit-top">
        <div class="benefit-top-title">
          <h3>优惠说明</h3>
        </div>
        <div class="benefit-top-content">
          <div class="single-content" v-for="(benefitItem , index) in getInfoData.benefitInfo">
            <div class="icon">
              <i class="iconfont icon-hui1"> </i>
            </div>
            <div class="content">
              <h3>{{benefitItem.title}}</h3>
              <p>{{benefitItem.details}}每付 1000 可抵 5000 税费，更可现场获得返现机会。</p>
            </div>
          </div>
        </div>
      </div>
      <div class="benefit-down">
        <p @click='showHide()'><i class="iconfont icon-close"></i></p>
      </div>
    </div>

  </div>
</template>

<script>
  import assistant from "@/components/common/assistant";
  import data from '../../../mock/xf/detail';
  import { swiper , swiperSlide } from "vue-awesome-swiper" ;

  export default {
    name: "xfDetail",
    components: { assistant, swiper , swiperSlide },
    data() {
      return {
        cityId: this.$route.query.cityId,
        agentId: this.$route.query.agentId,
        articleId: this.$route.params.id,
        agent: {},
        qqmapkey: 'FJ6BZ-QZG3P-LASD7-VHLJJ-AG5FT-4KB2U',
        getInfoData:{
          buildingInformation:['即将开盘','地铁','有优惠','有视频'],
          benefitInfo: data.data.newHouseDetail.activityList,
          buildingStatus: data.data.newHouseDetail.newHouseDynamicList,
          onSellBuilding: data.data.newHouseDetail.houseTypeImages,
          buildingCharacter: data.data.newHouseDetail.projectFeatureList,
          buildingInfoDec: data.data.newHouseDetail,
          posterData: data.data.newHouseDetail.newHouseMagazineList[0],
          commentsData: data.data.comment,
          locationData: data.data.newHouseDetail,
          nearbyData: data.data.aroundNewHouseList
        },
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
        apiData: {
          simpleHouseRentDetailInfo: {},
          simpleAgentModel: {}
        },
        moduleShow: true
      }
    },
    methods:{
      getBigDataParamStr(eventName, eventParam) {
        let obj = {
          eventName: eventName,
          eventParam: eventParam
        };
        return encodeURIComponent(JSON.stringify(obj));
      },
      giveColor(item){
        return (item == '即将开盘' ? 'list-open-color':(item == '地铁' ? 'list-metro-color':(item == '有优惠' ? 'list-benefit-color':'list-video-color')))
      },
      getSellBuLenth() {
        let lengthNum = this.getInfoData.onSellBuilding.length ;
        let withNum = lengthNum * 15;
        return withNum
      },
      choseCharacter(featureType) {
       let CharacterType =( featureType == 2 ? 'sprite-bus':(featureType == 3 ? 'sprite-light':(featureType == 4 ? 'sprite-school':(featureType == 5 ? 'sprite-estate':(featureType == 6 ?
        'sprite-touzi':(featureType == 7 ? 'sprite-lh':(featureType == 8 ? 'sprite-jz':(featureType == 9 ? 'sprite-technolog':(featureType == 10 ?
          'sprite-brand':(featureType == 11 ? 'sprite-hz':(featureType == 12 ? 'sprite-wuye':(featureType == 13 ? 'sprite-sence':(featureType == 14 ?
            'sprite-bxg':'sprite-yl')))))))))))) );
        return CharacterType
      },
      locationUrl() {
      let locationUrl = `http://apis.map.qq.com/ws/staticmap/v2/?center=${this.getInfoData.locationData.latitude},${this.getInfoData.locationData.longitude}&zoom=12&scale=2&size=${window.screen.width}*${window.screen.width*250/375}&maptype=roadmap&markers=size:large|${this.getInfoData.locationData.latitude},${this.getInfoData.locationData.longitude}&key=${this.qqmapkey}`;
      return locationUrl
      },
      showHide() {
        this.moduleShow = ! this.moduleShow ;
      }
    }
  }
</script>
<style lang="less">
  @import "../../../src/less/xf/detail.less" ;
</style>
