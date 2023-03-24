<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import RightMenu from "./components/RightMenu.vue";
import CircularNav from "./components/CircularNav.vue";
import TestTemp from "./components/TestTemp.vue";
</script>

<template>
	<!--<nav-bar/>-->
	<!--<test-temp/>-->
	<circular-nav/>
	<right-menu/>
	<router-view/>
</template>

<style>
body{
	text-align: center;
}
</style>
