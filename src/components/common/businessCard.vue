<template>
	<div class="business-card">		
		<div>			
			<div class="photo">
				<img :src="agent.headRectImgUrl+'?x-oss-process=image/resize,w_80'">
			</div>
			<div class="detail">
				<p class="name">{{agent.agentName}} <i class="icon-good"></i></p>
				<p class="company-name">{{agent.agentBelongToCompanyName}} | {{storeName}}</p>
				<p class="platform">{{agent.agentName}}</p>
			</div>			
			<div style="clear:both"></div>
		</div>
		<p class="phone">
			<i class="icon-kefurexian"></i> <span>{{agent.agentMobile}}</span> <a href="" class="more-house">查看更多好房 &gt;</a>
		</p>
	</div>
</template>

<script>
export default{
	props:["agent"]
}
</script>

<style lang="less">
@import "../../less/variables.less";
	.business-card{
		padding:1.5rem 3rem 1.1rem 3rem;
		border-bottom:1px solid #E4E4E4;
		box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.1);
		color:#7c7c7c;
		.photo{
			width:8rem;
			height:8rem;
			overflow: hidden;
			float:left;
			border:1px solid red;
			img{
				width:100%;
			}
		}

		.detail{
			margin-left:10rem;
			padding-top:0.65rem;
			.name{
				font-size:1.8rem;
				color:@default-font-color;				
				line-height: 1;
				margin-bottom:1rem;
			}

			.company-name{
				font-size:1.6rem;
				margin-bottom:0.75rem;				

			}		

			.platform{
				font-size:1.6rem;
			}
		}

		.phone{
			font-size:1.8rem;
			margin-top:1.2rem;
			color:@default-font-color;

			.more-house{
				color:#4081D6;
				float:right;
			}
		}
	}
</style>
