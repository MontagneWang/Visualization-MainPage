<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import {smoothScroll} from '../utils/scrollToPosition';

// fixme 按钮会跳一下
// idea 按钮的位置和当前页面的位置有关，页面在上滑时按钮也上环（触发函数时）
let scrollTop = ref(document.documentElement.scrollTop);
onMounted(() => {
	window.addEventListener('scroll', () => {
		scrollTop.value = document.documentElement.scrollTop;
	});
});

// 顶部时拉环隐藏，其余位置显示
// idea 可能原因：滚动时仍在判断高度，不满足隐藏条件所以还是设置底端20vh，直到完全收起才上升
let totalStyle = computed(() => {
	return scrollTop.value <= 50 ?
			{bottom: '120vh!important'} : {bottom: '20vh'}
})

function scroll() {
	scrollTop.value = 0;
	smoothScroll(0)
}
</script>

<template>
	<div id="backToTop" :style="totalStyle">
		<div class="tie"></div>
		<button title="返回顶部" @click="scroll"></button>
	</div>
</template>

<style lang="scss" scoped>
#backToTop {
	width: 80px;
	position: fixed;
	right: 1.4vw;
	z-index: 10000;
	transition: all 1s;

	/* 绳子 */
	.tie {
		width: 87px;
		height: 1200px;
		transition: all 1s;
		background: url(../assets/backTop/拉环绳子.gif) no-repeat bottom !important;
		//background: url("https://i0.hdslb.com/bfs/album/6c38c791008ecda41c14a561d6ceac257dab0e50.gif") no-repeat bottom !important;
		background-size: contain !important;
	}

	/* 本体 */
	button {
		/* 原图是 5:9 */
		width: 80px;
		height: 144px;
		margin-top: -20px;
		border: none;
		transition: all 0.75s;
		background: url(../assets/backTop/拉环按钮.gif) no-repeat bottom !important;
		//background: url("https://i0.hdslb.com/bfs/album/72db6a29c5de085d09a1fd50e3f9b38c58469f89.gif") no-repeat bottom !important;
		background-size: contain !important;
		cursor: pointer;
	}

	&:hover {
		bottom: 13vh !important;
		transition: all 0.75s;
	}
}
</style>
