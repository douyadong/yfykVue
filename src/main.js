/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：yfyk2h5
2. 文件名：src -> main.js
3. 作者：zhaohuagang@lifang.com
4. 备注：全局js
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import Vue from "vue" ;
import VueResource from "vue-resource" ;  //请求后端接口用的插件
import App from "./App" ;
import router from "./router" ;
import VueLazyload from "vue-lazyload" ;  //图片懒加载插件
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
vue插件使用
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
Vue.use(VueResource) ;
Vue.use(VueLazyload) ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
关闭生产模式下给出的提示
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
Vue.config.productionTip = false ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
vue实例化
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
new Vue({
  el : "#app" ,
  router ,
  template : "<App/>" ,
  components : { App }
}) ;