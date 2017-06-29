<template>
    <div>
        <assistant :agent="simpleAgentModel" :houseId="simpleHouseRentDetailInfo.houseId" :eventName="assistantTelEventName"></assistant>
       <download-app />
       <albums :items="simpleHouseRentDetailInfo.houseImageAndVideoList" :houseId="simpleHouseRentDetailInfo.houseId" :eventName="albumsEventName"></albums>
    </div>    
</template>

<script>
    import downloadApp from "@/components/downloadApp" ;
    import assistant from "@/components/assistant" ;
    import albums from "@/components/albums" ;
    import ApiDataFilter from "@/libraries/apiDataFilter" ;
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
          let adf = new ApiDataFilter(this.$http) ;
          adf.request({
              apiPath : "rent.detail" ,
              data : { "houseId" : houseId , "agentId" : agentId } ,
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
    
</style>
