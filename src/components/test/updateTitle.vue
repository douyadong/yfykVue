<template>
	<div>
		修改结果: {{title}}
	</div>
</template>
<script>
export default {
	name: "updateTitle",
	data: function(){
		return {
			title: "改变标题测试！！"
		};
	},
	created: function(){
		let self = this;
		setTimeout(function(){			
			self.$nativeBridge.invokeMethod('updateTitle',[self.title],function(){
				self.title = "修改完成";
			},function(){
				self.title = "修改失败";
			});
		},3000);		
	}
}
</script>
<style>
	
</style>