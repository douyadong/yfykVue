<template>    
    <div class="essay-categories">        
        <!--第一级类别-->
        <div class="category" v-if=" ! activeonetitleid">
            <div :style="'width:' + pageStates.categoriesWidth + 'px'">
                <router-link :class="{ 'on' : ! activecategoryid }" to="/learn">推荐</router-link>
                <router-link :to="{ path : '/learn/' + category.categoryId }" :class="{ 'on' : activecategoryid == category.categoryId }" v-for="category in apiData.categoryList" :key="category.id">{{ category.title }}</router-link>
            </div>
        </div>
        <!--第二级类别-->
        <div class="oneTitle" :class="{ 'visible' : activecategoryid == category.categoryId }" :id="'oneTitle' + category.categoryId" v-for="category in apiData.oneTitleList" :key="category.categoryId" v-if=" ! activeonetitleid">
            <div :style="'width:' + pageStates.oneTitleWidth + 'px'">
                <router-link :to="{ path : '/learn/' + category.categoryId + '/' + oneTitle.id }" v-for="oneTitle in category.oneTitles" :key="oneTitle.id">{{ oneTitle.title }}</router-link>
            </div>
        </div>
        <!--第三级tabs菜单-->
        <div class="wk-tabs twoTitle" v-for="oneTitle in apiData.twoTitleList" :id="'twoTitle' + oneTitle.oneTitleId" :key="oneTitle.oneTitleId" v-if="activeonetitleid == oneTitle.oneTitleId">
            <ul class="tabs-handle">
                <li v-for="( twoTitle , index )  in oneTitle.twoTitles" :key="index"><router-link :class="{ 'on' : activetwotitleid == twoTitle.id || ( index == 0 && ! activetwotitleid ) }" :to="{ path : '/learn/' + oneTitle.categoryId + '/' + oneTitle.oneTitleId + '/' + twoTitle.id }">{{ twoTitle.title }}</router-link></li>
            </ul>
        </div>

    </div>
</template>

<script>
    import Vue from "vue" ;
    import apiDataFilter from "@/libraries/apiDataFilter" ;
    import $ from "jquery" ;
    export default {
        name : "essayCategories" ,      
        data () {            
            return {
                "pageStates" : {
                    "categoriesWidth" : 2000 , //第一级菜单的总宽度
                    "oneTitleWidth" :''//第二级菜单宽度;
                } ,
                "apiData" : {
                    "categoryList" : [] ,
                    "oneTitleList" : [] ,
                    "twoTitleList" : []
                }
            }
        } ,
        props : [ "activecategoryid" , "activeonetitleid" , "activetwotitleid" ] ,   
        created() { 
            this.watchRoute();//监听路由变化，动态改变二级标题列表宽度;           
        },
        methods :{
            // 监听路由变化，实时发送请求，动态改变二级菜单宽度;
            watchRoute(){
                apiDataFilter.request({
                    apiPath : "learn.category" ,
                    method : "post" ,
                    data : { "cityId" : 43 } ,
                    contentType : "application/json" , 
                    successCallback : res => {
                        let initData = res.body.data ;
                        let categoryList = [] ;
                        let oneTitleList = [] ;
                        let twoTitleList = [] ;               
                        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                        按照以下格式要求整理出所有三个级别类别的文章类别数据
                        categoryList的格式如下：
                        [
                            {"categoryId":22,"oneTitleCount":2,"title":"百科"},
                            {"categoryId":23,"oneTitleCount":0,"title":"知乎"}
                        ]
                        oneTitleList的格式如下：
                        [
                            {"categoryId":22,oneTitles:[{"id":123,"title":"购房"},{"id":124,"title":"卖房"}] },
                            {"categoryId":25,oneTitles:[{"id":125,"title":"装修"},{"id":126,"title":"物业"}] }
                        ]
                        twoTitleList的格式如下：
                        [
                            {"categoryId":22,"oneTitleId":22,twoTitles:[{"id":123,"title":"购房"},{"id":124,"title":"卖房"}] },
                            {"categoryId":22,"oneTitleId":25,twoTitles:[{"id":125,"title":"装修"},{"id":126,"title":"物业"}] }
                        ]
                        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/                    
                        initData && initData.forEach(( category ) => {
                            let firstSubTitleList = category.firstSubTitleList && category.firstSubTitleList !== undefined ? category.firstSubTitleList : []  ;
                            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                            重新组织categoryList和oneTitleList数据
                            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/ 
                            categoryList.push({
                                "categoryId" : category.id ,
                                "oneTitleCount" : firstSubTitleList.length ,
                                "title" :  category.title
                            }) ;
                            oneTitleList.push({
                                "categoryId" : category.id ,
                                "oneTitles" : firstSubTitleList
                            }) ;                        
                            firstSubTitleList.forEach(( oneTitle ) => {                            
                                /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                重新组织twoTitleList数据
                                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
                                twoTitleList.push({
                                    "categoryId" : category.id ,
                                    "oneTitleId" : oneTitle.id ,
                                    "twoTitles" : oneTitle.secondSubTitleList
                                }) ;
                            }) ;
                        
                        }) ;                    
                        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                        数据绑定
                        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/            
                        this.apiData.categoryList = categoryList ;
                        this.apiData.oneTitleList = oneTitleList ;
                        this.apiData.twoTitleList = twoTitleList ;
                        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                        下一次dom节点更新完后执行         
                        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
                        Vue.nextTick(() => {
                            let categoriesWidth = 0 ;   //第一级类别;
                            let oneTitleWidth = 0 ;//第二级类别;                   
                            $(".essay-categories .category div a").each(function() {
                                let charCount = $(this).text().length ;                           
                                categoriesWidth += ( charCount * 16 + 30 + 1 ) ; 
                            }) ; 
                            $(".essay-categories .oneTitle.visible a").each(function() {
                                let seedCount = $(this).text().length ;                          
                                oneTitleWidth += ( seedCount * 14 + 30 + 5 ) ; 
                            }) ; 
                            this.pageStates.categoriesWidth = categoriesWidth ;
                            this.pageStates.oneTitleWidth = oneTitleWidth ;
                        }) ;                    
                    
                    }
                }) ; 
            }
        },
        watch:{
            "$route":"watchRoute"
        }
    }
</script>
<style lang="less">
    @import "../../../src/less/components/essayCategories.less" ;
</style>