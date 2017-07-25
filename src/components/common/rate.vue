<template>
    <dl class="rate">
        <dt>
            <i class="iconfont icon-star-10" v-for="n in shi"></i>
            <i class="iconfont icon-star-5" v-if="hasSmall"></i>
        </dt>
        <dd class="content">{{ content }}</dd>
        <dd class="summary">买家 {{ rater }} | {{ date }}</dd> 
    </dl>
</template>

<script>
    export default {
        name : "rate" ,
        data () {
            return {
                
            }
        }  ,
        props : [ "shi" , "hasSmall" , "content" , "rater" , "date" ]       
    }
</script>
<style lang="less">
    @import "../../../src/less/components/rate.less" ;
</style>