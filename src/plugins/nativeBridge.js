/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：yfyk2h5
2. 文件名：src -> plugins -> NativeBridge.js
3. 作者：tangxuyang@lifang.com
4. 备注：全局js
5. 背景：IOS使用了https://github.com/zhangbozhb/WebViewBridge.Swift来实现与js的交互，Android没有使用任何框架，而是直接暴露一个名称为Android的对象，要暴露的方法都在Android对象上了
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

/*
IOS使用https://github.com/zhangbozhb/WebViewBridge.Swift
*/
function NativeBridge(){
	this.iosReady = false;
	this.initIOS();
	this.tasks = [];//仅IOS使用
	/*
		task:{
			funcName:"",
			args:[],
			cb:function(){}
		}
	*/
}
			
//注册ZHBridge.Core.ready,保证IOS交互是在ready之后
NativeBridge.prototype.initIOS = function(){				
	var self = this;
	window.ZHBridge	&& window.ZHBridge.Core.ready(function () {				
			self.iosReady = true;	
			self.execute();						
		});
}
			
//调用IOS方法
NativeBridge.prototype.invokeIOSMethod = function(funcName,args,success,fail){				
	success = success || function(){};
	fail = fail || function(){};
	
	if(this.iosReady){
		var newSuccess = function(result){						
			success({
				status:1,
				message:"success",
				iosData:result
			});
		}			
		var newFail = function(result){
			fail({status:0,
				message:"fail",
				iosData:result
			});
		}
		ZHBridge.Core.callNativeHandler(funcName,args,newSuccess,newFail);
	}else{					
		this.tasks.push({
			funcName: funcName,
			args: args,
			success: success,
			fail: fail
		});
	}
}
			
//调用android方法
NativeBridge.prototype.invokeAndroidMethod = function(funcName,args,success,fail){				
	if(window.android[funcName]){
		try{
			var result = window.android[funcName].apply(window.android,args);
			success && success({status: 1, method:"success", androidData:result});
		}catch(ex){
			fail && fail({status: 0, message:"fail", androidData: ex});
		}					
	}else{				
		fail && fail({
			status: 2,
			message: "method not exists"
		});
	}
}
			
//执行数组tasks中的方法，只针对IOS
NativeBridge.prototype.execute = function(){//执行队列中的任务
	//此时能保证是iOSReady的
	var self = this;
	this.tasks.forEach(function(task){
		self.invokeIOSMethod(task.funcName,task.args,task.success,task.fail);
	});
	
	self.tasks = [];
};
			
//调用本地方法（IOS或android）
NativeBridge.prototype.invokeMethod = function(funcName,args,success,fail){
	if(window.android){					
		this.invokeAndroidMethod(funcName,args,success,fail);					
	} else 	if(window.ZHBridge){					
		this.invokeIOSMethod(funcName,args,success,fail);
		return;
	} else {
		fail();
	}				
}
							
function append(str){
	var ele = document.getElementById('console');
	var original = ele.innerHTML;
	original += "<br/>" + str;
	ele.innerHTML = original;
}	

/*
//使用方法

var bridge = new NativeBridge();						
bridge.invokeMethod("updateTitle",["设置标题"],function(result){
	console.log("调用更新标题方法成功");
	console.log(JSON.stringify(result));
},function(err){
	console.log("失败：" + err);
});	
*/

export default {
	install(Vue) {
		console.log('install...');
		let bridge = new NativeBridge();
		console.log("bridge");
		console.log(bridge);
		Vue.nativeBridge = Vue.prototype.$nativeBridge = bridge;
	}
}