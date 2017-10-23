<template>
  <div class="estate-detail">
    <!--相册内容-->
    <div class="photo-loop">
        <swiper :options="pageConfs.swiperOption">            
            <swiper-slide v-for="(slide , index) in apiData.imgList" :key="index">
                <img :src="slide" class="img-responsive" >
                <div class="pagination">{{ pageStates.swiperActiveIndex }} / {{ apiData.imgList.length }}</div>
            </swiper-slide>            
        </swiper>
    </div>
    <!--小区信息介绍-->
    <div class="estate-info wk-panel">
        <div class="estate-static1">
            <ul class="estate-kind1">
                <li>所属板块</li>
                <li>产权年限</li>
                <li>竣工年代</li>
                <li>房屋总数</li>
                <li>物业类型</li>
                <li>物业费</li>
                <li>绿化率</li>
                <li>容积率</li>
                <li>物业公司</li>
                <li>开发商</li>
            </ul>
            <ul class="estate-kind-info1">
                <li>{{apiData.district}}</li>
                <li>{{apiData.propertyRight}}</li>
                <li>{{apiData.completedStr}}</li>
                <li>{{apiData.totalHouseCount}}</li>
                <li>{{apiData.propertyType}}</li>
                <li>{{apiData.propertyCharges}}</li>
                <li>{{apiData.greenRate}}</li>
                <li>{{apiData.volumeRate}}</li>
                <li>{{apiData.propertyCompany}}</li>
                <li>{{apiData.developers}}</li>
            </ul>
        </div>
        <hr>
        <div class="estate-static2">
            <ul class="estate-kind2">
                <li>地铁</li>
                <li>学校</li>
            </ul>
            <ul class="estate-kind-info2">
                <li>{{apiData.subwayName}}</li>
                <li>{{apiData.schoolName}}</li>
            </ul>
        </div>
    </div>
    <div class="wk-panel location">
       <div class="location-container">
            <img :src="'https://api.map.baidu.com/staticimage/v2?ak=GByG2pAz1WlmY7wX1rlIM4nd&width=640&height=426&center=' + apiData.longitude + ',' + apiData.latitude + '&zoom=18'" class="img-responsive">
            <div class="cover">
                <i class="iconfont icon-arrowTS"></i>
                <span class="estate-addr">{{apiData.estateAddr}}</span>
            </div>
            <div class="mark"></div>
       </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { swiper , swiperSlide } from "vue-awesome-swiper" ;
import apiDataFilter from "@/libraries/apiDataFilter" ;
export default {
    name:"estateDetailShare",
    data(){
        return {
                 pageStates : {
                    swiperActiveIndex : 1 //相册当前在第几帧
                 } ,
                 pageConfs : {                                
                    swiperOption : {  // 整个相册 swiper插件的选项                     
                      name : "currentSwiper" ,
                      // 所有配置均为可选（同Swiper配置）
                      autoplay : 0 , //自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换  
                      grabCursor : true ,  //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
                      setWrapperSize : true ,
                      autoHeight : false ,  //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化                      
                      //定义几个回调函数
                      onInit : swiper => {
                          this.pageStates.swiperActiveIndex = swiper.activeIndex + 1 ;
                      } ,
                      onSlideChangeEnd : swiper => {
                        this.pageStates.swiperActiveIndex = swiper.activeIndex + 1 ;
                      }       
                    }
                 } ,
                 apiData : {
                     //imgList:[]
                 }  
            }
        },
        created(){
            let subEstateId=this.$route.params.subEstateId;
            console.log(subEstateId)
            apiDataFilter.request({
                apiPath:"estate.detail",
                data:{"subEstateId":subEstateId},
                successCallback:res=>{
                    console.log(res);
                     this.apiData=Object.assign({},res.body.data);
                    console.log(this.apiData)
                }
            })
        },
        components : {
          swiper,
          swiperSlide
        }
    }
</script>

<style lang="less" scoped>
@import "../../../less/estate/share.less";
</style>

     