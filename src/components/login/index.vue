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
                <div class="verify-code-input"><input type="text" v-model="inputParams.verifyCode" class="transparent" :placeholder="verifyCodeInputPlaceholder"></div>                
            </dd>
            <dd><button type="button" class="wk-btn wk-btn-lg wk-btn-block wk-btn-primary" @click="submit">{{ pageStates.inputStage === 0 ? "获取动态密码" : "登录" }}</button></dd>
            <dd class="audio-verify" v-if="pageStates.inputStage === 1">
                <span>收不到短信？点击使用</span>
                <a href="javascript:;" @click="setDynamicVerifyType(2)">语音验证</a>
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
    import utils from "@/libraries/utils" ;
    import "@/libraries/jquery.tips.js" ;
    export default {
        name : "login" ,
        data () {
            return {
                pageStates : {                    
                    "dynamicVerifyType" : 1 , //动态验证状态： 1表示短信验证 ，2 代表语音验证
                    "audioTips" : false ,  //是否显示电话拨打中，留意来电的提醒
                    "inputStage" : 0 , //0 表示需要输入图片验证码 ， 1 表示已经输入图片验证码，正要获取动态密码，点了重发验证码就回到0的状态
                    "countDown" : 0 ,  //1表示正在进行，0表示已经结束
                    "countDownSeconds" : 60 ,                    
                    "timer" : null //倒计时定时器
                } ,
                pageConfs : {
                    "pictVerifyCodeUrl" : this.getPictVerifyCodeUrl()
                } ,
                inputParams : {
                    "mobile" : "" ,
                    "verifyCode" : "" 
                }
            }
        } ,
        computed : {
            verifyCodeInputPlaceholder() {
                let result = "请输入图片验证码" ;
                if(this.pageStates.inputStage === 1) {
                    if(this.pageStates.dynamicVerifyType === 1) result = "请输入短信验证码" ;
                    else if(this.pageStates.dynamicVerifyType === 2) result = "请输入语音验证码" ;
                }                
                return result ;
            }
        } ,
        methods : {
            //取得图片验证码图片url
            getPictVerifyCodeUrl() {
                return apiDataFilter.pathToUrl("member.pictVerifyCode") + "?v=" + new Date().getTime() + "&authorization=" + utils.getCookieId() ;
            } ,
            //刷新验证码图片
            refreshPictVerifyCode() {               
                this.pageConfs.pictVerifyCodeUrl = this.getPictVerifyCodeUrl() ;
            } ,
            //重发验证码，任务包括：1. 输入状态定格到图片验证码输入 ； 2. 清除定时器； 3. 定时器秒数回到60 ； 4. 定时器状态设置为0；5. 验证码图片刷新
            resetVerifyCode() {
                this.pageStates.inputStage = 0 ;  
                window.clearInterval(this.pageStates.timer) ;
                this.pageStates.countDownSeconds = 60 ; 
                this.pageStates.countDown = 0 ;                
                this.refreshPictVerifyCode() ;
            } ,
            //设置动态验证类型
            setDynamicVerifyType(type) {                
                this.pageStates.dynamicVerifyType = type ;
                this.resetVerifyCode() ;
            } ,
            //点提交按钮的处理，根据输入状态来决定到底是获取动态验证码还是登陆
            submit() {
                if(this.pageStates.inputStage === 0) this.getVerifyCode() ;
                else this.login() ;
            } ,
            //验证表单输入字段
            validateForm() {
                if($.trim(this.inputParams.mobile) === "") {
                    $.tips( "手机号不能为空！" , 2 ) ;
                    return false ;
                }
                if($.trim(this.inputParams.verifyCode) === "") {
                    $.tips( "图片验证码不能为空！" , 2 ) ;
                    return false ;
                }
                return true ;
            } ,
            //获取动态验证码
            getVerifyCode() {
                if( ! this.validateForm()) return ;               
                apiDataFilter.request({
                    apiPath : "member.identifyCode" ,
                    data : { "phone" : $.trim(this.inputParams.mobile) , "verifyCode" : $.trim(this.inputParams.verifyCode) , "codeType" : this.pageStates.dynamicVerifyType.toString() } ,              
                    successCallback : res => {
                        //改变状态
                       this.pageStates.inputStage = 1 ;
                       this.pageStates.countDown = 1 ;                                              
                       //把验证码框清空好输入动态密码
                       this.inputParams.verifyCode = "" ;
                       //如果是语音验证类型还要出示提示框
                       if(this.pageStates.dynamicVerifyType === 2) this.pageStates.audioTips = true ;
                       //最后开始倒计时哦
                       this.pageStates.timer = window.setInterval( () => {
                           this.pageStates.countDownSeconds -- ;
                           if(this.pageStates.countDownSeconds === 0) {
                               window.clearInterval(this.pageStates.timer) ;
                               this.pageStates.countDown = 0 ;  //表示倒计时已经结束
                               this.pageStates.countDownSeconds = 60 ;  //让倒计时可以重新开始
                           }
                       } , 1000) ;
                    }
                }) ;
            } ,
            //登陆请求及处理，登陆成功后要根据url中的redirect参数来决定跳转到哪里
            login() {
                if( ! this.validateForm()) return ;  
                apiDataFilter.request({
                    apiPath : "member.login" ,
                    data : { "phone" : $.trim(this.inputParams.mobile) , "identifyCode" : $.trim(this.inputParams.verifyCode) } ,
                    successCallback : res => {
                       let redirect = this.$route.query.redirect ; 
                       localStorage.yfyk2h5Token = res.body.data ;  //将服务端返回的uuid保存到localstorage，检查登录状态的时候用
                       if(redirect) window.location.href = decodeURIComponent(redirect) ;
                    }
                }) ;

            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../src/less/login/index.less" ; 
</style>
