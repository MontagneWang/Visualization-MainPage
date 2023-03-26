<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import RightMenu from "./components/RightMenu.vue";
import CircularNav from "./components/CircularNav.vue";
import TestTemp from "./components/LingIntro.vue";
</script>

<template>
	<!--<nav-bar/>-->
	<!--<test-temp/>-->
	<circular-nav/>
	<right-menu/>
	<router-view/>
</template>

<style>
html *
{
	font-family: LXGW WenKai Lite, serif !important;
}
</style>
