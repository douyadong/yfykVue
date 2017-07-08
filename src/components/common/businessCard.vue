<template>
	<router-link class="business-card" :to="'/space/detail/share/'+agent.agentId" v-if="agent.agentVerifiedStatus == 1">		
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
	<p class="not-verified" v-else>
		请完善实名认证，分享文章将可带有您的个人名片及联系方式
	</p>
</template>

<script>
export default{
	props:["agent"]
}
</script>

<style lang="less" scoped>
@import "../../less/components/businessCard.less";
.not-verified{
	font-size:1.6rem;
	padding: 1.5rem;
	padding-bottom: 0;
	color: maroon;
}
</style>
