import utils from "@/libraries/utils";

export default {
	install(Vue){
		let callback;
		window.jsHandlerFunc =function(data) {
			/*
				imei:deviceId
			*/			
			callback && callback(data.imei);						
			window.localStorage["deviceId"] = data.imei;
		}
			
		Vue.getDeviceIdFromNative = Vue.prototype.$getDeviceIdFromNative = function(cb){
			callback = cb;

			let deviceId = window.localStorage["deviceId"];
			if(deviceId){//localStorage已经存在了
				window.jsHandlerFunc({imei:deviceId});
			}else{//不存在，调用接口获取
				// if(window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.getDeviceId){
				// 	WebViewJavascriptBridge.getDeviceId('jsHandlerFunc')
				// }else if(window.android && window.android.getDeviceId){
				// 	window.jsHandlerFunc({imei:window.android.getDeviceId()});
				// } else {//ios和android都不支持获取deviceId则使用guid
				// 	deviceId = utils.getCookieId();
				// 	callback && callback(deviceId);//此处没有调用jsHandlerFunc是因为，不想让localStorage中的cookies写到deviceId里面，否则以后ios很android支持了也不能获取了。
				// }
				Vue.nativeBridge.invokeMethod('getDeviceId', [], function(data){
					if(data.androidData){
						window.jsHandlerFunc({imei: data.androidData});
					}else{
						window.jsHandlerFunc({imei:data.iosData});
					}
				}, function(){
					deviceId = utils.getCookieId();
					callback && callback(deviceId);
				})
			}
		};
	}
}