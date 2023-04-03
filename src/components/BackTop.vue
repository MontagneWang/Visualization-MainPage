<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import {smoothScroll} from '../utils/scrollToPosition';

let backToTopTotal = ref(null)
let backToTopButton = ref(null)

// todo 点击按钮时应该立马上去，而不是等到 ===0 再上去
let scrollTop = ref(document.documentElement.scrollTop);
onMounted(() => {
	window.addEventListener('scroll', () => {
		scrollTop.value = document.documentElement.scrollTop;
	});
});
let totalStyle = computed(() => {
	// 顶部时拉环隐藏，其余位置显示
	return scrollTop.value === 0 ?
			{bottom: '120vh!important'} : {bottom: '20vh'}
})
</script>

<template>
	<div id="backToTop" ref="backToTopTotal" :style="totalStyle">
		<div class="tie"></div>
		<button ref="backToTopButton" title="返回顶部" @click="smoothScroll(0)"></button>
	</div>
</template>

<!--修改为 vh-->
<style lang="scss" scoped>
/* 整体按键 */
button {
	border: none;
}

#backToTop {
	width: 80px;
	//height: calc(1200px + 126px);
	position: fixed;
	right: 1.4vw;
	//bottom: 115vh;
	z-index: 10000;
	transition: all 1s;

	/* 绳子 */
	.tie {
		width: 87px;
		height: 1200px;
		transition: all 1s;
		background: url(../assets/拉环绳子.gif) no-repeat bottom !important;
		//background: url("https://i0.hdslb.com/bfs/album/6c38c791008ecda41c14a561d6ceac257dab0e50.gif") no-repeat bottom !important;
		background-size: contain !important;
	}

	/* 本体 */
	button {
		/* 原图是 5:9 */
		width: 80px;
		height: 144px;
		margin-top: -20px;
		transition: all 0.75s;
		background: url(../assets/拉环按钮.gif) no-repeat bottom !important;
		//background: url("https://i0.hdslb.com/bfs/album/72db6a29c5de085d09a1fd50e3f9b38c58469f89.gif") no-repeat bottom !important;
		background-size: contain !important;
	}

	&:hover {
		bottom: 13vh !important;
		transition: all 0.75s;
	}
}
</style>
