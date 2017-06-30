<template>
    <div id="spaceDetailShare">
        <assistant :agent="simpleAgentModel" houseId="" :eventName="assistantTelEventName" />
        <div class="wk-panel card">
            <dl>
                <dt><img src=""></dt>
                <dd>
                    <div class="agent-name">
                        <span class="name">程茂盛</span>
                        <span class="good"></span>
                    </div>
                    <div class="volume">
                        <i class="iconfont"></i>
                        <span>成交 100 套</span>
                    </div>
                </dd>
                <dd>志远地产 | 虹桥店</dd>
            </dl>
            <hr>
            <a href="#">查看更多</a>
            <dl>
                <dt>熟悉商圈</dt>
                <dd>长宁区虹桥、古北、仙霞板块，虹许路</dd>
            </dl>
            <hr>
            <dl>
                <dt>自我介绍</dt>
                <dd>五年成功的房产经纪经验，促成了1000多套不动产的交易达成，是个不折不扣的销售牛人，不服来战</dd>
            </dl>
            <hr>
            <dl>
                <dt>成交故事</dt>
                <dd>王先生看中一套静安区的900万的房子苦于没钱，百般无赖找到了我，最终我卖血抽签买好送给他了，这才叫友邦保险白求恩吧！</dd>
            </dl>
        </div>
        
    </div>    
</template>

<script>
    import assistant from "@/components/common/assistant" ;
    export default {
      name : "spaceDetailShare" ,
      data () {
          return {
              simpleAgentModel : {} ,              
              assistantTelEventName : 201705
          }
      } ,
      components : {
          assistant
      }
    }
</script>

<style lang="less" scoped>
    
</style>
