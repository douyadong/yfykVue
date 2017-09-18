<template>
  <div class="xf-status">
    <div class="base"></div>
    <div class="building-status">
      <div class="single-status" v-for="(item , index) in getInfoData.buildingStatus" :key="item.id">
        <h3>{{item.title}}</h3>
        <p class="content">{{item.content}}</p>
        <p class="time">{{item.publishTimeStr}}</p>
      </div>
    </div>

  </div>
</template>

<script>
  import data from '../../../mock/xf/detail';

  export default {
    name: "xfStatus",
    data() {
      return {
        getInfoData:{
          buildingStatus: data.data.newHouseDetail.newHouseDynamicList
        }
      }
    },
    methods:{

    }
  }
</script>
<style lang="less">
  @import "../../../src/less/xf/status.less" ;
</style>
