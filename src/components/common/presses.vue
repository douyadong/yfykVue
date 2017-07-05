<template>
    <div class="presses">
        <dl v-for="(press , index) in items">
            <dt>{{ press.title }}</dt>
            <dd class="digest">{{ press.digest }}</dd>
            <dd class="outline top-gap">
                <div class="pull-left">悟空原创 3 小时前</div>
                <div class="pull-right"><span class="pv">{{ press.pv }}</span> <span>次浏览</span></div>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
  name : "presses" ,
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
     @import "../../../src/less/components/presses.less" ;    
</style>