<template>
	<div>
		deviceId: {{deviceId}}
	</div>
</template>
<script>
export default {
	name: "getDeviceId",
	data: function(){
		return {
			deviceId: ""
		};
	},
	created: function(){
		let self = this;
		this.$getDeviceIdFromNative(function(data){
			console.log("imei",data);
			self.deviceId = data;
		});
	}
}
</script>
<style>

</style>