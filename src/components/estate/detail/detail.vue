<template>
  <div class="estate-detail">
      <!--小区名称-->
    <div class="estate-title">
       <i class="iconfont icon-back"></i><i class="iconfont icon-close"></i><span >{{estateInfo.estateName}}</span><i class="iconfont icon-jilugengduo1"></i>
    </div>
    <!--相册内容-->
    <div class="photo-loop">
        
    </div>
    <!--经纪人-->
    <div class="agent">
        <span><img src="https://test01.fe.wkzf/wkwap_fe/img/source/agent/agent_man.png" alt=""></span><span>{{agentName}}</span><span>小区专家</span><a href="#"><i class="iconfont icon-dianhua"></i></a>
    </div>
    <div class="space"></div>
    <!--小区信息介绍-->
    <div class="estate-info">
        <ul>
            <li><span>所属板块</span><span>{{estateInfo.district}}</span></li>
            <li><span>产权年限</span><span>{{estateInfo.propertyRight}}</span></li>
            <li><span>竣工年代</span><span>{{estateInfo.completed}}</span></li>
            <li><span>房屋总数</span><span>{{estateInfo.peopleAmount}}</span></li>
            <li><span>物业类型</span><span>{{estateInfo.propertyType}}</span></li>
            <li><span>物业费</span><span>{{estateInfo.propertyCharges}}</span></li>
            <li><span>绿化率</span><span>{{estateInfo.greenRate}}</span></li>
            <li><span>容积率</span><span>{{estateInfo.volumeRate}}</span></li>
            <li><span>物业公司</span><span>{{estateInfo.propertyCompany}}</span></li>
            <li><span>开发商</span><span>{{estateInfo.developers}}</span></li>
            <li><hr></li>
            <li><span>地铁</span><span>{{estateInfo.subwayName}}</span></li>
            <li><span>学校</span><span>{{estateInfo.schoolList}}</span></li>
            <li><hr></li>
        </ul>
    </div>
    <!--在售房源-->
    <div class="selling"><span>在售房源</span><span><span>{{estateInfo.sellhouseCount}}套</span><a href="#"><i class="iconfont icon-arrowR"></i></a></span></div>
    <div class="space"></div>
    <!--用户评论-->
    <div class="comment">
        <div><span>用户评论</span><span><span>{{estateInfo.comment.amount}}</span><a href="#"><i class="iconfont icon-arrowR"></i></a></span></div>
        <hr>
        <div ></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import {swiper,swiperSlide} from "vue-awesome-swiper";
import estate from "../../../../mock/estate/detail.json"
    export default{
        name:"estateDetailDetail",
        data(){
            return {
                
                agentName:estate.data.agent.agentName,//经济人姓名
                estateInfo:{
                    district:estate.data.estateInfo.district,//所属板块
                    estateName:estate.data.estateInfo.estateName,//小区名称
                    peopleAmount:estate.data.estateInfo.historicalTransactionAmount,//房屋总数
                    completed:estate.data.estateInfo.completed,//竣工年代
                    propertyRight:estate.data.estateInfo.propertyRight,//产权年限
                    propertyType:estate.data.estateInfo.propertyType,//物业类型
                    propertyCompany:estate.data.estateInfo.propertyCompany,//物业公司
                    propertyCharges:estate.data.estateInfo.propertyCharges,//物业费用
                    greenRate:estate.data.estateInfo.greenRate,//绿化率
                    developers:estate.data.estateInfo.developers,//开发商
                    volumeRate:estate.data.estateInfo.volumeRate,//容积率
                    latitude:estate.data.estateInfo.latitude,//纬度
                    longitude:estate.data.estateInfo.longitude,//经度
                    subwayName:estate.data.estateInfo.subwayName,//地铁线
                    schoolList:estate.data.estateInfo.schoolList,//学校
                    sellhouseCount:estate.data.estateInfo.sellhouseCount,//在售房源
                    comment:{
                        amount:estate.data.estateInfo.comment.amount,//用户评论数
                        commentList:estate.data.estateInfo.comment.commentList//用户评论内容，为一个数组

                    }



                }
            }
        },
        created(){
         console.log(estate);
        }
    }
</script>

<style lang="less"scoped>
@import "../../../../src/less/estate/detail.less";
</style>

     