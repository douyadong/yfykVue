<template>
  <div class="xf-poster-preview">
    <!--楼盘画报-->
    <!--相册内容-->
    <div class="base"></div>
    <swiper :options="pageConfs.swiperOption">
      <swiper-slide v-for="(slide , index) in simpleHouseRentDetailInfo" :key="slide.imgKey">
        <div class="pagination-num"><span class="pagination">{{ pageStates.swiperActiveIndex }} / {{ simpleHouseRentDetailInfo.length }}</span></div>
        <div class="videoImg" v-focus>
          <video :src="slide.videoSrc" :poster="slide.imageSrc" controls="controls" preload="none"  class="img-responsive"  v-if="slide.isVideo"></video>
          <img :src="slide.imageSrc" class="img-responsive" v-else>
        </div>
        <div></div>
      </swiper-slide>
    </swiper>

  </div>
</template>

<script>
  import data from '../../../mock/xf/detail';
  import { swiper , swiperSlide } from "vue-awesome-swiper" ;
  import Vue from 'vue';
  export default {
    name: "xfPosterPreview",
    components: {  swiper , swiperSlide },
    data() {
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
        simpleHouseRentDetailInfo: data.data.houseImageAndVideoList,
      }
    },
    methods:{
     /* 判断角度*/
      GetSlideAngle(dx, dy) {
        return Math.atan2(dy, dx) * 180 / Math.PI;
      },
      /*判断方向*/
      GetSlideDirection(startX,startY,endX,endY) {
        let dy = startY - endY;
        let dx = endX - startX;
        let result = 0;
        // 如果滑动距离太短
        if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
          return result;
        }
        let angle = this.GetSlideAngle(dx, dy);
        if (angle >= -45 && angle < 45) {
          result = 4;//右
        } else if (angle >= 45 && angle < 135) {
          result = 1;//上
        } else if (angle >= -135 && angle < -45) {
          result = 2;//下
        }
        else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
          result = 3;//左
        }
        return result;
      },

      stop(e) {
        //Opera/Chrome/FF
        if (e.preventDefault)
          e.preventDefault();
        //IE
        e.returnValue = false;
      }
    },
    directives: {
      focus: {
        checkTouch(e) {
          let touchAction;
          if (e.touches) {
            touchAction = e.targetTouches[0]
          } else {
            touchAction = e;
          }
          return touchAction ;
        },
        inserted: function (el) {
          el.addEventListener('touchstart',function (e) {
            console.log("niho ");
            console.log(this);
            console.log(this.clientHeight);
            console.log(e);
          })
        },
      }
    }
  }

/*  Vue.directive ('focus', {
    inserted: function (el) {
      el.style.backgroundColor = 'red';

    }
  })*/
</script>
<style lang="less">
  @import "../../../src/less/xf/poster-preview.less" ;
</style>
