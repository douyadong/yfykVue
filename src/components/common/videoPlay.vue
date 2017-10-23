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
		document.title = "房源视频";	
		let video = JSON.parse(decodeURIComponent(this.$route.query.video));		
		this.videoUrl = video.videoUrl;
        this.videoSmallImage = video.videoSmallImage;        
	},
	// mounted(){
	// 	setTimeout(function(){
	// 		document.getElementsByTagName('video')[0].play();
	// 		document.getElementsByTagName('video')[0].addEventListener('click',function(){
	// 			console.log('click...');
	// 		});
	// 		document.getElementsByTagName('video')[0].click();
	// 		console.log("自动播放视频");
	// 	},1000);
	// }
}
</script>
<style>

</style>