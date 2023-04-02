<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import RightMenu from "./components/RightMenu.vue";
import CircularNav from "./components/CircularNav.vue";
import TestTemp from "./views/IntroLing.vue";
import { useRouter } from 'vue-router'
import BackTop from "./components/BackTop.vue";
// 跳转到 ling 路由
const router = useRouter()
router.push('/ling')
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
</style>
