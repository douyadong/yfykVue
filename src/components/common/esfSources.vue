<template>
    <div class="esf-sources">
        <a :href="getRedirectUrl(source.encryptHouseId)" v-for="(source , index) in items" :key="source.houseId" :data-bigdata="getUvParamsString({ eventName : eventName , houseId : source.houseId , otherParams : otherParams })">
            <dl>
                <dt><img v-lazy="source.houseImgUrl + '?x-oss-process=image/resize,w_150'"></dt>
                <dd class="title">{{ source.houseTitle }}</dd>
                <dd>{{ source.houseChild }} {{ source.areaStr }} | {{ source.district }} {{ source.town }}</dd>
                <dd class="tags">
                    <span class="selected" v-if="source.isTopHouse >1">精选</span>         
                    <span v-else-if="source.isStorePush === 1">店长推荐</span>
                    <span v-else-if="source.commAgent > 0">急售</span>
                    <span v-if="source.fullYears >= 5 && source.onlyOne == 1">满五唯一</span>
                    <span v-else-if="source.fullYears >= 2">满二</span>
                    <span v-if="source.isSubwayHouse === 1">地铁</span>
                    <span v-if="source.isSchoolHouse === 1">近学校</span>
                    <span v-if="source.isNewOnStore === 1">新上</span>
                    <span v-if="source.orientation === 9">南北通透</span>                        
                </dd>
                <dd>
                    <span class="money">{{ source.totalPrice }} 万</span>
                    <span class="price">{{ source.unitPrice }} 元/㎡</span>
                </dd>            
            </dl>
        </a>
    </div>
</template>

<script>
import config from "@/configs/api";
import apiDataFilter from "@/libraries/apiDataFilter";
let prefix = config.prefix[apiDataFilter.getEnv()];
export default {
  name : "esfSources" ,
  data () {
    return {
        
    }
  } ,
  methods : {
      getUvParamsString : function({ eventName , houseId , otherParams }) {
          let eventParam = { house_id : houseId } ;
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
          return prefix + '/share/' +  url + '.html?agentId='+ this.agentId+'&cityId='+this.cityId;//"https://m.wkzf.com/shanghai/esf/" + encryptHouseId + ".html" ;
      }
  } ,
  props : [ "items" , "eventName" , "otherParams", "agentId", "cityId" ] ,
}
</script>
<style lang="less" scoped>
     @import "../../../src/less/components/esfSources.less" ;    
</style>