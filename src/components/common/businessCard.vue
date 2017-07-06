<template>
	<router-link class="business-card" :to="'/space/detail/share/'+agent.agentId">		
		<div>			
			<div class="photo">
				<img :src="agent.agentHeadImgUrl+'?x-oss-process=image/resize,w_80'">
			</div>
			<div class="detail">
				<p class="name"><span>{{agent.agentName}}</span> &nbsp;<span class="icon-good" v-if="agent.isWellAgent==1">好</span></p>
				<p class="company-name">{{agent.agentBelongToCompanyName}} | {{agent.storeName}}</p>
				<p class="platform">悟空找房</p>
			</div>			
			<div style="clear:both"></div>
		</div>
		<p class="phone">
			<i class="iconfont icon-kefurexian"></i> <span>{{agent.agentMobile}}</span> <span href="" class="more-house">查看更多好房 &gt;</span>
		</p>
	</router-link>	
</template>

<script>
export default{
	props:["agent"]
}
</script>

<style lang="less" scoped>
@import "../../less/components/businessCard.less";
</style>
