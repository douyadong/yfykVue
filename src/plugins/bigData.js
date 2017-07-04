/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：yfyk2h5
2. 文件名：src -> plugins -> bigData.js
3. 作者：tangxuyang@lifang.com
4. 备注：全局js
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import $ from 'jquery';
import apiDataFilter from '@/libraries/apiDataFilter';
export default {
	install(Vue,options){
		let bigData = function(data){
			apiDataFilter.request({
				apiPath:"common.bigData",
				data:data,
				successCallback:function(){
					console.log(data,"埋点成功！");
				},
				errorCallback:function(){
					
				}
			});
		};

		window.document.body.addEventListener("click",function(event){
			//判断是否埋点元素
			let $target = $(event.target);
			let data = $target.data('bigdata');
			if(data){				
				bigData(JSON.parse(data));
			}
		},true);

		Vue.bigData = Vue.prototype.$bigData = bigData;
	}
};