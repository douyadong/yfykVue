<template>
    <dl class="multi-rates" v-if="score">
        <dt>
            <span>综合得分：</span>
            <i class="iconfont icon-star-10" v-for="(n ,index) in shi" :key="index"></i>
            <i class="iconfont icon-star-5" v-if="hasSmall"></i>
            <span class="number">{{ score }}</span>
        </dt>
        <dd class="tags">
            <span v-for="(tag , index) in tags" :key="index" :class="{ bad : parseInt( tag.type , 10 ) === 2 }">{{ tag.label }} [ {{ tag.count }} ]</span>            
        </dd>
    </dl>
</template>

<script>
    export default {
        name : "multiRates" ,
        data () {
            return {
                
            }
        }  ,
        props : [ "shi" , "hasSmall" , "score" , "tags" ]       
    }
</script>
<style lang="less">
    @import "../../../src/less/components/multiRates.less" ;
</style>