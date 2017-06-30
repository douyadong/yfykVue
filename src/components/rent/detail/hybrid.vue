<template>
    <div id="rentDetailHybrid">
        <assistant :agent="simpleAgentModel" :houseId="simpleHouseRentDetailInfo.houseId" :eventName="assistantTelEventName" />
       <download-app />
       <albums :items="simpleHouseRentDetailInfo.houseImageAndVideoList" :houseId="simpleHouseRentDetailInfo.houseId" :eventName="albumsEventName" />
       <!--房源概要部分-->
       <div class="wk-panel summary">
            <div class="panel-header">
                <h1>{{ simpleHouseRentDetailInfo.subEstateName }}</h1>
                <div class="money">{{ simpleHouseRentDetailInfo.rentPrice }} 元 / 月</div>
            </div>
            <div  class="panel-body lr-padding tb-padding">
                <ul class="column-3">
                    <li><dl><dt>付款方式</dt><dd>{{ simpleHouseRentDetailInfo.payTypeStr }}</dd></dl></li>
                    <li><dl><dt>户型</dt><dd>{{ simpleHouseRentDetailInfo.houseTypeStr }}</dd></dl></li>
                    <li><dl><dt>面积</dt><dd>{{ simpleHouseRentDetailInfo.spaceArea }} m&sup2;</dd></dl></li>
                </ul>
                <hr>
                <ul class="outline">
                    <li class="percent-70"><dl><dt>类型</dt><dd>{{ simpleHouseRentDetailInfo.houseChildTypeStr }}</dd></dl></li>
                    <li class="percent-30"><dl><dt>装修</dt><dd>{{ simpleHouseRentDetailInfo.renovationStr }}</dd></dl></li>
                    <li class="percent-70"><dl><dt>楼层</dt><dd>{{ simpleHouseRentDetailInfo.floor }}/{{ simpleHouseRentDetailInfo.totalfloor }}层</dd></dl></li>
                    <li class="percent-30"><dl><dt>朝向</dt><dd>{{ simpleHouseRentDetailInfo.orientationStr }}</dd></dl></li>
                    <li class="percent-100"><dl><dt>地址</dt><dd>{{ simpleHouseRentDetailInfo.subEstateInitName }}</dd></dl></li>
                </ul>
                <hr>
                <ul class="subway-school">
                    <li><dl><dt>地铁</dt><dd>{{ simpleHouseRentDetailInfo.subwayStr }}</dd></dl></li>
                    <li><dl><dt>学校</dt><dd>{{ simpleHouseRentDetailInfo.schoolStr }}</dd></dl></li>           
                </ul>
            </div>
        </div>
        <!--房源配套部分-->
        <div class="wk-panel support top-gap">
            <div class="panel-header">房源配套</div>
            <ul  class="panel-body  lr-padding tb-padding">
                <li :class=" { no : !simpleHouseRentDetailInfo.houseSupporting.hasBad }">床</li>
                <li :class=" { no : !simpleHouseRentDetailInfo.houseSupporting.hasWardrobe }">衣柜</li>
                <li :class=" { no : !simpleHouseRentDetailInfo.houseSupporting.hasBalcony }">阳台</li>
                <li :class=" { no : !simpleHouseRentDetailInfo.houseSupporting.hasHeating }">暖气</li>
                <li :class=" { no : !simpleHouseRentDetailInfo.houseSupporting.hasGas }">煤气</li>
                <li :class=" { no : !simpleHouseRentDetailInfo.houseSupporting.hasWashMachine }">洗衣机</li>
                <li :class=" { no : !simpleHouseRentDetailInfo.houseSupporting.hasFridge }">冰箱</li>
                <li :class=" { no : !simpleHouseRentDetailInfo.houseSupporting.hasMicrowave }">微波炉</li>
                <li :class=" { no : !simpleHouseRentDetailInfo.houseSupporting.hasWaterHeater }">热水器</li>
                <li :class=" { no : !simpleHouseRentDetailInfo.houseSupporting.hasAirConditioning }">空调</li>       
                <li :class=" { no : !simpleHouseRentDetailInfo.houseSupporting.hasTV }">电视机</li>
                <li :class=" { no : !simpleHouseRentDetailInfo.houseSupporting.hasInternet }">宽带</li>
            </ul>
        </div>
        <!--房源描述部分-->
        <div class="wk-panel description top-gap">
            <div class="panel-header">房源描述</div>
            <div  class="panel-body  lr-padding tb-padding">
                <dl><dt>主要卖点</dt><dd>{{ simpleHouseRentDetailInfo.sellPoint || "暂无描述" }}</dd></dl>
                <dl><dt>业主心态</dt><dd>{{ simpleHouseRentDetailInfo.ownerMotivation || "暂无描述" }}</dd></dl>
                <dl><dt>周边配套</dt><dd>{{ simpleHouseRentDetailInfo.aroundSupport || "暂无描述" }}</dd></dl>
            </div>
        </div>
        <!--位置及周边部分-->
        <div class="wk-panel location top-gap">
            <div class="panel-header">位置及周边</div>
            <div class="location-container">
                <img :src="'https://api.map.baidu.com/staticimage/v2?ak=GByG2pAz1WlmY7wX1rlIM4nd&width=640&height=426&center=' + simpleHouseRentDetailInfo.longitude + ',' + simpleHouseRentDetailInfo.latitude + '&zoom=18'" class="img-responsive">
                <div class="cover">
                    <p><i class="iconfont icon-dingwei"></i>地址：{{ simpleHouseRentDetailInfo.subEstateInitName }}</p>            
                </div>
                <div class="mark"><i class="iconfont icon-dingwei"></i></div>
            </div>    
        </div>
        <!--结束-->
    </div>    
</template>

<script>
    import downloadApp from "@/components/common/downloadApp" ;
    import assistant from "@/components/common/assistant" ;
    import albums from "@/components/common/albums" ;
    import apiDataFilter from "@/libraries/apiDataFilter" ;
    export default {
      name : "rentDetailHybrid" ,
      data () {
          return {
              simpleHouseRentDetailInfo : {} ,
              simpleAgentModel : {} ,
              weChatShare : {} ,
              assistantTelEventName : 2057002 ,  //电话咨询按钮埋点参数值
              albumsEventName : 2057001  //相册图片埋点参数值
          }
      } ,
      created() {          
          let houseId = this.$route.params.houseId ;
          let agentId = this.$route.params.agentId ;         
          apiDataFilter.request({
              apiPath : "rent.detail" ,
              data : { "houseId" : houseId , "agentId" : agentId } ,
              method : "jsonp" ,
              successCallback : res => {                 
                  Object.assign(this.$data , res.body.data) ;                                    
              }
          }) ;
      } ,
      components : {
          downloadApp ,
          assistant ,
          albums
      }
    }
</script>

<style lang="less" scoped>
    @import "../../../../src/less/rent/detail.less" ;   
</style>