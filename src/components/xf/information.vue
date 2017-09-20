<template>
  <div class="xf-info" >
    <div class="base"></div>
    <div class="info info-line">
      <p>楼盘地址<span>{{infoData.initName || "--"}}</span></p>
      <p>所属区域<span>{{infoData.districtName}} {{infoData.townName}}</span></p>
      <p>开发商<span>{{infoData.developers || "--"}}</span></p>
      <p>售楼处地址<span>{{infoData.saleAddress || "--"}}</span></p>
    </div>
    <div class="info info-line" >
      <p>产权年限<span>{{infoData.propertyRight || "--"}}</span></p>
      <p>装修标准<span v-if="infoData.buildDecoration === 1 ">毛坯</span><span v-else="infoData.buildDecoration === 2">精装</span><span v-else="infoData.buildDecoration === 3">豪装</span></p>
      <p>规划户数<span>{{infoData.developers || "--"}}</span></p>
      <p>规划车位<span class="desc">{{infoData.parkingSpace || "--"}}</span></p>
      <p>容积率<span class="desc">{{infoData.volumeRate || "--"}}</span></p>
      <p>绿化率<span class="desc">{{infoData.greenRate || "--"}}%</span></p>
    </div>
    <div class="info " >
      <p>物业类型<span class="desc">{{infoData.propertyTypeStr || "--"}}</span></p>
      <p>物业公司<span class="desc">{{infoData.propertyCompany || "--"}}</span></p>
      <p>物业费<span class="desc">{{infoData.propertyCharges || "--"}}</span></p>
    </div>

  </div>
</template>

<script>
  import data from '../../../mock/xf/infos';

  export default {
    name: "xfInfo",
    data() {
      return {
          infoData:data.data
      }
    },
    methods:{

    }
  }
</script>
<style lang="less">
  @import "../../../src/less/xf/information.less" ;
</style>
