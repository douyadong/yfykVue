<template>
  <div class="add-comment wk-panel">
        <div class="comment-area">
            <textarea name="" id="" placeholder="请说说房子所在的小区..." v-model="commentText" spellcheck="false"></textarea>
        </div>
        <div class="add">
            <div class="photo">
                <div class="add-photo" @click="addPhoto">
                    <i class="iconfont icon-dianshi3"></i>
                    <span>添加图片</span>
                </div>
            </div>
            <ul v-if="imgList.length">
                <li v-for="(item,index) in imgList" :key="index">
                    <img :src="item" alt="">
                    <i class="iconfont icon-close error" @click="remove($event)"></i>
                </li>
            </ul>
        </div>
        <hr>
        <!--<div class="commit">确定</div>-->
        <div class="commit" @click="commentSuccess">确定</div> 
         <!--遮罩层-->
         <div class="photo-select-source" :class="{active:active}">
             <div class="photo-way wk-panel">
                 <div class="take-photo" @click="takePhoto">拍照</div>
                  <input type="file" accept="image/*" capture="camera" name="cameraPhoto" class="camera-photo" @click="takePhoto"> 
                 <hr>
                 <div class="mobile" @click="photoAlbum">从手机相册中选取</div>
                 <input type="file" name="photoAlbum" class="photo-album" accept="image/*" multiple @click="photoAlbum">
             </div>
             <div class="cancel wk-panel" @click="cancel">取消</div>
         </div>
  </div>
</template>

<script>
    import $ from "jquery";
    import "@/libraries/jquery.tips.js";
    import apiDataFilter from "@/libraries/apiDataFilter";
    export default{
        name:'estateDetailAddComment',
        data(){
            return{
                commentText:"",
                imgList:[
                    "https://imgwater.oss.aliyuncs.com/3ae2582211304e398e7a5dac0d4fd68a",                 
                ],
                active:false//为了控制遮罩层;
            }
        },
        methods:{
            addPhoto(){
                if(this.imgList&&this.imgList.length==3){
                    $.tips("最多只能上传三张图片",2);
                    return;
                };
                this.active=true;//显示遮罩层;
                // this.imgList.push("https://imgwater.oss.aliyuncs.com/c25e493b61b34e7282e9649d0f907d00")
            },
            takePhoto(){
                // 调用手机拍照功能
                let self=this
                // 取消上传头像遮罩层
                this.active=false;
                // unbind解决多次点击input标签一次上传多个重复图片问题;
                $('.camera-photo').unbind().change(function(){
                    let file=this.files[0];
                    let r=new FileReader();
                    let a=r.readAsDataURL(file);
                // 此处只能用on绑定，jquery3删除了.load();
                    $(r).on('load',function(){         
                        self.imgList.push(this.result);
                    })
                })   
            },
            photoAlbum(){
                // 调用手机相册  
                let self=this;
                // 取消上传头像遮罩层
                this.active=false;          
                $('.photo-album').unbind().change(function(){
                    let count1=self.imgList.length;//已经存在的图片个数;
                    let count2=this.files.length;//从相册中选中的图片个数;
                    let count3=count1+count2;
                    if(count3>3){
                        $.tips("最多只能上传三张图片",2);
                        return;
                    }
                    for(let i=0;i<this.files.length;i++){
                        let file=this.files[i];
                        let r=new FileReader();
                        r.readAsDataURL(file);
                        $(r).on('load',function(){
                            self.imgList.push(this.result)
                        })
                    }
                    
                })
            },
            cancel(){
                // 取消上传头像遮罩层
                this.active=false;
            },
            remove(e){
                // 删除评论图片;
                let count=$('.error').index($(e.target));
                this.imgList.splice(count,1)
            },
            commentSuccess(){
                apiDataFilter.request({
                    apiPath:"",
                    method:"post",
                    data:{
                        commentText:this.commentText,
                        imgList:this.imgList
                    },
                    successCallback:function(){
                        // 评论成功
                        $.tips("评论成功！",3);
                        this.$router.push({name:'estate/detail/share',params:{subEstateId:this.$route.params.subEstateId}})
                    },
                    errorCallback:function(){
                        $.tips('网络错误，请重试',3)
                    }
                })
            }  
        }
    }
</script>

<style lang="less" scoped>
@import "../../../less/estate/addComment.less";
</style>

