<template>
    <div class="rate-list">
        <multi-rates :shi="apiData.simpleAgentCommentTag.shi" :hasSmall="apiData.simpleAgentCommentTag.hasSmall" :score="apiData.simpleAgentCommentTag.agentCommentScore" :tags="apiData.simpleAgentCommentTag.tags" />
    </div>
</template>

<script>
    import rate from "@/components/common/rate" ;
    import multiRates from "@/components/common/multiRates" ;
    export default {
        name : "spaceRateList" ,
        data () {
            return {
                apiData : {}
            }
        } ,
        components : {
            rate ,
            multiRates
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../less/space/rate/list.less" ; 
</style>
