<template>
<div class="comments">
	<p class="no-data" v-if="!items||!items.length">
	  暂无评论，快来抢沙发吧~
	</p>
	<div v-else class="bottom-border">
		<div class="comment" :key="item.id" v-for="(item,index) in items">
			<div class="avatar">
				<img :src="item.guestPhoto+'?x-oss-process=image/resize,w_30'">
			</div>
			<div :class="'detail '+(items.length - 1 !== index ?'bottom-border':'')">
				<p class="phone-number">{{item.guestNickname}}</p>
				<p class="date">{{item.date}} {{item.time}}</p>
				<p class="content">{{item.commentContent}}</p>
			</div>
			<div style="clear:both"></div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	props:['items']
}
</script>

<style lang="less" scoped>
	@import "../../less/components/comment.less";	
</style>