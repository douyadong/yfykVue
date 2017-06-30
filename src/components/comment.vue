<template>
<div class="comment">
	<div class="avatar">
		<img :src="url">
	</div>
	<div :class="'detail '+(!isBottom?'bottom-border':'')">
		<p class="phone-number">{{phoneNumber}}</p>
		<p class="date">{{createDate}}</p>
		<p class="content">{{content}}</p>
	</div>
	<div style="clear:both"></div>
</div>
</template>

<script>
export default {
	props:['item','isBottom'],
	data(){					
		return this.item;
	}
}
</script>

<style lang="less">
	@import "../less/components/comment.less";
</style>