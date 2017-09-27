<template>
  <div class="add-comment wk-panel">
        <div class="comment-area">
            <textarea name="" id="" placeholder="请说说房子所在的小区..." v-model="commentText"></textarea>
        </div>
        <div class="add">
            <div class="photo">
                <div class="add-photo">
                    <i class="iconfont icon-dianshi3"></i>
                    <span >添加图片</span>
                </div>
            </div>
            <ul v-if="imgList.length">
                <li v-for="(item,index) in imgList" :key="index">
                    <img :src="item" alt="">
                    <i class="iconfont icon-close"></i>
                </li>
            </ul>
        </div>
        <hr>
        <div class="commit">确定</div>
  </div>
</template>

<script>
    export default{
        name:'estateDetailAddComment',
        data(){
            return{
                commentText:"",
                imgList:[
                    "https://imgwater.oss.aliyuncs.com/3ae2582211304e398e7a5dac0d4fd68a",
                    "https://imgwater.oss.aliyuncs.com/5ef511539cf240e4afbb1bbb058b2c8f",
                    
                ]
            }
        }
    }
</script>

<style lang="less" scoped>
@import "../../../less/estate/addComment.less";
</style>

