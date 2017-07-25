<template>
    <div class="rate-list lr-padding">
        <multi-rates :shi="apiData.agentDetail.shi" :hasSmall="apiData.agentDetail.hasSmall" :score="apiData.agentDetail.agentCommentScore" :tags="apiData.agentDetail.tags" />
        <rate :score="rate.score" :content="rate.content" :rater="rate.customerName" :date="rate.createTimeStr"  :key="rate.id" v-for="( rate , index ) in apiData.rates"  />
        <infinite-loading :on-infinite="infiniteLoading" ref="infiniteLoading">
            <div slot="no-more" class="no-more">没有更多了！</div>
        </infinite-loading>
    </div>
</template>

<script>
    import rate from "@/components/common/rate" ;
    import multiRates from "@/components/common/multiRates" ;
    import apiDataFilter from "@/libraries/apiDataFilter" ;
    import InfiniteLoading from "vue-infinite-loading" ;
    export default {
        name : "spaceRateList" ,
        data () {
            return {
                pageStates : {
                    startIndex : 0  //当前页数据起始页数
                } ,
                pageConfs : {
                    pageSize : 10  //评价信息每次加载多少条
                } ,
                apiData : {
                    agentDetail : [] ,
                    rates : []
                }
            }
        } ,
        methods : {
            //无限加载评价数据
            infiniteLoading() {
                let agentId = this.$route.params.agentId ; 
                apiDataFilter.request({
                    apiPath : "space.rate" ,
                    data : { "agentId" : agentId , "startIndex" : this.pageStates.startIndex , "pageSize" : this.pageConfs.pageSize } ,              
                    successCallback : res => {
                        let result = res.body.data.simpleAgentCommentList ; 
                        this.$data.apiData.rates = this.$data.apiData.rates.concat(result) ;  //将评价数据累加
                        this.pageStates.startIndex += result.length ;  //将取数据指针累加，方便上拉加载调用
                        this.$refs.infiniteLoading.$emit("$InfiniteLoading:loaded") ;  //标识本次数据加载完成
                        if(res.body.data.page.total === this.$data.apiData.rates.length) {
                            this.$refs.infiniteLoading.$emit("$InfiniteLoading:complete") ;  //标识所有数据加载完毕
                        }
                    }
                }) ;
            }
        } ,
        created() {
            let agentId = this.$route.params.agentId ; 
            //获取经纪人信息 
            apiDataFilter.request({
                apiPath : "space.detail" ,
                data : { "agentId" : agentId } ,              
                successCallback : res => {                    
                    this.$data.apiData.agentDetail = res.body.data.agentDetail ;                     
                }
            }) ; 

        } ,
        components : {
            rate ,
            multiRates ,
            InfiniteLoading
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../less/space/rate/list.less" ; 
</style>
