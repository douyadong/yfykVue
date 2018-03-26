<template>
    <div class="wk-panel">
        <ul>
            <li>
                <h1>熟悉商圈</h1>
                <p>{{ apiData.agentBizTown }}</p>
            </li>
            <li v-if="apiData.agentIntroduction">
                <h1>自我介绍</h1>
                <p>{{apiData.agentIntroduction}}</p>
            </li>
            <li v-if="apiData.agentStory">
                <h1>成交故事</h1>
                <p>{{apiData.agentStory}}</p>
            </li>
        </ul>
    </div>    
</template>

<script>
    import apiDataFilter from "@/libraries/apiDataFilter" ;   
    export default {
      name : "spaceDetailHybrid" ,
      data () {
          return {
              apiData:{}
          }
      },
      created () {
          //获取经纪人信息
          let agentId=this.$route.params.agentId;
          apiDataFilter.request({
              apiPath : "space.detail" ,
              data : { "agentId" : agentId } ,
              successCallback : res => {
                  let agent = res.body.data.agentDetail ;
                  this.$data.apiData = agent ;
                  console.log(agent);
                  //页面标题和分享内容设置
                  let generalTitle = "悟空找房" + agent.agentName ;
                  let shareContent = agent.agentIntroduction || "我已收到80%客户的好评，欢迎随时联系" ;
                  document.title = generalTitle ;  //设置页面title
                  self.$nativeBridge.invokeMethod('updateTitle',[generalTitle],function(){
                    console.log("更新标题成功");
                  },function(){
                    console.log("更新标题失败");
                  })
                  //页面微信分享设置
                  this.$wechatShare({
                      "content" : shareContent ,
                      "imgUrl" : agent.agentHeadImgUrl ,
                      "success" : function() { console.log("分享成功！") ;  } ,
                      "fail" : function() { console.log("分享失败！") ;  } ,
                      "cancel" : function() { console.log("您取消了分享！") ; } ,
                      "complete" : function() { console.log("分享完成！") ; }
                  }) ;
              }
          }) ;
      } 
    }
</script>

<style lang="less" scoped>
    @import "../../../less/space/detail/hybrid.less" ;
</style>
