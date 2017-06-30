<template>
    <div>
        <assistant :agent="simpleAgentModel" :houseId="simpleHouseRentDetailInfo.houseId" :eventName="assistantTelEventName" />
       <download-app />
       <albums :items="simpleHouseRentDetailInfo.houseImageAndVideoList" :houseId="simpleHouseRentDetailInfo.houseId" :eventName="albumsEventName" />
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
    
</style>