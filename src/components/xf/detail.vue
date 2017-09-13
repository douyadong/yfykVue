<template>
   <div class="house-detail">
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
           <li v-for="(item , index) in buildingInformation" v-bind:class="giveColor(index)">{{item}}</li>
         </ul>
         <p class="time"><span>开盘时间：2016 - 06 - 23</span><span>交房时间：2016 - 09 - 20</span> </p>
       </div>
       <div class="favourable">
         站位
       </div>
     </div>
     <assistant :showBubble="true" :cityId="cityId" :agent="agent" :houseId="null" :eventName="null" :portraitBigDataParams='getBigDataParamStr(2063002,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})' :callBigDataParams='getBigDataParamStr(2063003,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})' :wechatBigDataParams='getBigDataParamStr(2063004,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})' :copyWechatBigDataParams='getBigDataParamStr(2063005,{"c_agent_id":agentId,"agent_id":agentId,"article_id":articleId})'></assistant>
   </div>
</template>

<script>
  import assistant from "@/components/common/assistant";

  export default {
    name: "houseDetail",
    components: { assistant },
    data() {
      return {
        cityId: this.$route.query.cityId,
        agentId: this.$route.query.agentId,
        articleId: this.$route.params.id,
        agent: {},
        buildingInformation:['即将开盘','地铁','有优惠','有视频']
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
      giveColor(index){
        return (index == 0 ? 'listItemColor':'listItemColor1')
      }
    }
  }
</script>
<style lang="less">
  @import "../../../src/less/xf/detail.less" ;
</style>
