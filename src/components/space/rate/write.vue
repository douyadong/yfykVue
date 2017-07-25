<template>
    <div class="write-rate">
        <div class="header">
            <div class="head-portrait"><img src="https://img.wkzf.com/a1a5f29466904f84a8c897981b372bd7?x-oss-process=image/resize,w_60"></div>
            <h2>王大明</h2>
            <span class="good">好</span>
        </div>        
        <fieldset><legend>为经纪人评分</legend></fieldset>
        <div class="stars">
            <i class="iconfont icon-star" v-for="n in 5" @click="checkStar"></i>            
        </div>
        <transition  name="slide-fade">
            <div class="tags" v-if="pageStates.starCount > 0 && pageStates.starCount < 4">            
                <span v-for="( tag , index ) in apiData.badTags" :data-value="tag.value" @click="checkTag">{{ tag.label }}</span>            
            </div>
        </transition>
        <transition  name="slide-fade">
            <div class="tags" v-if="pageStates.starCount > 3 && pageStates.starCount < 6">            
                <span v-for="( tag , index ) in apiData.goodTags" :data-value="tag.value"  @click="checkTag">{{ tag.label }}</span>
            </div>
        </transition>
        <textarea placeholder="经纪人的服务您还满意吗？您的评价将督促我们不断进步!"></textarea>
        <div class="switch">
            <span>匿名评价</span>
        </div>
        <div class="submit"><button class="wk-btn wk-btn-block wk-btn-lg wk-btn-primary">提交评价</button></div>
    </div>
</template>

<script>
    import $ from "jquery" ;
    export default {
        name : "spaceRateWrite" ,
        data () {
            return {
                pageStates : {
                    starCount : 0 
                } ,
                apiData : {
                    badTags : [
                        {
                            "label" : "不够热情" ,
                            "value" : 0
                        } ,
                        {
                            "label" : "仪表不整" ,
                            "value" : 1
                        } ,
                        {
                            "label" : "不够专业" ,
                            "value" : 2
                        } ,
                        {
                            "label" : "不够诚信" ,
                            "value" : 3
                        } ,
                        {
                            "label" : "房源不熟" ,
                            "value" : 4
                        } ,
                        {
                            "label" : "不给回音" ,
                            "value" : 5
                        }
                    ] ,
                    goodTags : [
                        {
                            "label" : "礼貌热情" ,
                            "value" : 6
                        } ,
                        {
                            "label" : "仪表整洁" ,
                            "value" : 7
                        } ,
                        {
                            "label" : "比较专业" ,
                            "value" : 8
                        } ,
                        {
                            "label" : "诚实可靠" ,
                            "value" : 9
                        } ,
                        {
                            "label" : "熟悉房源" ,
                            "value" : 10
                        } ,
                        {
                            "label" : "勤于练习" ,
                            "value" : 11
                        }
                    ]
                }
            }
        } ,
        methods : {
            checkStar(event) {
                let $source = $(event.target) ;
                $source.toggleClass("icon-star").toggleClass("icon-star2").toggleClass("on") ;
                $source.parent().siblings(".tags").children("span").removeClass("on") ;
                this.pageStates.starCount = $source.parent().children(".on").length ;
            } ,
            checkTag(event) {
                let $source = $(event.target) ;
                $source.toggleClass("on") ; 
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../less/space/rate/write.less" ; 
</style>
