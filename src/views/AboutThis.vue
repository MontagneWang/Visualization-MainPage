<script lang="ts" setup>
import axios from '../api/axios';
import {onMounted, reactive, ref, toRaw, watchEffect} from "vue";


	// 隐藏签名 + 报错
	;(()=>{
		let fpWatermark = document.querySelector('.fp-watermark') as HTMLElement | null;
		if (fpWatermark) {
			fpWatermark.style.display = 'none';
			console.clear()
		}
	})()

</script>

<template>
	<!--todo 完成整页滚动内容,可以加一个 固钉 affix （可以使用 naive UI）-->
	<center style="line-height: 100vh;font-size: 3rem;">这里是 About 页面, 还在开发中</center>
</template>

<style scoped>

body {
	margin: 0 auto;
}

div {
	text-align: center;
}
</style>
