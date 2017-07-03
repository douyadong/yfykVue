<template>
<div class="comments">
	<p v-if="!items||!items.length">
	  没有评论!
	</p>
	<div v-else class="bottom-border">
		<div class="comment" v-for="(item,index) in items">
			<div class="avatar">
				<img :src="item.url">
			</div>
			<div :class="'detail '+(items.length - 1 !== index ?'bottom-border':'')">
				<p class="phone-number">{{item.phoneNumber}}</p>
				<p class="date">{{item.createDate}}</p>
				<p class="content">{{item.content}}</p>
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

<style lang="less">
	@import "../../less/components/comment.less";
</style>