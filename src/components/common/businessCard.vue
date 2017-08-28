<template>
	<router-link class="business-card" :to="'/space/detail/share/'+agent.agentId+'?cityId='+cityId" v-if="agent.agentVerifiedStatus==1">		
		<div>			
			<div class="photo">
				<img :src="agent.headRoundImgUrl">
			</div>
			<div class="detail">
				<p class="name"><span>{{agent.agentName}}</span> &nbsp;<span class="icon-good" v-if="agent.isWellAgent==1">好</span><span href="" class="more-house">查看更多好房 <i class="iconfont icon-arrowR"></i></span></p>
				<p class="company-name">{{agent.agentBelongToCompanyName}} | 悟空找房</p>				
			</div>			
			<div style="clear:both"></div>
		</div>
		<!-- <p class="phone">
			<i class="iconfont icon-kefurexian"></i> <span>{{agent.agentMobile}}</span> 
		</p> -->
	</router-link>		
</template>

<script>
export default{
	props:["agent","cityId"]
}
</script>

<style lang="less" scoped>
@import "../../less/components/businessCard.less";
</style>
