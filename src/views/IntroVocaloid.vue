<script lang="ts" setup>
let options = {}
</script>

<template>
	<!--todo 这里需要修改为 整页滚动 内容-->
	<!--todo 插槽-->
	<!--<the-test-temp-component>-->
	<!--	插槽内容，用于替换默认内容-->
	<!--</the-test-temp-component>-->
	<div>
		<full-page ref="fullpage" :options="options">
			<div class="section">
				<button class="next" @click="$refs.fullpage.api.moveSectionDown()">
					Next
				</button>
				Section 1
			</div>
			<div class="section">
				<button class="prev" @click="$refs.fullpage.api.moveSectionUp()">
					Prev
				</button>
				Section 2
				<button class="next" @click="$refs.fullpage.api.moveSectionDown()">
					Next
				</button>
			</div>
			<div class="section">
				<button class="prev" @click="$refs.fullpage.api.moveSectionUp()">
					Prev
				</button>
				Section 3
			</div>
		</full-page>
	</div>
</template>

<style lang="scss" scoped>
div {
	text-align: center;
}
</style>
