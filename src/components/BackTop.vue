<script setup>
import {onMounted, ref} from "vue";
import {smoothScroll} from '../utils/scrollToPosition';

let backToTopTotal = ref(null)
let backToTopButton = ref(null)

// todo 1 可以改为内联 css [并换一种优雅的方式适配其他大小]
// 拉环隐藏
function hide() {
	backToTopTotal.value.style.cssText = "transform: translateY(-400px) !important;transition: all 1.5s;"
	backToTopButton.value.style.cssText = "scale: 0;transition: all 1.5s;"
}


// 拉环显示
function show() {
	backToTopTotal.value.style.cssText = "transform: translateY(650px);transition: all 1s;"
	backToTopButton.value.style.cssText = "scale: 1;transition: all 1s;"
}

// fixme 2 点击按钮时按钮会卡一下再上去
window.addEventListener('scroll', function () {
	if (document.documentElement.scrollTop !== 0) {
		show()
	}
	if (document.documentElement.scrollTop === 0) {
		hide()
	}
})
</script>

<template>
	<div id="backToTop" ref="backToTopTotal">
		<div class="tie"></div>
		<button ref="backToTopButton" title="返回顶部" @click="hide;smoothScroll(0)"></button>
	</div>
</template>

<style lang="scss" scoped>
/* 整体按键 */
button {
	border: none;
}

#backToTop {
	width: 80px;
	height: calc(1200px + 126px);
	//height: calc(200px + 126px);
	position: fixed;
	right: 1.4vw;
	bottom: calc(150px + 600px);
	z-index: 200000;
	transition: all 1s;
	transform: translateY(-400px);

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
		transition: all 1s;
		background: url(../assets/拉环按钮.gif) no-repeat bottom !important;
		//background: url("https://i0.hdslb.com/bfs/album/72db6a29c5de085d09a1fd50e3f9b38c58469f89.gif") no-repeat bottom !important;
		background-size: contain !important;
	}

	&:hover {
		transform: translateY(680px) !important;
		transition: all 0.7s;
	}
}
</style>
