<template>
    <dl class="rate">
        <dt>
            <i class="iconfont icon-star-10" v-for="(n ,index) in score" :key="index"></i>            
        </dt>
        <dd class="content">{{ content }}</dd>
        <dd class="summary">{{ rater }} | {{ date }}</dd> 
    </dl>
</template>

<script>
    export default {
        name : "rate" ,
        data () {
            return {
                
            }
        }  ,
        props : [ "score" , "content" , "rater" , "date" ]       
    }
</script>
<style lang="less">
    @import "../../../src/less/components/rate.less" ;
</style>