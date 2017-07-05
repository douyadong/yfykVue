<template>
    <div class="xf-sources">
        <dl v-for="(source , index) in items" :key="source.estateId">
            <dt><img v-lazy="source.imageUrl + '?x-oss-process=image/resize,w_150'" class="img-responsive"></dt>
            <dd class="title">{{ source.estateName }}</dd>
            <dd class="summary">
                <span class="location-area">{{source.districtName}} {{source.townName}} {{ source.startSpace }}-{{ source.endSpace }} ㎡</span>
                <span class="price">{{ source.avgPriceWou }} 元/㎡</span>
            </dd>            
            <dd class="tags">
                <span v-if="source.isSoonOpen === '1'">即将开盘</span>
                <span v-else>在售楼盘</span>
                <span v-if="source.hasActivity === '1'">有优惠</span>
                <span v-if="source.isSubwayEstate === '1'">地铁</span>
                <span v-if="source.hasVideo === '1'">有视频</span>                                       
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
  name : "xfSources" ,
  data () {
    return {
        
    }
  } ,
  props : {
      items : {
          type : Array ,
          required : true
      }
    } ,
}
</script>
<style lang="less" scoped>
     @import "../../../src/less/components/xfSources.less" ;    
</style>