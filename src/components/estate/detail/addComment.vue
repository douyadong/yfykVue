<template>
  <div class="add-comment wk-panel">
        <div class="comment-area">
            <textarea name="" id="" placeholder="请说说房子所在的小区..." v-model="commentText"></textarea>
        </div>
        <div class="add">
            <div class="photo">
                <div class="add-photo" @click="addPhoto">
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
        <!--<div class="commit">确定</div>-->
        <router-link to="/estate/detail/share" class="commit">确定</router-link>      
  </div>
</template>

<script>
    import $ from "jquery";
    import "@/libraries/jquery.tips.js"
    export default{
        name:'estateDetailAddComment',
        data(){
            return{
                commentText:"",
                imgList:[
                    "https://imgwater.oss.aliyuncs.com/3ae2582211304e398e7a5dac0d4fd68a",
                    "https://imgwater.oss.aliyuncs.com/5ef511539cf240e4afbb1bbb058b2c8f"                  
                ]
            }
        },
        methods:{
            addPhoto(){
                if(this.imgList&&this.imgList.length==3){
                    $.tips("最多只能上传三张图片",2);
                    return;
                };
                this.imgList.push("https://imgwater.oss.aliyuncs.com/c25e493b61b34e7282e9649d0f907d00")
            }   
        }
    }
</script>

<style lang="less" scoped>
@import "../../../less/estate/addComment.less";
</style>

