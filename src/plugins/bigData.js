/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：yfyk2h5
2. 文件名：src -> plugins -> bigData.js
3. 作者：tangxuyang@lifang.com
4. 备注：全局js
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import $ from 'jquery';
import apiDataFilter from '@/libraries/apiDataFilter';

let guid = localStorage.guid;
if(!guid){
	guid = localStorage.guid = NewGuid();
}

export default {
	install(Vue,options){
		let bigData = function(data){
			data.cookieId = guid;
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
				//alert('bigdata');
				data = JSON.parse(decodeURIComponent(data));
				data.type = 2;				
				bigData(data);
			}else{
				let $parents = $target.parents('[data-bigdata]');
				
				if($parents.length>0){
					//alert('bigdata');
					data = $parents.data('bigdata');
					data = JSON.parse(decodeURIComponent(data));
					data.type = 2;
					bigData(data);
				}
			}
		},true);

		Vue.bigData = Vue.prototype.$bigData = bigData;
	}
};

function S4() 
{   
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);   
}    
function NewGuid() 
{   
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());   
}