<script lang="ts" setup>
import {useCounterStore} from '../stores'
import {onMounted, watchEffect} from "vue";
import ChartRank from "../components/charts/ChartRank.vue";
import ChartPie from "../components/charts/ChartPie.vue";
import ChartLine from "../components/charts/ChartLine.vue";
import ChartHistogram from "../components/charts/ChartHistogram.vue"
import ChartWordCloud from "../components/charts/ChartWordCloud.vue"
import ChartBubbleStatic from "../components/charts/ChartBubbleStatic.vue";
import ChartCalendar from "../components/charts/ChartCalendar.vue";
import ChartRadar from "../components/charts/ChartRadar.vue";

let counter = 1


</script>

<template>
	<div class="main">
		<div class="container">
			<div class="c1 border">
				<chart-radar :container-name="'container'+counter++"
				             class="chart"
				             style="overflow-x: hidden"/>
			</div>
			<div class="c2 border">
				<chart-histogram :container-name="'container'+counter++"
				                 class="chart"
				                 style="overflow-x: hidden"/>
			</div>
			<div class="c3 border">
				<chart-bubble-static :container-name="'container'+counter++"
				                     class="chart"
				                     style="overflow-x: hidden"/>
			</div>
			<div class="c4 border">
				<h1>这里放中国地图</h1>
				<h2>显示各区域投稿总数</h2>
				<h3>右上方额外显示总播放量</h3>
			</div>
			<div class="c5 border">
				<chart-rank :container-name="'container'+counter++"
				            class="chart"
				            style="overflow-x: hidden"/>
			</div>
			<div class="c6 border">
				<chart-calendar :container-name="'container'+counter++"
				                class="chart"
				                style="overflow-x: hidden"/>
			</div>
			<div class="c7 border">
				<chart-line :container-name="'container'+counter++"
				            class="chart"
				            style="overflow-x: hidden"/>
			</div>
			<div class="c8 border">
				<chart-pie :container-name="'container'+counter++"
				           class="chart"
				           style="overflow-x: hidden"/>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.chart {
	width: 100%;
	height: 100%;
	overflow-y: hidden;
}

.border {
	border: 1px solid #000;
}

.main {
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
