<script lang="ts" setup>
import { Chart } from '@antv/g2';


import {onMounted} from "vue";
const props = defineProps<{
	containerName: string
}>()
const { containerName } = props

onMounted(()=>{

	fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json')
			.then(res => res.json())
			.then(data => {
				const chart = new Chart({
					container: containerName,
					autoFit: true,
					padding: [15, 35, 25, 35]
				});

				chart.data(data);
				chart.scale({
					nlp: {
						min: 0,
						max: 100
					},
					blockchain: {
						min: 0,
						max: 100
					}
				});

				chart.axis('nlp', false);


				chart.line().position('date*blockchain').color('#1890ff');
				chart.line().position('date*nlp').color('#2fc25b');

				chart.annotation().dataMarker({
					top: true,
					position: ['2016-02-28', 9],
					text: {
						content: '区块链首超 NLP',
						style: {
							textAlign: 'left',
						},
					},
					line: {
						length: 30,
					},
				});
				chart.annotation().dataMarker({
					top: true,
					position: ['2017-12-17', 100],
					line: {
						length: 30,
					},
					text: {
						content: '峰值：100',
						style: {
							textAlign: 'right',
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
