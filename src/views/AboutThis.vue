<script lang="ts" setup>
import {useCounterStore} from '../stores'
import {onMounted, watchEffect} from "vue";
import ChartRank from "../components/charts/ChartRank.vue";
import ChartPie from "../components/charts/ChartPie.vue";
import ChartLine from "../components/charts/ChartLine.vue";
import ChartHistogram from "../components/charts/ChartHistogram.vue"
import ChartTranspose from "../components/charts/ChartTranspose.vue";
import ChartCalendar from "../components/charts/ChartCalendar.vue";
import ChartRadar from "../components/charts/ChartRadar.vue";

let counter = 1

let chartAttrs = {
	'class': "chart",
	'style': "overflow-x: hidden"
}

</script>

<template>
	<div class="main">
		<div class="container">
			<div class="c1 border">
				<!--统计所有的原创曲与翻唱曲的对比数据-->
				<span>原创 | 翻唱 数据对比</span>
				<chart-radar :container-name="'container'+counter++"
				             v-bind="chartAttrs"/>
			</div>
			<div class="c2 border">
				<!--用于展示到「当年」曲目的总播放量-->
				<span>2012-2023 每年总播放量</span>
				<chart-histogram :container-name="'container'+counter++"
				                 v-bind="chartAttrs"/>
			</div>
			<div class="c3 border">
				<!--殿堂、传说、神话，1w+等曲子占比，左侧为总数，右侧为绫-->
				<span>播放量阶层 总数占比</span>
				<chart-transpose :container-name="'container'+counter++"
				                 v-bind="chartAttrs"/>
			</div>
			<div class="c4 border">
				<!--todo 放置地图显示各区域的投稿总数-->
				<!--<h1>这里放地图</h1>-->
				<!--<h3>右上方使用液晶数字显示总播放量</h3>-->
			</div>
			<div class="c5 border">
				<!--放置 vc/sv/ace 人物的投稿数量-->
				<span>不同歌手的「投稿数」随时间的变化</span>
				<chart-rank :container-name="'container'+counter++"
				            v-bind="chartAttrs"/>
			</div>
			<div class="c6 border">
				<!--用来展示 12-23 这十一年中 每月 的投稿数量-->
				<span>2012-2023 十一年间每月投稿数量</span>
				<chart-calendar :container-name="'container'+counter++"
				                v-bind="chartAttrs"/>
			</div>
			<div class="c7 border">
				<!--用于展示到该年为止的「原创曲」总播放量（如2015年则包含之前全部年份「12,13,14,15」）-->
				<!--另外一条线用于展示到该年为止的「翻唱曲」总播放量）-->
				<span>原创|翻唱 总播放曲线</span>
				<chart-line :container-name="'container'+counter++"
				            v-bind="chartAttrs"/>
			</div>
			<div class="c8 border">
				<!-- vs六位歌手的投稿总数，对比数据大小(差异不宜过大)-->
				<span>Vocaloid 人气对比</span>
				<chart-pie :container-name="'container'+counter++"
				           v-bind="chartAttrs"/>
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
	border: 1px solid #66ccff70;
	// csss实现四角边框
	background: linear-gradient(#66ccff, #66ccff) left top, linear-gradient(#66ccff, #66ccff) left top, linear-gradient(#66ccff, #66ccff) right top, linear-gradient(#66ccff, #66ccff) right top, linear-gradient(#66ccff, #66ccff) left bottom, linear-gradient(#66ccff, #66ccff) left bottom, linear-gradient(#66ccff, #66ccff) right bottom, linear-gradient(#66ccff, #66ccff) right bottom;
	background-repeat: no-repeat;
	background-size: 0.15vw 1vw, 1vw 0.15vw;
}

.main {
	width: 95vw;
	height: 90vh;
	margin: 5vh auto;
}

.container > div {
	position: relative;

	span {
		position: absolute;
	}

	&.c1 span {
		writing-mode: vertical-rl;
		top: 7%;
		left: 6%;
	}

	&.c2 span {
		top: 16%;
		left: 15%;
	}

	&.c3 span {
		writing-mode: vertical-rl;
		top: 7%;
		left: 2%;
	}

	&.c5 span {
		bottom: 35%;
		right: 5%;
	}

	&.c6 span {
		top: 4%;
		left: 7%;
	}

	&.c7 span {
		writing-mode: vertical-rl;
		top: 4%;
		right: 2%;
	}

	&.c8 span {
		bottom: 4%;
		right: 2%;
	}

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
