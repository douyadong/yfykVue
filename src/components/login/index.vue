<template>
    <div class="login-canvas">
        <dl>
            <dt>登录</dt>
            <dd class="item"><input type="text" v-model="inputParams.mobile" class="transparent" placeholder="请输入手机号码"></dd>
            <dd class="item">
                <div class="verify-code-pict">
                    <img :src="pageConfs.pictVerifyCodeUrl" @click="refreshPictVerifyCode" v-if="pageStates.inputStage === 0">
                    <div class="count-down" v-if="pageStates.inputStage === 1 && pageStates.countDown === 1">还有{{ pageStates.countDownSeconds }}秒</div>
                    <a href="javascript:;" @click="resetVerifyCode" v-if="pageStates.inputStage === 1 && pageStates.countDown === 0">重发验证码</a>
                </div>
                <div class="verify-code-input"><input type="text" v-model="inputParams.verifyCode" class="transparent" placeholder="请输入图片验证码"></div>                
            </dd>
            <dd><button type="button" class="wk-btn wk-btn-lg wk-btn-block wk-btn-primary" @click="submit">{{ pageStates.inputStage === 0 ? "获取动态密码" : "登录" }}</button></dd>
            <dd class="audio-verify">
                <span>收不到短信？点击使用</span>
                <a href="javascript:;">语音验证</a>
            </dd>
        </dl>
        <div class="tips" v-if="pageStates.audioTips">
            <p>电话拨打中...请留意一下来电</p>
            <p>12590 - 9888304</p>
        </div>
        <div class="footer">
            <span>登录代表同意</span>
            <a href="#">《用户协议》</a>
        </div>
    </div>
</template>

<script>
    import apiDataFilter from "@/libraries/apiDataFilter" ;
    import $ from "jquery" ;
    import "@/libraries/jquery.tips.js" ;
    export default {
        name : "login" ,
        data () {
            return {
                pageStates : {
                    "audioTips" : false ,  //是否显示电话波德申中，留意来电的提醒
                    "inputStage" : 0 , //0 表示需要输入图片验证码 ， 1 表示已经输入图片验证码，正要获取动态密码，点了重发验证码就回到0的状态
                    "countDown" : 0 ,  //1表示正在进行，0表示已经结束
                    "countDownSeconds" : 60
                } ,
                pageConfs : {
                    "pictVerifyCodeUrl" : apiDataFilter.pathToUrl("member.pictVerifyCode")
                } ,
                inputParams : {
                    "mobile" : "" ,
                    "verifyCode" : "" 
                }
            }
        } ,
        methods : {
            refreshPictVerifyCode(event) {               
                $(event.target).attr( "src" , this.pageConfs.pictVerifyCodeUrl + "?v=" + new Date().getTime() ) ;
            } ,
            resetVerifyCode() {

            } ,
            submit() {
                if(this.pageStates.inputStage === 0) this.getDynamicVerifyCode() ;
                else this.login() ;
            } ,
            getDynamicVerifyCode() {
                if($.trim(this.inputParams.mobile) === "") {
                    $.tips( "手机号不能为空！" , 2 ) ;
                    return ;
                }
                if($.trim(this.inputParams.verifyCode) === "") {
                    $.tips( "图片验证码不能为空！" , 2 ) ;
                    return ;
                }
                apiDataFilter.request({
                    apiPath : "member.identifyCode" ,
                    data : { "phone" : $.trim(this.inputParams.mobile) , "verifyCode" : $.trim(this.inputParams.verifyCode) , "codeType" : "1" } ,              
                    successCallback : res => {
                        //改变状态，开始倒计时
                       this.pageStates.inputStage = 1 ;
                       this.pageStates.countDown = 1 ;
                       let timer = window.setInterval( () => {
                           while(this.pageStates.countDownSeconds > 0 ) {
                               this.pageStates.countDownSeconds -- ;
                           }
                           if(this.pageStates.countDownSeconds === 0) {
                               timer = null ;
                               this.pageStates.countDown = 0 ;  //表示倒计时已经结束
                           }
                       } , 1000) ;
                    }
                }) ;
            } ,
            login() {

            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../src/less/login/index.less" ; 
</style>
