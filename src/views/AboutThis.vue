<script lang="ts" setup>
import {useCounterStore} from '../stores'
import {onMounted, watchEffect} from "vue";
import ChartRank from "../components/charts/ChartRank.vue";
import ChartCircle from "../components/charts/ChartCircle.vue";
import ChartBubble from "../components/charts/ChartBubble.vue";

let counter = 1


</script>

<template>
	<div class="main">
		<div class="container">
			<div class="c1 border">
				<chart-bubble :container-name="'container'+counter++"
				              style="overflow-x: hidden"/>
			</div>
			<div class="c2 border">
				<chart-circle :container-name="'container'+counter++"
				              style="overflow-x: hidden"/>
			</div>
			<div class="c3 border">c3</div>
			<div class="c4 border">
				<h1>这里放中国地图</h1>
				<h2>显示各区域投稿总数</h2>
				<h3>右上方额外显示总播放量</h3>
			</div>
			<div class="c5 border">
				<chart-rank :container-name="'container'+counter++"
				            style="overflow-x: hidden"/>
			</div>
			<div class="c6 border">c6</div>
			<div class="c7 border">c7</div>
			<div class="c8 border">c8</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.border {
	border: 1px solid #000;
}

.main{
	width: 95vw;
	height: 90vh;
	margin: 5vh auto;
}
.container {
	height: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	gap: 1vw;
	grid-auto-flow: row;
	grid-template-areas:
    "c1 c1 c1 c1 c4 c4 c4 c4 c4 c4 c4 c4 c6 c6 c6 c6"
    "c1 c1 c1 c1 c4 c4 c4 c4 c4 c4 c4 c4 c6 c6 c6 c6"
    "c1 c1 c1 c1 c4 c4 c4 c4 c4 c4 c4 c4 c6 c6 c6 c6"
    "c2 c2 c2 c2 c4 c4 c4 c4 c4 c4 c4 c4 c7 c7 c7 c7"
    "c2 c2 c2 c2 c4 c4 c4 c4 c4 c4 c4 c4 c7 c7 c7 c7"
    "c2 c2 c2 c2 c4 c4 c4 c4 c4 c4 c4 c4 c7 c7 c7 c7"
    "c3 c3 c3 c3 c5 c5 c5 c5 c5 c5 c5 c5 c8 c8 c8 c8"
    "c3 c3 c3 c3 c5 c5 c5 c5 c5 c5 c5 c5 c8 c8 c8 c8"
    "c3 c3 c3 c3 c5 c5 c5 c5 c5 c5 c5 c5 c8 c8 c8 c8";
}

.c1 {
	grid-area: c1;
}

.c2 {
	grid-area: c2;
}

.c3 {
	grid-area: c3;
}

.c6 {
	grid-area: c6;
}

.c7 {
	grid-area: c7;
}

.c4 {
	grid-area: c4;
}

.c5 {
	grid-area: c5;
}

.c8 {
	grid-area: c8;
}

</style>
