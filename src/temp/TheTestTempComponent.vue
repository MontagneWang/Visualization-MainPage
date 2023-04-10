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
	<!--todo 这里需要修改为 整页滚动 内容-->
	<!--todo 在一个时间段内（页面滚动完成前），无论滚动多少次，页面只滚一页-->
	<!--todo 插槽-->
	<div class="fancy-btn">
		<slot> <!-- 插槽出口 -->
			插槽未填写，显示默认内容 <!-- 默认内容 -->
		</slot>
	</div>

</template>

<style lang="scss" scoped>

</style>