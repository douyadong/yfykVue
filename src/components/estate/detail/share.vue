<template>
  <div class="estate-detail">
    <!--相册内容-->
    <div class="photo-loop">
        <swiper :options="pageConfs.swiperOption">            
            <swiper-slide v-for="(slide , index) in houseImageAndVideoList" :key="slide.imgKey">
                <video :src="slide.videoSrc" :poster="slide.imageSrc" controls="controls" preload="none"  class="img-responsive" style="height : 210px ; " v-if="slide.isVideo"></video>                
                <img :src="slide.imageSrc" class="img-responsive" v-else>
                <div class="pagination">{{ pageStates.swiperActiveIndex }} / {{ houseImageAndVideoList.length }}</div>
            </swiper-slide>            
        </swiper>
    </div>
    <!--经纪人-->
    <div class="wk-panel bottom-gap">
        <div class="agent">         
            <span class="agent-img"><img src="https://img.wkzf.com/fd6d670aa99b4ad58e531f1d8496e623" alt=""></span>
            <span class="agent-name">{{agent.agentName}}</span>
            <span class="agent-post">小区专家</span><a :href="'tel:'+agent.agentMobile"><i class="iconfont icon-dianhua"></i></a>
        </div>
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
                <li>{{estateInfo.district}}</li>
                <li>{{estateInfo.propertyRight}}</li>
                <li>{{estateInfo.completed}}</li>
                <li>{{estateInfo.totalHouseCount}}</li>
                <li>{{estateInfo.propertyType}}</li>
                <li>{{estateInfo.propertyCharges}}</li>
                <li>{{estateInfo.greenRate}}</li>
                <li>{{estateInfo.volumeRate}}</li>
                <li>{{estateInfo.propertyCompany}}</li>
                <li>{{estateInfo.developers}}</li>
            </ul>
        </div>
        <hr>
        <div class="estate-static2">
            <ul class="estate-kind2">
                <li>地铁</li>
                <li>学校</li>
            </ul>
            <ul class="estate-kind-info2">
                <li>{{estateInfo.subwayName}}</li>
                <li>{{estateInfo.schoolName}}</li>
            </ul>
        </div>
        <hr>
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
    <guestComment :estateInfo="estateInfo"></guestComment>
    <!--<div class="comment wk-panel">
        <div class="panel-header" style="margin-left:0;padding:1rem 1.5rem">
            <span>用户评论</span>
            <span class="comment-amount">
                <span>{{estateInfo.comment.amount}}</span>
                <a href="#"><i class="iconfont icon-arrowR"></i></a>
            </span>
        </div>-->
        <!--用户评论内容-->
        <!--<p class="no-data" v-if="!estateInfo.comment.commentList||!estateInfo.comment.commentList.length">暂无评论，快来抢沙发吧~</p>	    
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
            </div>-->
            <!--<div><img src="item.guest.avatar.url" alt=""> -->
            <!--<span>{{item.guest.guestPhoneNum}}</span><i class="iconfont icon-youpingsvg"></i></div>-->
        <!--</div>
        </div>
    </div>-->
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
                    <span class="detail-address">地址：</span>
                </div>
                <div class="estate-addr">{{estateInfo.estateAddr}}</div>
            </div>
       </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import {swiper,swiperSlide} from "vue-awesome-swiper";
import guestComment from "@/components/common/guestComment";
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
                estateInfo:estate.data.estateInfo, //小区房源信息
                houseImageAndVideoList:estate.data.houseImageAndVideoList //轮播图信息
            }
        },
        created(){
         console.log(estate);
        },
         components : {
          swiper,
          swiperSlide,
          guestComment
      }
    }
</script>

<style lang="less" scoped>
@import "../../../less/estate/share.less";
</style>

     