<script lang="ts" setup>
import {onMounted} from "vue";
import DataSet from '@antv/data-set';
import {Chart, registerShape} from '@antv/g2';

const props = defineProps<{
	containerName: string
}>()
const {containerName} = props

onMounted(() => {
	// {'total_play': 740973539, 'danmaku': 6688491, 'reply': 7092388,
	// 'likePoint': 37904955, 'coin': 27671062, 'favorite': 38212495,
	// 'share': 5487995, 'duration': 4409529,
	// '2012': 2539451, '2013': 25060111, '2014': 32379457, '2015': 67806592,
	// '2016': 84557692, '2017': 92569532, '2018': 88408231, '2019': 115891425,
	// '2020': 93290605, '2021': 30958432, '2022': 83601663, '2023': 23910348}

	// {'total_play': 81374865, 'danmaku': 835256, 'reply': 814681,
	// 'likePoint': 4132834, 'coin': 2246943, 'favorite': 3545130,
	// 'share': 676501, 'duration': 4200839,
	// '2012': 987064, '2013': 2898067, '2014': 3041363, '2015': 501459,
	// '2016': 5668669, '2017': 9115298, '2018': 9656207, '2019': 12393047,
	// '2020': 7945299, '2021': 1679625, '2022': 14185305, '2023': 13303462}
	const {DataView} = DataSet;
	const data = [
		{'item': '点赞', '原创曲': 37.904955, '翻唱曲': 41.328340},
		{'item': '投币', '原创曲': 27.671062, '翻唱曲': 22.469430},
		{'item': '收藏', '原创曲': 38.212495, '翻唱曲': 35.451300},
		{'item': '转发', '原创曲': 25.487995, '翻唱曲': 30.765010},
		{'item': '弹幕', '原创曲': 30.688491, '翻唱曲': 40.352560},
		{'item': '评论', '原创曲': 35.092388, '翻唱曲': 40.146810}
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
		max: 45,
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

	chart.legend({
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
