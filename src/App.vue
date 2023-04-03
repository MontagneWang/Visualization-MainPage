<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import RightMenu from "./components/RightMenu.vue";
import CircularNav from "./components/CircularNav.vue";
import TestTemp from "./views/IntroLing.vue";
import { useRouter } from 'vue-router'
import BackTop from "./components/BackTop.vue";
// 跳转到 ling 路由
const router = useRouter()
router.push('/about')
</script>

<template>
	<!--<nav-bar/>-->
	<!--<test-temp/>-->
	<circular-nav/>
	<back-top/>
	<right-menu/>
	<router-view/>
</template>
<!--todo 修改 CSS 样式（大小 + 颜色）-->
<!--todo 修改 HTML 类名-->
<!--todo 移动端适配-->
<style>
html *
{
	font-family: LXGW WenKai Lite, serif !important;
}
body,
html {
	cursor: url(./assets/lingCursor/乐正绫-正常选择.cur),
	auto !important;
}

a:hover,
button:hover {
	cursor: url(./assets/lingCursor/乐正绫-链接选择1.cur),
	auto !important;
}

input:hover {
	cursor: url(./assets/lingCursor/乐正绫-手写.cur),
	auto !important;
}
</style>
