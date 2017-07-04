<template>
    <div class="esf-sources">
        <dl v-for="(source , index) in items">
            <dt><img v-lazy="source.pictUrl"></dt>
            <dd class="title">{{ source.title }}</dd>
            <dd>
                <span>{{ source.layout }} {{ source.area }} ㎡</span>
                <span class="money">{{ source.money }} 万</span>
            </dd>
            <dd>
                <span>{{ source.directName }} {{ source.townName }}</span>
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