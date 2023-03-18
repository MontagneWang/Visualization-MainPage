<script lang="ts" setup>
import {ref} from 'vue'
import RightMenu from "../components/RightMenu.vue";

const count = ref(0)
</script>

<template>
	<div>
		<button type="button" @click="count++">count is {{ count }}</button>
	</div>
</template>

<style scoped>
body {
	margin: 0 auto;
}
</style>
