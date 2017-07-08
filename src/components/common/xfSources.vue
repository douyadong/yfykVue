<template>
    <div class="xf-sources">
        <a :href="getRedirectUrl(source.subEstateIdUrl)" v-for="(source , index) in items" :key="source.estateId" :data-bigdata="getUvParamsString({ eventName : eventName , estateId : source.estateId , otherParams : otherParams })">
            <dl>
                <dt><img v-lazy="source.imageUrl + '?x-oss-process=image/resize,w_150'" class="img-responsive"></dt>
                <dd class="title">{{ source.estateName }}</dd>
                <dd class="summary"> {{source.districtName}} {{source.townName}} {{ source.startSpace }}-{{ source.endSpace }} ㎡ </dd>            
                <dd class="tags">
                    <span v-if="source.isSoonOpen === '1'">即将开盘</span>
                    <span v-else>在售楼盘</span>
                    <span v-if="source.hasActivity === '1'">有优惠</span>
                    <span v-if="source.isSubwayEstate === '1'">地铁</span>
                    <span v-if="source.hasVideo === '1'">有视频</span>                                       
                </dd>
                <dd class="price">{{ source.avgPriceWou }} 元/㎡</dd>
            </dl>
        </a>
    </div>
</template>

<script>
import config from "@/configs/api";
import apiDataFilter from "@/libraries/apiDataFilter";
let prefix = config.prefix[apiDataFilter.getEnv()];
export default {
  name : "xfSources" ,
  data () {
    return {
        
    }
  } ,
  methods : {
      getUvParamsString : function({ eventName , estateId , otherParams }) {
          let eventParam = { new_house_id : estateId } ;
          if(otherParams !== undefined && otherParams !== null ) {
              eventParam = Object.assign( eventParam , otherParams ) ;
          }              
          return encodeURIComponent(JSON.stringify({ 
              eventName : eventName , 
              eventParam : eventParam ,
              type : 2
          })) ;
      } ,
      getRedirectUrl : function(url) {
          return prefix+url;//"https://m.wkzf.com/shanghai/xfdetail/" + encryptEstateId + ".html" ;
      }
  } ,
  props : [ "items" , "eventName" , "otherParams" ] ,
}
</script>
<style lang="less" scoped>
     @import "../../../src/less/components/xfSources.less" ;    
</style>