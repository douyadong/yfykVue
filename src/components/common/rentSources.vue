<template>
  <div class="rent-sources">
   <div class="wk-panel single-source" :class="{space:statusStyle , underline: !statusStyle}" v-for=" (items , index) in dataItems" :key="items.houseId">
     <div class="pic">
       <img :src="items.firstImageUrl" alt="zhaopian">
     </div>
     <div class="desc">
       <h3>{{items.subEstateName}}</h3>
       <p class="position">{{items.spaceArea}}㎡ &nbsp;|&nbsp; {{items.orientationStr}} &nbsp;|&nbsp; {{items.renovationStr || "--" }}</p>
       <p class="price">{{items.houseTypeStr}} <span>{{items.rentPrice}} 元/月</span></p>
     </div>
   </div>
  </div>
</template>

<script>
//  import config from "@/configs/api";
//  import apiDataFilter from "@/libraries/apiDataFilter";
//  let prefix = config.prefix[apiDataFilter.getEnv()];
  export default {
    name : "rentSources" ,
    data () {
      return {

      }
    } ,
    methods : {
//      getUvParamsString : function({ eventName , estateId , otherParams }) {
//        let eventParam = { new_house_id : estateId } ;
//        if(otherParams !== undefined && otherParams !== null ) {
//          eventParam = Object.assign( eventParam , otherParams ) ;
//        }
//        return encodeURIComponent(JSON.stringify({
//          eventName : eventName ,
//          eventParam : eventParam ,
//          type : 2
//        })) ;
//      } ,
//      getRedirectUrl : function(url) {
//        return prefix+ "/sharexf/" + url + ".html?agentId=" + this.agentId + "&cityId="+this.cityId;//"https://m.wkzf.com/shanghai/xfdetail/" + encryptEstateId + ".html" ;
//      }
    } ,
    props : [ "statusStyle" , "dataItems" ] ,  // statusStyle: Boolean  ，dataItems: Array[]
  }
</script>
<style lang="less" scoped>
  @import "../../../src/less/components/rentSources.less" ;
</style>111
