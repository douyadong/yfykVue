<template>
  <div class="rent-sources">
    <div class="wk-panel single-source" :class="{space:statusStyle , underline: !statusStyle}"
         v-for=" (items , index) in dataItems" :key="items.encryptHouseId">
      <router-link :to="{ name: 'rentDetailShare', params: { houseId: items.encryptHouseId , agentId: agentId }}" :data-bigdata="getUvParamsString({eventName : eventName , houseId: items.encryptHouseId , otherParams : otherParams})">
        <div class="sources-content">
          <div class="pic">
            <img :src="items.firstImageUrl" alt="zhaopian">
          </div>
          <div class="desc">
            <h3>{{items.houseTitle || "--"}}</h3>
            <p class="position">
              {{items.houseTypeStr}} {{items.spaceArea}}㎡&nbsp;| {{items.districtAndTownName || "--"
              }}</p>
            <ul>
                 <li v-if="items.houseTag.isSubwayHouse === 1 ">近地铁</li>
                 <li v-if="items.houseTag.isPriceDown === 1 ">降价</li>
                 <li v-if="items.houseTag.isNewHouse === 1 ">新上</li>
                 <li v-if="items.houseTag.isHardcover === 1 ">精装</li>
                 <li v-if="items.houseTag.isSouth === 1 ">朝南</li>
            </ul>
            <p class="price"> {{items.rentPriceStr}} 元/月 </p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import config from "@/configs/api";
  import apiDataFilter from "@/libraries/apiDataFilter";
  let prefix = config.prefix[apiDataFilter.getEnv()];
  export default {
    name : "rentSources" ,
    data () {
      return {

      }
    } ,
    methods : {
      getUvParamsString : function( { eventName , houseId , otherParams }) {
        let eventParam = { rent_house_id : houseId } ;
        if(otherParams !== undefined && otherParams !== null ) {
          eventParam = Object.assign( eventParam , otherParams ) ;
        }
        return encodeURIComponent(JSON.stringify({
          eventName : eventName ,
          eventParam : eventParam ,
          type : 2
        })) ;
      } ,
    } ,
    props : [ "statusStyle" , "dataItems" ,"agentId" , "eventName" ,"otherParams"] ,  // statusStyle: Boolean  ，dataItems: Array[]
  }
</script>
<style lang="less" scoped>
  @import "../../../src/less/components/rentSources.less" ;
</style>
