<template>
    <div class="albums swiper-container">            
        <div class="swiper-wrapper">                
            <div class="swiper-slide bigdata-btn" :data-bigdataparams="bigDataParams" v-for="( item , index ) in items">                
                <video :src="item.videoSrc" :poster="item.imageSrc" controls="controls" preload="none"  class="img-responsive" style="height : 210px ; " v-if="item.isVideo"></video>                
                <img :src="item.imageSrc" class="img-responsive" v-else>                
            </div>
        </div>
        <div class="pagination"></div>
    </div>
</template>

<script>   
    export default {
        name : "albums" ,
        data () {
            return {
                
            }
        } ,
        props : ["items" , "houseId" , "eventName"] ,
        computed : {            
            bigDataParams() {
                return "{pageName:'',pageParam:{house_id:" + this.houseId+ "},eventName:" + this.eventName + ",eventParam:{house_id:" + this.houseId + "},nextPageName:'',nextPageParam:{},city:''}" ;
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../src/less/components/albums.less" ;   
</style>