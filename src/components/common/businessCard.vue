<template>
	<div class="business-card">		
		<div>			
			<div class="photo">
				<img :src="agent.agentHeadImgUrl+'?x-oss-process=image/resize,w_80'">
			</div>
			<div class="detail">
				<p class="name">{{agent.agentName}} <i class="icon-good"></i></p>
				<p class="company-name">{{agent.agentBelongToCompanyName}} | {{storeName}}</p>
				<p class="platform">悟空找房</p>
			</div>			
			<div style="clear:both"></div>
		</div>
		<p class="phone">
			<i class="iconfont icon-kefurexian"></i> <span>{{agent.agentMobile}}</span> <a href="" class="more-house">查看更多好房 &gt;</a>
		</p>
	</div>
</template>

<script>
export default{
	props:["agent"]
}
</script>

<style lang="less" scoped>
@import "../../less/components/businessCard.less";
</style>
