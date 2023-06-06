<script lang="ts" setup>
import {onMounted} from "vue";
import DataSet from '@antv/data-set';
import { Chart, registerShape } from '@antv/g2';
const props = defineProps<{
	containerName: string
}>()
const {containerName} = props

onMounted(() => {

	const { DataView } = DataSet;
	const data = [
		{ item: '播放', '原创曲': 70, '翻唱曲': 30 },
		{ item: '点赞', '原创曲': 60, '翻唱曲': 70 },
		{ item: '投币', '原创曲': 50, '翻唱曲': 60 },
		{ item: '收藏', '原创曲': 40, '翻唱曲': 50 },
		{ item: '时长', '原创曲': 60, '翻唱曲': 70 },
		{ item: '转发', '原创曲': 70, '翻唱曲': 50 },
		{ item: '弹幕', '原创曲': 50, '翻唱曲': 40 },
		{ item: '评论', '原创曲': 30, '翻唱曲': 40 },
	];
	const dv = new DataView().source(data);
	dv.transform({
		type: 'fold',
		fields: ['原创曲', '翻唱曲'], // 展开字段集
		key: 'user', // key字段
		value: 'score', // value字段
	});
	const chart = new Chart({
		container: containerName,
		autoFit: true,
		padding: [10, 0, 10, 0]
	});
	chart.data(dv.rows);
	chart.scale('score', {
		min: 0,
		max: 80,
	});
	chart.coordinate('polar', {
		radius: 0.8,
	});
	chart.axis('item', {
		line: null,
		tickLine: null,
	});
	chart.axis('score', {
		line: null,
		tickLine: null,
		grid: {
			line: {
				type: 'circle',
			},
			alternateColor: 'rgba(0, 0, 0, 0.04)',
		},
	});

	chart.tooltip({
		shared: true,
		showCrosshairs: true,
		crosshairs: {
			type: 'xy',
			line: {
				style: {
					stroke: '#565656',
					lineDash: [4],
				},
			},
			follow: true
		}
	});

	chart
			.line()
			.position('item*score')
			.color('user');
	chart
			.point()
			.position('item*score')
			.color('user')
			.shape('circle');

	chart.legend( {
		position: 'right',
	});
	chart.render();
})

</script>

<template>
	<div :id="containerName"></div>
</template>

<style lang="scss" scoped>

</style>
