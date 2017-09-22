<template>
  <div class="guest-comment wk-panel">
      <div class="panel-header comment">
           <span>用户评论</span>
           <div class="comment-amount">
               <span>{{review.comment.amount}}</span>
                <a href="#"><i class="iconfont icon-arrowR"></i></a>
           </div>
      </div>
      <!--客户评论内容-->

      <p class="no-data" v-if="!review.comment.commentList||!review.comment.commentList.length">暂无评论，快来抢沙发吧~</p>	    

      <div class="all-comment" v-else>
            <div class="comment-all-info panel-body" v-for="(item,index) in review.comment.commentList" :key="index">
                <div class="panel-item">
                    <p class="comment-phone">
                        <img src="https://imgwater.oss.aliyuncs.com/a791b7e705ed42139ae13fd4b594aa24" alt="">
                        <span>{{item.guest.guestPhoneNum}}</span>
                        <i class="iconfont icon-youpingsvg"></i>
                        <i class="iconfont icon-yezhu" v-if="item.landlord== 1"></i>
                    </p>
                    <h4 :data-orderLevel="item.orderLevel">{{item.comment}}</h4>
                    <ul v-if="item.imgList.length">
                        <li v-for="(val,index) in item.imgList" :key="index">
                            <img :src="val" alt="" class="img-responsive">
                        </li>
                    </ul>
                    <p class="comment-time-like">
                        <span class="comment-time">{{item.createTimeStr}}</span>
                        <span class="click-like">
                            <i class="comment-like iconfont icon-zan" @click="clickZan($event)"></i>
                            <span class="comment-like-amount" :data-number="zanNumber">{{item.upAmount}}</span>
                        </span>
                    </p>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
    import $ from "jquery";
    export default{
        name:"guestComment",
        props:["commentInfo"],
        data(){
            return{
                review:this.commentInfo,//将父组件传递给子组件的数据初始化给review，用于更改点赞次数信息；
                zanNumber:0//为点赞做准备；
            }
        },
        methods:{
            clickZan(e){
                let count=$('.comment-like').index($(e.target));//获取点击哪个元素的事件源在所有该元素的下标；
                let numberString=$('.comment-like-amount:eq('+count+')').data(number);
                console.log($('.comment-like-amount').eq(count))
                console.log(number); 
                let number=parseInt(numberString);  
                console.log(number);        
                if(!number){
                    this.review.comment.commentList[count].upAmount++;
                    // number++;//为只能做一次点赞做准备；
                    this.zanNumber++;
                }
            }
        }
    }
</script>

 <style lang="less" scoped>
    @import "../../../src/less/components/guestComment.less" ;
 </style>

