<template>
  <div class="xf-detail">
    <!--滚动图部分-->
    <div class="top-swiper">
      站位
    </div>
    <!--房产简介-->
    <div class="description-box">
      <div class="description">
        <h3 class="house-name">新城金郡 M11 金座三期花园</h3>
        <p>临近中环，性价比之王</p>
        <h3 class="house-price">36509 元／㎡<span>[ 参考价格 ]</span></h3>
        <ul>
          <li v-for="(item , index) in getInfoData.buildingInformation" v-bind:class="giveColor(item)">{{item}}</li>
        </ul>
        <p class="time"><span>开盘时间：2016 - 06 - 23</span><span>交房时间：2016 - 09 - 20</span> </p>
      </div>
      <div class="favourable">
        <ul>
          <li v-for="(benefitItem , index) in getInfoData.benefitInfo" v-if="index < 3"><i class="iconfont icon-hui"></i>{{benefitItem.title}}</li>
        </ul>
        <div class="more"><p><i class="iconfont ">&#xe622;</i></p></div>
      </div>
    </div>
    <!--楼盘动态-->
    <div class="building-status">
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
        <a class="more-building-status">查看更多</a>
      </div>
    </div>
    <!--在售户型-->
    <div class="on-sell-building">
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
    <div class="building-character">
      <p class="status-name">项目特色</p>

    </div>
    <!--<assistant :showBubble="true" :cityId="cityId" :agent="agent" :houseId="null" :eventName="null" :portraitBigDataParams='getBigDataParamStr(2063002,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})' :callBigDataParams='getBigDataParamStr(2063003,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})' :wechatBigDataParams='getBigDataParamStr(2063004,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})' :copyWechatBigDataParams='getBigDataParamStr(2063005,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})'></assistant>-->
  </div>
</template>

<script>
  import assistant from "@/components/common/assistant";
  let data = require('../../../mock/xf/detail');

  export default {
    name: "xfDetail",
    components: { assistant },
    data() {
      return {
        cityId: this.$route.query.cityId,
        agentId: this.$route.query.agentId,
        articleId: this.$route.params.id,
        agent: {},
        getInfoData:{
          buildingInformation:['即将开盘','地铁','有优惠','有视频'],
          benefitInfo: data.data.newHouseDetail.activityList,
          onSellBuilding: data.data.newHouseDetail.houseTypeImages
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
        console.log(withNum);
        return withNum
      }
    }
  }
</script>
<style lang="less">
  @import "../../../src/less/xf/detail.less" ;
</style>
