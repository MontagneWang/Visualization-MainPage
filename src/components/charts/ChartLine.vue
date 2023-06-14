<script lang="ts" setup>
import {Chart} from '@antv/g2';


import {onMounted} from "vue";

const props = defineProps<{
	containerName: string
}>()
const {containerName} = props

onMounted(() => {
	// '2012': 2539451, '2013': 25060111, '2014': 32379457, '2015': 67806592,'2016': 84557692, '2017': 92569532, '2018': 88408231, '2019': 115891425,'2020': 93290605, '2021': 30958432, '2022': 83601663, '2023': 23910348}

	// '2012': 987064, '2013': 2898067, '2014': 3041363, '2015': 501459,'2016': 5668669, '2017': 9115298, '2018': 9656207, '2019': 12393047,'2020': 7945299, '2021': 1679625, '2022': 14185305, '2023': 13303462}
	fetch('/dataForLine.json')
			.then(res => res.json())
			.then(data => {
				const chart = new Chart({
					container: containerName,
					autoFit: true,
					padding: [15, 35, 25, 35]
				});

				chart.data(data);
				chart.scale({
					原创曲: {
						min: 0,
						max: 12000
					},
					翻唱曲: {
						min: 0.0000,
						max: 12000
					}
				});

				chart.axis('原创曲', false);

				chart.line().position('date*翻唱曲').color('#2fc25b');
				chart.line().position('date*原创曲').color('#1890ff');

				chart.annotation().dataMarker({
					top: true,
					position: ['2015',6780],
					text: {
						content: '增速最快的一年，约增加了 3500 万次',
						style: {
							textAlign: 'center',
						},
					},
					line: {
						length: 10,
					},
				});
				chart.annotation().dataMarker({
					top: true,
					position: ['2019', 11589.1425],
					text: {
						content: '最大差距，接近一亿播放量',
						style: {
							textAlign: 'left',
						},
					},
					line: {
						length: -20,
					},
				});
				chart.annotation().dataMarker({
					top: true,
					position: ['2021', 3096],
					line: {
						length: 10,
					},
					text: {
						content: '21 年低谷',
						style: {
							textAlign: 'center',
						}
					},
				});
				chart.annotation().dataMarker({
					top: false,
					position: ['2019', 1240],
					line: {
						length: 0,
					},
					text: {
						content: '翻唱曲播放量约为 1240 万',
						style: {
							textAlign: 'left',
						}
					},
				});
				chart.removeInteraction('legend-filter'); // 自定义图例，移除默认的分类图例筛选交互
				chart.render();
			});
})
</script>

<template>
	<div :id="containerName"></div>
</template>

<style lang="scss" scoped>

</style>
