<script lang="ts" setup>

</script>

<template>
	<div id="traveler" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
	</div>

	<div id="third" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
	</div>

	<div id="hipster" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
	</div>
	<div id="ai" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
body,
html {
	height: 100vh;
}

.story {
	width: 100vw;
}

.page {
	height: 120vh;
}

.bg {
	height: 120vh;
	position: absolute;
	width: inherit;
	z-index: 10;
}

#traveler {
	background: url(../assets/images/fond1.jpg) fixed;

	.bg {
		/* 通过 50% 84.5% 设置位置 */
		background: url(../assets/images/velo11.png) 50% 84.5% no-repeat fixed;
	}
}


#third {
	background: url(../assets/images/fond2.jpg) fixed;

	.bg {
		background: url(../assets/images/weirdo.png) 50% 78.5% no-repeat fixed;
	}
}

#hipster {
	background: url(../assets/images/fond3.jpg) fixed;

	.bg {
		background: url(../assets/images/velo3.png) 50% 83% no-repeat fixed;
	}
}

#traveler {
	background: url(../assets/images/fond1.jpg) fixed;

	.bg {
		/* 通过 50% 84.5% 设置位置 */
		background: url(../assets/images/velo11.png) 50% 84.5% no-repeat fixed;
	}
}
#ai {
	background: url(../assets/images/fond2.jpg) fixed;

	.bg {
		/* 通过 50% 84.5% 设置位置 */
		background: url(../assets/images/weirdo.png) 50% 84.5% no-repeat fixed;
	}
}

//#third {
//	background: url(../assets/images/fond2.jpg) fixed;
//
//	.bg {
//		background: url(../assets/v3.png) 50% 78.5% no-repeat fixed;
//	}
//}
//
//#hipster {
//	background: url(../assets/images/fond3.jpg) fixed;
//
//	.bg {
//		background: url(../assets/v5.png) 50% 83% no-repeat fixed;
//	}
//}
//
//#ai {
//	background: url(../assets/images/fond2.jpg) fixed;
//
//	.bg {
//		background: url(../assets/ai.png) 50% 83% no-repeat fixed;
//	}
//}

</style>
