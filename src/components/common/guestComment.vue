<template>
  <div class="guest-comment wk-panel">
      <div class="panel-header comment">
           <span>用户评论</span>
           <div class="comment-amount">
               <span>{{estateInfo.comment.amount}}</span>
                <a href="#"><i class="iconfont icon-arrowR"></i></a>
           </div>
      </div>
      <!--客户评论内容-->
      <p class="no-data" v-if="!estateInfo.comment.commentList||!estateInfo.comment.commentList.length">暂无评论，快来抢沙发吧~</p>
      <div class="all-comment" v-else>
            <div class="comment-all-info panel-body" v-for="(item,index) in estateInfo.comment.commentList" :key="index">
                <div class="panel-item">
                    <p class="comment-phone">
                        <img src="https://imgwater.oss.aliyuncs.com/a791b7e705ed42139ae13fd4b594aa24" alt="">
                        <span>{{item.guest.guestPhoneNum}}</span>
                        <i class="iconfont icon-youpingsvg"></i>
                        <i class="iconfont icon-yezhu" v-if="item.landlord== 1"></i>
                    </p>
                    <h4 :data-orderLevel="item.orderLevel">{{item.comment}}</h4>
                    <ul v-if="item.imgList">
                        <li v-for="(val,index) in item.imgList" :key="index">
                            <img :src="val" alt="" class="img-responsive">
                        </li>
                    </ul>
                    <p class="comment-time-like">
                        <span class="comment-time">{{item.createTimeStr}}</span>
                        <span class="click-like">
                            <i class="comment-like iconfont icon-zan"></i>
                            <span class="comment-like-amount">{{item.upAmount}}</span>
                        </span>
                    </p>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
    export default{
        name:"guestComment",
        props:["estateInfo"]
    }
</script>

 <style lang="less" scoped>
    @import "../../../src/less/components/guestComment.less" ;
 </style>

