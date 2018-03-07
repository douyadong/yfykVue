<template>    
    <div id="learnOneTitle">
        <!--文章类别-->
        <essay-categories :activecategoryid="pageStates.categoryId" :activeonetitleid="pageStates.oneTitleId"></essay-categories>
        <!--文章条目-->
        <essays :items="apiData.essayItems"></essays>
        <infinite-loading :on-infinite="infiniteLoading" ref="infiniteLoading">
            <div slot="no-more" class="no-more">没有更多了！</div>
        </infinite-loading>
    </div>
</template>

<script>   
    import Vue from "vue" ;
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    加载工具
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/ 
    import apiDataFilter from "@/libraries/apiDataFilter";
    import InfiniteLoading from "vue-infinite-loading" ;
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    加载组件
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    import essayCategories from "@/components/common/essayCategories" ;
    import essays from "@/components/common/essays" ;   

    export default {
        name : "learnOneTitle" ,
        components : {
            essayCategories ,
            essays ,
            InfiniteLoading
        } ,    
        data () {
            return {
                "pageStates" : {
                    "startIndex" : 0 ,
                    "categoryId" : parseInt( this.$route.params.categoryId , 10) ,  //当前加载数据的第一级类别
                    "oneTitleId" : parseInt( this.$route.params.oneTitleId , 10) ,  //当前加载数据的第二级类别
                    "agentId" : this.$route.query.agentId  || null ,
                    "cityId" : this.$route.query.cityId  || null
                } ,
                "pageConfs" : {
                    "pageSize" : 20
                } ,
                "apiData" : {
                    "essayItems" : []                 
                }
            }
        }  ,        
        methods : {            
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            循环加载第二级类别文章列表，这里面比较搞的一点就是要查询这个oneTitleId下的第一个twoTitleId下的文章，这个经过协商由服务器端做兼容  ,入参里面有一个limit
            参数，0 代表不限定第一个子类别，1代表限定第一个子类别，这里要传1         
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/ 
            infiniteLoading : function() {
                /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                请求参数处理
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/ 
                let requestData = { "categoryId" : this.pageStates.categoryId , "oneTitleId" : this.pageStates.oneTitleId , "startIndex" : this.pageStates.startIndex , "pageSize" : this.pageConfs.pageSize , "limit" : 1 } ;                
               if(this.pageStates.agentId) requestData.agentId = parseInt( this.pageStates.agentId , 10 ) ; 
                if(this.pageStates.cityId) requestData.cityId = parseInt( this.pageStates.cityId , 10 ) ; 
                /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                请求数据并赋予模板变量
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/ 
                apiDataFilter.request({
                    apiPath : "learn.list" ,
                    method : "post" ,               
                    contentType : "application/json" , 
                    data : requestData ,
                    successCallback : res => {
                        let result = res.body.data ;
                        if(result) {
                            this.$data.apiData.essayItems = this.$data.apiData.essayItems.concat(result) ;  //将推荐文章数据累加                            
                            this.$data.pageStates.startIndex += result.length ;  //将取数据指针累加，方便上拉加载调用
                        }                        
                        this.$refs.infiniteLoading.$emit("$InfiniteLoading:loaded") ;  //标识本次数据加载完成
                        if(res.body.count === this.$data.apiData.essayItems.length) {
                            this.$refs.infiniteLoading.$emit("$InfiniteLoading:complete") ;  //标识所有数据加载完毕
                        }
                    }
                }) ;
            }        
        } ,        
        beforeRouteUpdate( to , from , next ) {
            this.pageStates.startIndex = 0 ;                                   
            this.pageStates.categoryId = parseInt( to.params.categoryId , 10 ) ;
            this.pageStates.oneTitleId = parseInt(  to.params.oneTitleId , 10 ) ; 
            this.pageStates.agentId = this.$route.query.agentId  || null ;
            this.pageStates.cityId = this.$route.query.cityId  || null ; 
            this.apiData.essayItems = [] ;
            this.infiniteLoading() ; 
            next() ;
        }
    }
</script>

<style lang="less">

</style>
