<template>
  <div class="estate-detail">
    <!--相册内容-->
    <div class="photo-loop">
        <swiper :options="pageConfs.swiperOption">            
            <swiper-slide v-for="(slide , index) in apiData.simpleHouseRentDetailInfo.houseImageAndVideoList" :key="slide.imgKey">
                <video :src="slide.videoSrc" :poster="slide.imageSrc" controls="controls" preload="none"  class="img-responsive" style="height : 210px ; " v-if="slide.isVideo"></video>                
                <img :src="slide.imageSrc" class="img-responsive" v-else>
                <div class="pagination">{{ pageStates.swiperActiveIndex }} / {{ apiData.simpleHouseRentDetailInfo.houseImageAndVideoList.length }}</div>
            </swiper-slide>            
        </swiper>
    </div>
    <!--经纪人-->
    <div class="wk-panel" style="margin-bottom:1rem">
        <div class="agent">
            <span class="agent-img"><img src="https://img.wkzf.com/fd6d670aa99b4ad58e531f1d8496e623" alt=""></span>
            <span class="agent-name">{{agent.agentName}}</span>
            <span class="agent-post">小区专家</span><a :href="'tel:'+agent.agentMobile"><i class="iconfont icon-dianhua"></i></a>
        </div>
    </div>
    <!--小区信息介绍-->
    <div class="estate-info wk-panel">
        <ul>
            <li class="base-info"><span class="estate-kind">所属板块</span><span class="estate-kind-info">{{estateInfo.district}}</span></li>
            <li class="base-info"><span class="estate-kind">产权年限</span><span class="estate-kind-info">{{estateInfo.propertyRight}}</span></li>
            <li class="base-info"><span class="estate-kind">竣工年代</span><span class="estate-kind-info">{{estateInfo.completed}}</span></li>
            <li class="base-info"><span class="estate-kind">房屋总数</span><span class="estate-kind-info">{{estateInfo.totalHouseCount}}</span></li>
            <li class="base-info"><span class="estate-kind">物业类型</span><span class="estate-kind-info">{{estateInfo.propertyType}}</span></li>
            <li class="base-info"><span class="estate-kind">物业费</span><span class="estate-kind-info">{{estateInfo.propertyCharges}}</span></li>
            <li class="base-info"><span class="estate-kind">绿化率</span><span class="estate-kind-info">{{estateInfo.greenRate}}</span></li>
            <li class="base-info"><span class="estate-kind">容积率</span><span class="estate-kind-info">{{estateInfo.volumeRate}}</span></li>
            <li class="base-info"><span class="estate-kind">物业公司</span><span class="estate-kind-info">{{estateInfo.propertyCompany}}</span></li>
            <li class="base-info"><span class="estate-kind">开发商</span><span class="estate-kind-info">{{estateInfo.developers}}</span></li>
            <li class="panel-header" style="margin-left:0;padding-bottom:0"> </li>
            <li><span>地铁</span><span class="nearby">{{estateInfo.subwayName}}</span></li>
            <li><span>学校</span><span class="nearby">{{estateInfo.schoolList}}</span></li>
            <li class="panel-header" style="margin-left:0;padding-bottom:0"></li>
        </ul>
    </div>
    <!--在售房源-->
    <div class="selling wk-panel">
        <span class="house-source">在售房源</span>
        <span class="house-amount">
            <span>{{estateInfo.sameEstateHouseAmount}}套</span>
            <a href="#"><i class="iconfont icon-arrowR"></i></a>
        </span>
    </div>
    <!--用户评论-->
    <div class="comment wk-panel">
        <div class="panel-header" style="margin-left:0;padding:1rem 1.5rem">
            <span>用户评论</span>
            <span class="comment-amount">
                <span>{{estateInfo.comment.amount}}</span>
                <a href="#"><i class="iconfont icon-arrowR"></i></a>
            </span>
        </div>
        <!--用户评论内容-->
        <p class="no-data" v-if="!estateInfo.comment.commentList||!estateInfo.comment.commentList.length">
	            暂无评论，快来抢沙发吧~
	    </p>
        <div class="all-comment" v-else>
            <div class="comment-all-info panel-body" v-for="(item,index) in estateInfo.comment.commentList" :key="index">
            <div class="panel-item">
                <p class="comment-phone">
                    <img src="../../../assets/volume.png" alt="">
                    <span>{{item.guest.guestPhoneNum}}</span>
                    <i class="iconfont icon-youpingsvg"></i>
                    <i class="iconfont icon-yezhu" v-if="item.landlord== 1"></i>
                </p>
                <h4>{{item.comment}}</h4>
                <p class="comment-time-like">
                    <span class="comment-time">{{item.createTimeStr}}</span>
                    <span class="click-like">
                        <i class="comment-like iconfont icon-zan"></i>
                        <span class="comment-like-amount">{{item.upAmount}}</span>
                    </span>
                </p>
            </div>
            <!--<div><img src="item.guest.avatar.url" alt=""> -->
            <!--<span>{{item.guest.guestPhoneNum}}</span><i class="iconfont icon-youpingsvg"></i></div>-->
        </div>
        </div>
    </div>
    <!--我来评价-->
    <div class="wk-panel" style="padding:1rem 1.5rem 2rem;margin-bottom:1rem">
        <div class="my-comment">我来评价</div>
    </div>
    <!--位置及周边-->
    <div class="wk-panel nearby-map">
       <div class="map panel-header">位置及周边</div>
       <div class="position">
            <img :src="'https://api.map.baidu.com/staticimage/v2?ak=GByG2pAz1WlmY7wX1rlIM4nd&width=640&height=426&center=' + estateInfo.longitude + ',' + estateInfo.latitude + '&zoom=18'" class="img-responsive">
            <i class="iconfont icon-dingwei center-icon"></i>
            <div class="search">
                <div class="icon-position">
                    <i class="iconfont icon-dingwei"></i>
                    <span class="detail-address">地址：{{estateInfo.estateAddr}}</span>
                </div>
            </div>
       </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import {swiper,swiperSlide} from "vue-awesome-swiper";
import estate from "../../../../mock/estate/detail.json"
    export default{
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
                  simpleHouseRentDetailInfo : {} ,
                  simpleAgentModel : {}
              },  
                agent:estate.data.agent,//经济人信息
                estateInfo:estate.data.estateInfo //小区房源信息
            }
        },
        created(){
         console.log(estate);
        },
         components : {
          swiper,
          swiperSlide
      }
    }
</script>

<style lang="less" scoped>
@import "../../../../src/less/estate/share.less";
</style>

     