<template>
    <div class="essay-categories">
        <!--第一级类别-->
        <div class="category">
            <div :style="'width:' + pageStates.categoriesWidth + 'px'">
                <a href="/learn" class="on">推荐</a>
                <a :href="category.url" :class="{ 'has-child' : category.firstSubTitleList && category.firstSubTitleList.length }" :data-id="category.categoryId" @click="spreadSubCategory" v-for="category in apiData.categoryList" :key="category.categoryId">{{ category.title }}</a>     
            </div>
        </div>
        <!--第二级类别-->
        <div class="subcategory" :id="'essayCategory' + category.categoryId + 'ChildList'" v-for="category in apiData.hasChildCategoryList" :key="category.categoryId">
            <div>
                <a :href="subCategory.url" v-for="subCategory in category.firstSubTitleList" :key="subCategory.categoryId">{{ subCategory.title }}</a>                    
            </div>
        </div>
    </div>
</template>

<script>
    import mockData from "../../../mock/essay/index" ;
    import $ from "jquery" ;
    export default {
        name : "essayCategories" ,      
        data () {            
            return {
                "pageStates" : {
                    "categoriesWidth" : 0  //以及菜单的总宽度
                } ,
                "apiData" : {
                    "categoryList" : [] ,
                    "hasChildCategoryList" : []
                }
            }
        } ,       
        props : [] ,
        methods : {
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            点击一级菜单弹出子菜单
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/ 
            spreadSubCategory(event) {
                if( ! $(event.target).hasClass("has-child")) return ;
                $(".essay-categories .subcategory").hide() ;
                let $subCategoryContainer = $("#essayCategory" + $(event.target).data("id") + "ChildList") ;
                $subCategoryContainer.slideDown("200" , function(){
                    //展开后要再计算二级类别总宽度，再赋予容器
                    let subCategoriesWidth = 0 ;
                    $subCategoryContainer.find("a").each(function(){                    
                        subCategoriesWidth += ($(this).width() +40) ;
                    }) ;
                    $subCategoryContainer.find("div").css({ "width" : subCategoriesWidth + "px" }) ;
                }) ;
            }
        } ,
        created() {
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            将mock数据进行处理并赋予模块变量
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/            
            this.apiData.categoryList = mockData.data.categoryList ;
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            整理出有二级类别的文章类别            
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            let hasChildCategoryList = [] ;
            mockData.data.categoryList.forEach(( category , index ) => {
                let firstSubTitleList = category.firstSubTitleList ;
                if( firstSubTitleList && firstSubTitleList !== undefined && firstSubTitleList.length > 0 ) hasChildCategoryList.push(category) ;
            }) ;
            this.apiData.hasChildCategoryList = hasChildCategoryList ;
        } ,
        mounted() {
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            计算出所有一级菜单的宽度
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            let categoriesWidth = 0 ;            
            $(".essay-categories .category div a").each(function() {                             
                categoriesWidth += ($(this).width() * 2 + 35) ;  //35是什么概念：每个菜单有15px的左右margin，一起就是30，再放5px
            }) ; 
            this.pageStates.categoriesWidth = categoriesWidth ;
        }
    }
</script>
<style lang="less">
    @import "../../../src/less/components/essayCategories.less" ;
</style>