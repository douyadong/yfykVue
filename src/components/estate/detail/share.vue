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
            <ul>
                <li>
                    <dl>
                        <dt>所属板块</dt>
                        <dd>{{apiData.district}}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>产权年限</dt>
                        <dd>{{apiData.propertyRight}}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>竣工年代</dt>
                        <dd>{{apiData.completedStr}}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>房屋总数</dt>
                        <dd>{{apiData.totalHouse}}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>物业类型</dt>
                        <dd>{{apiData.propertyType}}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>物业费</dt>
                        <dd>{{apiData.propertyCharges}}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>绿化率</dt>
                        <dd>{{apiData.greenRate}}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>容积率</dt>
                        <dd>{{apiData.volumeRate}}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>物业公司</dt>
                        <dd>{{apiData.propertyCompany}}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>开发商</dt>
                        <dd>{{apiData.developers}}</dd>
                    </dl>
                </li>
            </ul>
        </div>
        <hr>
        <div class="estate-static2">
            <ul >
                <li>
                    <dl>
                        <dt>地铁</dt>
                        <dd>{{apiData.subwayName}}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>学校</dt>
                        <dd>{{apiData.schoolName}}</dd>
                    </dl>
                </li>
            </ul>
        </div>
    </div>
    <div class="wk-panel location" v-if="apiData.longitude">
       <a :href="mapUrl">
           <div class="location-container">
               <img :src="'https://api.map.baidu.com/staticimage/v2?ak=GByG2pAz1WlmY7wX1rlIM4nd&width=640&height=426&center=' + apiData.longitude + ',' + apiData.latitude + '&zoom=18'" class="img-responsive">
               <div class="cover">
                   <i class="iconfont icon-arrowTS"></i>
                   <span class="estate-addr">{{apiData.estateAddr}}</span>
               </div>
           <div class="mark"></div>
       </div>
       </a>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { swiper , swiperSlide } from "vue-awesome-swiper" ;
import apiDataFilter from "@/libraries/apiDataFilter" ;
import config from "@/configs/api";
let prefix = config.prefix[apiDataFilter.getEnv()];
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
                 }  
            }
        },
        created(){
            let subEstateId=this.$route.params.subEstateId;
            document.title="小区详情";
            apiDataFilter.request({
                apiPath:"estate.detail",
                data:{"subEstateId":subEstateId},
                successCallback:res=>{
                     this.apiData=Object.assign({},res.body.data);
                     console.log(this.apiData);
                    document.title = this.apiData.estateName;                    
                    //定制页面微信分享参数
                    let wechatShare = res.body.data.weChatShare ;
                    this.$wechatShare({
                      "title" : wechatShare.title ,
                      "timelineTitle" : wechatShare.timelineTitle ,
                      "content" : wechatShare.content ,
                      "imgUrl" : wechatShare.picUrl ,
                      "success" : function() { console.log("分享成功！") ;  } ,
                      "fail" : function() { console.log("分享失败！") ;  } ,
                      "cancel" : function() { console.log("您取消了分享！") ; } ,
                      "complete" : function() { console.log("分享完成！") ; }
                    }) ;
                }
            })
        },
        computed:{
            mapUrl:function(){
                return prefix + '/esf/map.html?longitude=' + this.apiData.longitude + '&latitude=' + this.apiData.latitude + '&houseName='+this.apiData.subEstateName + '&houseAddress=' + this.apiData.estateAddr;
            }
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

     