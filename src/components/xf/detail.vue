<template>
  <div class="xf-detail">
    <!--滚动图部分-->
    <div class="top-swiper">
      站位
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
        <div class="more"><p><i class="iconfont ">&#xe622;</i></p></div>
      </div>
    </div>
    <!--楼盘动态-->
    <div class="wk-panel building-status">
      <p class="status-name">楼盘动态</p>
      <div class="status-article">
        <div class="single-article">
          <h3>静安府样板间已开放，预计 7 月中下旬开预计 7 月中下旬开盘</h3>
          <p>7月4日最新消息：静安府样板间已开放，预计7月中下旬开盘。首开产品为95、118 平三房，138 平四房具体价格、优惠待定。</p>
          <span>2016-07-07</span>
        </div>
        <div class="single-article">
          <h3>静安府样板间已开放，预计 7 月中下旬开预计 7 月中下旬开盘</h3>
          <p>7月4日最新消息：静安府样板间已开放，预计7月中下旬开盘。首开产品为95、118 平三房，138 平四房具体价格、优惠待定。</p>
          <span>2016-07-07</span>
        </div>
        <a class="more-status">查看更多</a>
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
      <p class="status-name">楼盘信息</p>
      <div class="location-pic">

      </div>
    </div>
    <!--<assistant :showBubble="true" :cityId="cityId" :agent="agent" :houseId="null" :eventName="null" :portraitBigDataParams='getBigDataParamStr(2063002,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})' :callBigDataParams='getBigDataParamStr(2063003,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})' :wechatBigDataParams='getBigDataParamStr(2063004,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})' :copyWechatBigDataParams='getBigDataParamStr(2063005,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})'></assistant>-->
  </div>
</template>

<script>
  import assistant from "@/components/common/assistant";
  import data from '../../../mock/xf/detail'

  export default {
    name: "xfDetail",
    components: { assistant },
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
          onSellBuilding: data.data.newHouseDetail.houseTypeImages,
          buildingCharacter: data.data.newHouseDetail.projectFeatureList,
          buildingInfoDec: data.data.newHouseDetail,
          posterData: data.data.newHouseDetail.newHouseMagazineList[0],
          commentsData: data.data.comment,
          locationData: data.data.newHouseDetail
        },
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
      }
    }
  }
</script>
<style lang="less">
  @import "../../../src/less/xf/detail.less" ;
</style>
