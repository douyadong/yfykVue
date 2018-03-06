<template>    
    <div id="learnIndex">
        <!--文章类别-->
        <essay-categories></essay-categories>
        <!--文章条目-->
        <essays :items="apiData.essayItems"></essays>
    </div>
</template>

<script>   
    import Vue from "vue" ;    
    import essayCategories from "@/components/common/essayCategories" ;
    import essays from "@/components/common/essays" ;
    import mockData from "../../../mock/essay/index" ;

    export default {
        name : "learnIndex" ,
        components : {
            essayCategories ,
            essays
        } ,    
        data () {
            return {
                "apiData" : {
                    "essayItems" : mockData.data.articleList                  
                }
            }
        }  ,
        created() {
        
        } ,
        methods : {
        
        }
    }
</script>

<style lang="less">

</style>
