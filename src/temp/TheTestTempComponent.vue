<script lang="ts" setup>
import {useCounterStore} from '../stores'
import {watchEffect} from "vue";

defineProps<{ msg: string }>()

let Counter
watchEffect(() => {
	Counter = useCounterStore()
})
</script>

<template>
	<div class="fancy-btn">
		<slot> <!-- 插槽出口 -->
			插槽未填写，显示默认内容 <!-- 默认内容 -->
		</slot>
	</div>

</template>

<style lang="scss" scoped>

</style>