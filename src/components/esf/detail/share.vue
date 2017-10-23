<template>
	<div id="esfDetailShare">
		<assistant :cityId="cityId" :agent="apiData.agent"/>
		<download-app />
		<!--相册内容-->
        
       <swiper :options="pageConfs.swiperOption">            
            <swiper-slide style="text-align:center" v-for="(slide , index) in houseImageAndVideoList" :key="slide.url">                
                <!-- <video :src="slide.videoUrl" :poster="slide.videoSmallImage" controls="controls" preload="none"  class="img-responsive" style="width:100%;height : 210px ; " v-if="slide.isVideo"></video> -->
                <template  v-if="slide.isVideo">
                    <div style="position:relative" @click="playVideo(slide.video)">                    
                        <img style="margin:0 auto;dislay:block;" :src="slide.videoSmallImage" class="img-responsive"> 
                        <div style="display:flex;justify-content:center;align-items:center;position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px;width:60px;height:60px;border-radius:50%;background-color:rgba(0,0,0,.3)">
                            <div style="width:0;height:0;border-top:14px solid transparent;border-left:20px solid rgba(0,0,0,.5);border-bottom:14px solid transparent;margin-left:4px;">

                            </div>
                        </div>
                    </div>
                </template>
                               
                <img @click="previewImage()" :src="slide.url" class="img-responsive" v-else>
                <div class="pagination">{{ pageStates.swiperActiveIndex }} / {{ houseImageAndVideoList.length }}</div>
            </swiper-slide>            
        </swiper>
        <!-- 收藏 -->
        <i class="star"></i>

		<!-- -->
        <div class="wk-panel summary">
            <div class="panel-header">
                <h1>{{apiData.house.houseTitle}}</h1>                
            </div>
            <div  class="panel-body lr-padding tb-padding">
                <ul class="basic">
                    <li>
                    	<dl>
                    		<dt>总价</dt>
                    		<dd>{{apiData.house.totalPrice}}万</dd>
                    	</dl>
                    </li>
                    <li>
                    	<dl>
                    		<dt>户型</dt>
                    		<dd>{{apiData.house.houseChild}}</dd>
                        </dl>
                    </li>
                    <li>
                    	<dl>
                    		<dt>建筑面积</dt>
                    		<dd>{{apiData.house.areaStr}}</dd>
                    	</dl>
                    </li>
                </ul>
                <hr>
                <ul class="outline">
                	<li class='tags'>                        
                		<span :class="tag.className" v-for="(tag,index) in apiData.house.tagList" :key="index">{{tag.name}}</span>              		
                	</li>
                    <li class="left">
                    	<dl>
                    		<dt>单价</dt>
                    		<dd>{{apiData.house.unitPrice}} 元/㎡</dd>
                    	</dl>
                    </li>
                    <li class="right">
                    	<dl>
                    		<dt>年代</dt>
                    		<dd>{{apiData.house.completed}} 年</dd>
                    	</dl>
                    </li>
                    <li class="left">
                    	<dl>
                    		<dt>类型</dt>
                    		<dd>{{apiData.house.houseType}}</dd>
                    	</dl>
                    </li>
                    <li class="right">
                    	<dl>
                    		<dt>楼层</dt>
                    		<dd>{{apiData.house.floorDesc}}</dd>
                    	</dl>
                    </li>
                    <li class="left">
                    	<dl>
                    		<dt>装修</dt>
                    		<dd>{{apiData.house.decorationStr}}</dd>
                    	</dl>
                    </li>
                    <li class="right">
                    	<dl>
                    		<dt>朝向</dt>
                    		<dd>{{apiData.house.orientationStr}}</dd>
                    	</dl>
                    </li>
                    <li class="full">
                    	<dl>
                    		<dt>地铁</dt>
                    		<dd>{{apiData.estate.subwayName || '--'}}</dd>
                    	</dl>
                    </li>
                </ul>
                <hr>
                <ul class="estate-info">
                    <li>                    
                    	<dl>
                    		<dt>预算</dt>
                    		<dd><a :href="apiData.house.mortgageUrl">首付{{apiData.house.advancePayment}}万，月供{{apiData.house.mortgage}}元 <i class="iconfont icon-arrowR"></i></a></dd>
                    	</dl>
                    </li>
                    <li>
                    	<dl>
                    		<dt>小区</dt>
                    		<dd><a :href="apiData.estate.estateUrl">{{apiData.estate.estateName}} <i class="iconfont icon-arrowR"></i></a></dd>
                    	</dl>
                    </li>          
                    <li class="full">
                    	<dl>
                    		<dt>学校</dt>
                    		<dd>{{apiData.estate.schoolName}}</dd>
                    	</dl>
                    </li>
                </ul>
            </div>
        </div>		

		<!--3.6版本房源描述基本信息 -->
		<!--<div class="wk-panel basic-info" v-if="apiData.house.isExternal && apiData.house.extHouseDesc && apiData.house.extHouseDesc.length > 30">			
            <h1 class="panel-header">基本信息</h1>                
            <div  class="panel-body lr-padding tb-padding">		
                <template v-if="!apiData.house.isExternal">		
    				<dl>
    					<dt>主要卖点</dt>
    					<dd>{{apiData.house.sellPoint}}</dd>
    				</dl>
    				<dl>
    					<dt>业主心态</dt>
    					<dd>{{apiData.house.ownerMotivation}}</dd>
    				</dl>
    				<dl>
    					<dt>周边配套</dt>
    					<dd>{{apiData.house.aroundSupport}}</dd>
    				</dl>
                </template>
                <dl v-else>
                    <dd class="ext-house-desc">{{extHouseDesc}}<span @click="toggleExpand" v-if="apiData.house.isExternal && apiData.house.extHouseDesc.length > 100">            
                {{isExpanded?'收起':'更多'}}
            </span></dd>
                </dl>
            </div>            
		</div>-->
         <!--3.7版本房源描述部分-->
        <div class="wk-panel description top-gap">
            <!--自有房源房源描述-->
            <div v-if="apiData.house.isWKhouse==1" class="self-house">
                <div class="panel-header">房源描述</div>
                <div  class="panel-body  ">
                    <dl><dt>主要卖点</dt><dd>{{ apiData.house.sellPoint || "暂无描述" }}</dd></dl>
                    <dl><dt>业主心态</dt><dd>{{ apiData.house.ownerMotivation || "暂无描述" }}</dd></dl>
                    <dl><dt>周边配套</dt><dd>{{ apiData.house.aroundSupport || "暂无描述" }}</dd></dl>
                </div>
            </div>
            <!--外来房源房源描述-->
            <div v-else-if="apiData.house.isWKhouse==2&&apiData.house.sellPoint.length>30" class="outside-house ">
                <div class="panel-header">房源描述</div>
                <div class="outside-info panel-body lr-padding" :class="{moreInfo:moreInfo}" ref="sansInfo">{{text}}</div>
                <div  v-if="moreInfo" @click="outsideMoreInfo" class="is-look ">{{isLook}}</div>
            </div>
        </div>

		<!-- 小区信息 -->
		<div class="wk-panel estate-info">			
            <h1 class="panel-header">小区信息</h1>                            
            <div  class="panel-body lr-padding tb-padding">
				<div>			
					<img :src="apiData.estate.estateImgUrl">		
					<a class="estate" :href="apiData.estate.estateUrl">
						<p>{{apiData.estate.estateName}}</p>
						<p>{{apiData.estate.completedStr}} 年竣工  &nbsp;|  &nbsp;{{apiData.estate.totalHouse}}</p>
						<p>{{apiData.estate.estateAddr}}</p>

						<i class="iconfont icon-arrowR"></i>
					</a>					
				</div>
				<h4 v-if="chartVisible">价格走势</h4>				
				<div v-if="chartVisible" id="price" style="height:200px">

				</div>
				<ul class='list-info'>
					<li><a :href="apiData.estate.sameEstateHouseListUrl"><span>在售房源</span> <span class="count">{{apiData.estate.sameEstateHouseAmount}} 套 <i class="iconfont icon-arrowR"></i></span></a></li>
					<li><a :href="apiData.estate.historicalTransactionListUrl"><span>历史成交</span> <span class="count">{{apiData.estate.historicalTransactionAmount}} 套 <i class="iconfont icon-arrowR"></i></span></a></li>
					<li><a href=""><span>小区评论</span> <span class="count">{{apiData.estate.comment.account || 0}} 条 <i class="iconfont icon-arrowR"></i></span></a></li>
				</ul>				
				
            </div>
		</div>

		<a :href="mapUrl" class="location" :style="'background-image:url('+mapImgUrl+')'">
			<span class="map-info">
				<span class="inner"></span>
			</span>
			<div class="container">
				<div class="map-bubble">
					<div class="triangle"></div>
					<div class="box">
						{{apiData.estate.estateAddr}}
					</div>
				</div>
			</div>
			
		</a>
		<div class="wk-panel similar-esf" v-if="apiData.sameTownHouseList && apiData.sameTownHouseList.length > 0" >
			<h4 class="panel-header">相似房源推荐</h4>
			<esf-sources :cityId="cityId" :agentId="agentId" :items="apiData.sameTownHouseList" eventName="2065005" :otherParams="{ agent_id : 999 }" />
			<!-- <a class="more" :href="apiData.house.similarListUrl" v-if="!apiData.house.isExternal">查看更多</a> -->
		</div>	

		<div id="cover">
			<swiper :options="pageConfs.swiperOption2">            
	            <swiper-slide  v-for="(slide , index) in houseImageAndVideoList" :key="slide.url">	   
	            	<div @click="previewImage(true)" class="img-container" :style="{'background-image':'url('+slide.url+')'}"></div>             
	                <div class="pagination">{{ index + 1 }} / {{ houseImageAndVideoList.length }}</div>
	            </swiper-slide>            
        	</swiper>
		</div>	
    </div>
</template>
<script>
	import assistant from "@/components/common/assistant" ;
	import { swiper , swiperSlide } from "vue-awesome-swiper" ;
	import apiDataFilter from "@/libraries/apiDataFilter" ;
	import esfSources from "@/components/common/esfSources" ;
	import downloadApp from "@/components/common/downloadApp" ;
	import $ from 'jquery';
	import Echarts from "echarts";
    import config from "@/configs/api";
    let prefix = config.prefix[apiDataFilter.getEnv()];
	export default {
		name : "esfDetailShare" ,
		components:{assistant,swiper,swiperSlide,esfSources,downloadApp},
        created(){
            this.houseId = this.$route.params.houseId;
            this.agentId = this.$route.params.agentId;
            this.cityId = this.$route.params.cityId;

            //document.title = "二手房详情";
            this.$nativeBridge.invokeMethod('updateTitle',['二手房详情'],function(){
                console.log("更新标题成功");
            },function(){
                console.log("更新标题失败");
            })  
        },
		data(){
			return {
              estateId:"",
              agentId:"",
              cityId:"",
              isExpanded: false,
              extHouseDesc:"",
              chartVisible:false,
			  pageStates : {
                  swiperActiveIndex : 1 //相册当前在第几帧
              } ,
              moreInfo:true,//是否超过5行
              textHeight:"",//定义原本外部房源信息盒子高度
              isLook:"查看更多",//点击查看更多外部房源信息
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
                  },
                  swiperOption2 : {  // 整个相册 swiper插件的选项                     
                      name : "swiper" ,
                      // 所有配置均为可选（同Swiper配置）
                      autoplay : 0 , //自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换  
                      grabCursor : true ,  //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
                      setWrapperSize : true ,
                      autoHeight : false ,  //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
                  }
              } ,
              apiData : {
                  house:{//房子信息
                    houseId:"",//房源ID
                    completed:"",//建造年代
                    houseChildType:"",//房子子类型
                    publishDate:"",//发布日期
                    unitPrice:"",//单价
                    extHouseCode:"",//外部房源编号
                    subEstateId:"",//小区ID
                    latitude:"",
                    longtitude:"",
                    picNum:"",//图片数
                    houseTitle:"",//房源标题
                    areaStr:"",//面积
                    totalPrice:"",//总价
                    advancePayment:"",//首付
                    mortgage:"",//按揭
                    floorDesc:"",//楼层
                    decorationStr:"",//装修
                    orientationStr:"",//朝向
                    houseType:"",//公寓，别墅
                    extHouseDesc:"",//外部房源信息
                    owerMotivation:"",//业主动机
                    aroundSupport:"",//周边配套
                    sellPoint:"",//卖点    
                    isWKhouse:"",
                    isStorePush:"",
                    isTopHouse:"",
                    commAgent:"",
                    fullYears:"",
                    isSubwayHouse:"",
                    isSchoolHouse:"",
                    isNewOnStore:"",
                    orientation:"",
                    tagList:[],
                    mortgageUrl:""
                  },
                  estate:{//小区信息
                    estateId:"",
                    estateName:"",//小区名称
                    town:"",//板块
                    district:"",//区域
                    propertyType:"",//物业类型
                    estateAddr:"",//地址
                    completedStr:"",//建造年代
                    totalHouse:"",//总户数
                    estateImgUrl:"",//小区图片
                    //sellhouseCount:"",//在售房源数量
                    sameEstateHouseAmount:"",//同小区在售房源数量
                    subEstateId:"",//子划分id
                    encryptSubEstateId:"",
                    historicalTransactionAmount:"",//历史成交数量
                    estateUrl:"",
                    schoolName:"",//附近学校
                    subwayName:"",//地铁
                    longtitude:"",
                    latitude:"",
                    estateHistoricalPrice:[],  
                    comment:""                  
                  },
                  sameTownTotalCount:"",
                  sameTownHouseList:[],
                  agent:{
                    agentId:"",
                    agentName:"",
                    agentMobile:"",
                    agentHeadImgUrl:"",
                    headRectImgKey:"",
                    headRoundImgUrl:"",
                    headRoundImgKey:"",
                    agentBelongToCompanyName:"",
                    agentCommentScore:"",
                    agentCommentScoreStr:"",
                    shi:"",
                    kong:"",
                    hasSmall:"",
                    agentWChatId:"",
                    agentWChatQRImgUrl:"",
                    weChatQRImgKey:"",
                    isWellAgent:"",
                    agentVerifiedStatus:"",
                    agentBizTown:"",
                    wellAgentBizMessage:"",
                    vipType:"",
                    abbreviation:"",
                    companyName:"",
                    storeName:""
                  }                  
              } ,              
			}
		},
		mounted(){	
            let self = this;
            apiDataFilter.request({
            apiPath:"esf.detail",
              data:{                
                houseId:this.houseId,
                agentId:this.agentId
              }, 
              errorCallback:function(){

              },
              successCallback:function(res){
                let data = res.body;
                data.data.estate.estateUrl = prefix + data.data.estate.estateUrl;//小区url
                data.data.estate.sameEstateHouseListUrl = prefix + "/estate/sameEstateHouseList.html?subEstateId=" + data.data.estate.encryptSubEstateId;
                data.data.estate.historicalTransactionListUrl = prefix + "/estate/historicalTransactionList.html?subEstateId=" + data.data.estate.encryptSubEstateId;
                data.data.house.mortgageUrl = prefix + "/houseLoanCalculator.html?totalPrice="+data.data.house.totalPrice;
                data.data.house.similarListUrl = prefix + "/esf/similarList.html?enCryptHouseId="+self.houseId;
                
                //document.title = data.data.house.houseTitle;
                self.$nativeBridge.invokeMethod('updateTitle',[data.data.house.houseTitle],function(){
                    console.log("更新标题成功");
                },function(){
                    console.log("更新标题失败");
                })
              

                self.$wechatShare({
                  "title" : data.data.house.houseTitle ,
                  "timelineTitle" : data.data.house.houseTitle ,
                  "content" : data.data.house.houseTitle ,
                  "imgUrl" : data.data.house.imgList && data.data.house.imgList.length > 0 && data.data.house.imgList[0] || '',//取第一个图片
                  "linkUrl": '',
                  "complete":function(){
                    
                  }
                });

                if(data.data.house.extHouseDesc){
                    self.extHouseDesc = data.data.house.extHouseDesc.substring(0,100);
                }
                
                Object.assign(self.apiData,data.data); 

                  // 3.7
                self.$nextTick(function(){
                     if(self.$data.apiData.house.isWKhouse==2){
                        let houseInfo=self.$refs.sansInfo.clientHeight;
                        self.textHeight=self.$refs.sansInfo.clientHeight;
                        //   超出控制高度;
                        if(houseInfo/25>5){
                            self.$refs.sansInfo.style.height=25*5+'px';
                        }
                     }
                });

                //计算tagList
                let house = self.apiData.house;
                house.tagList = [];
                console.log('taglist ', house.tagList);
                if(house.isTopHouse > 1){
                    self.apiData.house.tagList.push({className:"jx",name:"精选"});
                }else{
                    if(house.isStorePush == 1){
                        self.apiData.house.tagList.push({className:"jx",name:"店长推荐"});
                    }else{
                        if(house.commAgent > 0){
                            self.apiData.house.tagList.push({className:"jx",name:"急售"});
                        }
                    }
                }

                if(house.fullYears>=5 && house.onlyOne==1){
                    self.apiData.house.tagList.push({className:"mw",name:"满五唯一"});
                }else{
                    if(house.fullYears >=2){
                        self.apiData.house.tagList.push({className:"mw",name:"满二"});
                    }
                }

                if(house.isSubwayHouse == 1){
                    self.apiData.house.tagList.push({className:"dt",name:"地铁"});
                }

                if(house.isSchoolHouse == 1){
                    self.apiData.house.tagList.push({className:"jxx",name:"近学校"});
                }

                if(house.isNewOnStore == 1){
                    self.apiData.house.tagList.push({className:"xs",name:"新上"});
                }

                if(house.orientation == 9){
                    self.apiData.house.tagList.push({className:"tt",name:"南北通透"});
                }

                if(house.houseId > 1000000000){
                    self.apiData.house.isExternal  = true;
                }else{
                    self.apiData.house.isExternal  = false;
                }

                //taken from 悟空找房h5 分享页
                var datatmp = [], unitprice = [],realPrice=[];
                var unSortPrice,maxPrice,tmpPrice;                 
                if (data.data.estate.estateHistoricalPrice && data.data.estate.estateHistoricalPrice.length > 1)  {
                        self.chartVisible = true;
                        for (var i = 0; i < data.data.estate.estateHistoricalPrice.length; i++) {
                            if (data.data.estate.estateHistoricalPrice[i] && data.data.estate.estateHistoricalPrice[i].date && data.data.estate.estateHistoricalPrice[i].unitPrice) {
                                tmpPrice=parseFloat(data.data.estate.estateHistoricalPrice[i].unitPrice) == 0 ? null : parseFloat(data.data.estate.estateHistoricalPrice[i].unitPrice);
                                datatmp.push(parseInt(data.data.estate.estateHistoricalPrice[i].date.split('-')[1]) + '月');

                                unitprice.push(tmpPrice);

                                if (tmpPrice) {
                                    realPrice.push(tmpPrice);
                                }
                            }

                        }

                        unSortPrice = unitprice.slice();

                        var sortArray = realPrice.sort(function(a, b) {
                            return parseFloat(a) - parseFloat(b);
                        });
                        maxPrice = Math.ceil((sortArray[sortArray.length - 1] / 10000) + 1) * 10000;
                        
                        let myChart = Echarts.init(document.getElementById('price'));
                        // 指定图表的配置项和数据
                        let option = {
                            title: {
                                text: ''
                            },
                            tooltip: {
                                trigger: 'item',
                                triggerOn: 'click',
                                position: 'top',
                                backgroundColor: '#92A7C3',
                                padding: 4,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '12'
                                },
                                formatter: '{c}元'
                            },

                            grid: {
                                top: '20',
                                bottom: '20',
                                left: '5%',
                                right: '5%',
                                containLabel: true,
                            },
                            xAxis: [{
                                splitLine: {
                                    show: false
                                },
                                position: 'bottom',
                                type: 'category',
                                boundaryGap: false,
                                axisLine: {
                                    show: false
                                },
                                axisTick: { //不显示刻度线
                                    show: false
                                },
                                axisLabel: {
                                    interval: 0,
                                    rotate: 0, //60度角倾斜显示
                                    textStyle: {
                                        color: '#999',
                                        fontSize: 12,
                                        fontFamily: '微软雅黑'
                                    }
                                },
                                data: datatmp
                            }],
                            yAxis: [{
                                boundaryGap: true,
                                axisLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLabel: {
                                    inside: false,
                                    margin: 20,
                                    textStyle: {
                                        color: '#999',
                                        fontSize: 12,
                                        fontFamily: '微软雅黑'
                                    },
                                    formatter: function(value, index) {
                                        if (value == 0) {
                                            return "";
                                        } else {
                                            return value / 10000 + '万';
                                        }
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        type: 'solid',
                                        color:'#979797'
                                    }
                                },
                                position: 'left',
                                type: 'value',
                                min: 0,
                                max: maxPrice,
                                splitNumber: 4,
                                interval: maxPrice / 4
                            }],
                            series: [{
                                type: 'line', //设置列表为折线类型
                                symbol: 'circle',
                                symbolSize: 6,
                                connectNulls: true,
                                areaStyle: {
                                    normal: {
                                        // color: '#fff'
                                        opacity:0
                                    }
                                },
                                itemStyle: { //设置折线拐点的样式
                                    normal: {
                                        color: '#fff',
                                        borderColor: '#92A7C3',
                                        borderWidth: 2,
                                    },
                                    emphasis: { //重点，强调时候的样式，即当鼠标悬停或点击上去的时候的拐点的样式
                                        borderColor: '#92A7C3',
                                        borderWidth: 2,
                                        color: '#92A7C3'
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        color: '#92A7C3'
                                    }
                                },
                                data: unSortPrice
                            }]
                        };
                        // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(option);

                    }else{
                        console.log('price hide');
                        //$('#price').hide().prev().hide();
                        self.chartVisible = false;
                    }
                }            
            });						
		},
		methods : {
          //获取用户点击埋点参数方法
          getUvParamsString : function({ eventName , otherParams }) {
              let eventParam = { house_id : this.houseId } ;
              if(otherParams !== undefined && otherParams !== null ) {
                  eventParam = Object.assign( eventParam , otherParams ) ;
              }              
              return encodeURIComponent(JSON.stringify({ 
                  eventName : eventName , 
                  eventParam : eventParam ,
                  type : 2
              })) ;
          },
          previewImage(hide){          	
          	// if(hide){
          	// 	$('#cover').hide();
           //      $('html').css("overflow","auto");
          	// }else{
          	// 	$('#cover').show();
           //      $('html').css("overflow","hidden");
          	// }
          },
          playVideo(video){
            this.$router.push({
                path:"/videoPlay?video=" + video
            });
          },
          toggleExpand(){
            this.isExpanded = !this.isExpanded;
            if(this.isExpanded){//展开
                this.extHouseDesc = this.apiData.house.extHouseDesc;
            }else{//收起
                this.extHouseDesc = this.apiData.house.extHouseDesc.substring(0,100);
            }
          },
            //   3.7版本
          //点击查看更多显示更多房源描述信息
          outsideMoreInfo(){
            if($('.is-look').text()=='查看更多'){
                console.log(this.textHeight)
                this.$refs.sansInfo.style.height=this.textHeight+'px';
                this.isLook='收起'
            };
            if($('.is-look').text()=='收起'){
                console.log(1)
                this.$refs.sansInfo.style.height=25*5+'px';
                this.isLook='查看更多'
            }
          }
        } ,
        computed:{
            houseImageAndVideoList:function(){
                let result = [];
                if(this.apiData.house.houseVideoResponse){
                    result.push({
                        isVideo: true,
                        video: encodeURIComponent(JSON.stringify({
                            videoUrl:this.apiData.house.houseVideoResponse.videoUrl,
                            videoSmallImage: this.apiData.house.houseVideoResponse.videoSmallImage
                        })),
                        url:this.apiData.house.houseVideoResponse.videoUrl,
                        videoUrl:this.apiData.house.houseVideoResponse.videoUrl,
                        videoSmallImage: this.apiData.house.houseVideoResponse.videoSmallImage
                    });
                }

                //https://img.wkzf.com/cf931c293aab471aa5b4a10db350922c.CL
                //http://v.wkzf.com/d629583119e942beb4aeb456a81bae48WV.mp4

                // result.push({
                //     isVideo: true,
                //     video: encodeURIComponent(JSON.stringify({
                //         videoUrl:"http://v.wkzf.com/d629583119e942beb4aeb456a81bae48WV.mp4",
                //         videoSmallImage: "https://img.wkzf.com/cf931c293aab471aa5b4a10db350922c.CL"
                //     })),
                //     url:"https://img.wkzf.com/cf931c293aab471aa5b4a10db350922c.CL",
                //     videoUrl:"http://v.wkzf.com/d629583119e942beb4aeb456a81bae48WV.mp4",
                //     videoSmallImage: "https://img.wkzf.com/cf931c293aab471aa5b4a10db350922c.CL"
                // });

                // result.push({
                //     url:"https://img.wkzf.com/cf931c293aab471aa5b4a10db350922c.CL"
                // });

                // result.push({
                //     url:"https://img.wkzf.com/cf931c293aab471aa5b4a10db350922c.CL"
                // });

                // result.push({
                //     url:"https://img.wkzf.com/cf931c293aab471aa5b4a10db350922c.CL"
                // });

                if(this.apiData.house.imgList){
                    this.apiData.house.imgList.forEach(function(img){
                        result.push({
                            url:img                         
                        });
                    });
                }

                return result;
            },
            mapImgUrl:function(){
                return 'https://api.map.baidu.com/staticimage/v2?ak=GByG2pAz1WlmY7wX1rlIM4nd&width=640&height=426&center='+this.apiData.estate.longitude+','+this.apiData.estate.latitude+'&zoom=18';
            },
            mapUrl:function(){
                return prefix + '/esf/map.html?longitude=' + this.apiData.estate.longitude + '&latitude=' + this.apiData.estate.latitude + '&houseName='+this.apiData.estate.estateName + '&houseAddress=' + this.apiData.estate.estateAddr;
            }
        }
	}
</script>
<style lang="less">
	@import "../../../less/esf/detail.less"; 

    .swiper-wrapper{
        img{
            width:100%;
            height:210px;
        }
    }
</style>