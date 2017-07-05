<template>
    <div class="esf-sources">
        <dl v-for="(source , index) in items" :key="source.encryptHouseId">
            <dt><img v-lazy="source.houseImgUrl + '?x-oss-process=image/resize,w_150'"></dt>
            <dd class="title">{{ source.houseTitle }}</dd>
            <dd>{{ source.houseChild }} {{ source.areaStr }} | {{ source.district }} {{ source.town }}</dd>
            <dd class="tags">
                <span class="selected" v-if="source.isTopHouse >1">精选</span>         
                <span v-else-if="source.isStorePush === 1">店长推荐</span>
                <span v-else-if="source.commAgent > 0">急售</span>
                <span v-if="source.fullYears >= 5 && source.onlyOne == 1">满五唯一</span>
                <span v-if="source.fullYears >= 2">满二</span>
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
    </div>
</template>

<script>
export default {
  name : "esfSources" ,
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
     @import "../../../src/less/components/esfSources.less" ;    
</style>