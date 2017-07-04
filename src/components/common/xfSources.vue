<template>
    <div class="xf-sources">
        <dl v-for="(source , index) in items">
            <dt><img v-lazy="source.pictUrl" class="img-responsive"></dt>
            <dd class="title">{{ source.title }}</dd>
            <dd class="summary">
                <span class="location-area">{{ source.location }} {{ source.area }}</span>
                <span class="price">{{ source.price }} 元/㎡</span>
            </dd>            
            <dd class="tags">
                <span v-for="tag in source.tags">{{ tag }}</span>                          
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