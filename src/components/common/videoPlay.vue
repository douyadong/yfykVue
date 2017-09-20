<template>	
	<div style="width:100%;display:flex;align-items:center;height:100%;">
	<video :src="videoUrl" :poster="videoSmallImage" controls="controls" autoplay="autoplay" preload="none" style="width:100%;"></video>	
	</div>
</template>
<script>
export default{
	name:"videoPlay",
	data(){
		return {
			videoUrl:"",
			videoSmallImage:""
		}
	},
	created(){	
		document.title = "";	
		let video = JSON.parse(decodeURIComponent(this.$route.query.video));		
		this.videoUrl = video.videoUrl;
        this.videoSmallImage = video.videoSmallImage;        
	}
}
</script>
<style>

</style>