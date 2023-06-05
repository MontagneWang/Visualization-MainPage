<script lang="ts" setup>
import {Chart} from "@antv/g2";
import {onMounted} from "vue";

const props = defineProps<{
	containerName: string
}>()
const {containerName} = props

onMounted(() => {
	// fetch('https://raw.githubusercontent.com/antvis/G2/master/examples/data/life.json')
	fetch('/src/assets/testDataForBubble.json')
			.then(res => res.json())
			.then(data => {
				const years = Object.keys(data);
				const colorsMap: any = {
					'洛天依': '#f49d37',
					'乐正绫': '#f03838',
					'言和': '#35d1d1',
					'星尘': '#5be56b',
					'心华': '#4e7af0',
					'初音未来': '#ebcc21',
				};

				let count = 0;
				let chart: Chart;
				let interval: string | number | NodeJS.Timer | undefined;

				function countUp() {
					const year = years[count];
					if (count === 0) {
						chart = new Chart({
							container: containerName,
							autoFit: true,
							height: 500
						});
						chart.data(data[year]);
						chart.scale({
							life: {
								min: 0,
								max: 90,
								tickInterval: 10,
								alias: '投币量'
							},
							income: {
								type: 'log',
								max: 150000,
								min: 100,
								alias: '点赞数'
							},
							country: {
								key: true // 自定义每条数据的 id
							},
							population: {
								type: 'pow',
								base: 2,
								alias: '播放量'
							},
							continent: {
								values: [
									'乐正绫',
									'言和',
									'心华',
									'星尘',
									'洛天依',
									'初音未来'
								]
							}
						});

						// 配置 tooltip
						chart.tooltip({
							showMarkers: false,
							title: 'country'
						});

						// 配置图例
						chart.legend('population', false);
						chart.legend('continent', {
							flipPage: false,
							position: 'bottom-left'
						});

						// 坐标轴配置
						chart.axis('life', {
							title: {
								style: {
									fill: '#8C8C8C',
									fontSize: 14
								}
							},
							line: {
								style: {
									stroke: '#D9D9D9'
								}
							}
						});
						chart.axis('income', {
							title: {
								style: {
									fill: '#8C8C8C',
									fontSize: 14
								}
							},
							grid: {
								line: {
									style: {
										stroke: '#D9D9D9'
									}
								}
							},
						});

						// 绘制散点图
						chart
								.point()
								.position('income*life')
								.color('continent', (val) => colorsMap[val])
								.size('population', [1, 25])
								.shape('circle')
								.animate({
									update: {
										duration: 200,
										easing: 'easeLinear'
									}
								})
								.tooltip('life*income*population')
								.style({
									stroke: '#000'
								});

						// 绘制标注文本
						chart.annotation().text({
							position: ['50%', '50%'],
							content: year,
							style: {
								fontSize: 200,
								fill: '#999',
								textAlign: 'center',
								fillOpacity: 0.3
							},
							top: false,
							animate: false,
						});
						chart.render();
					} else if (count < years.length) {
						chart.annotation().clear(true);
						chart.annotation().text({
							position: ['50%', '50%'],
							content: year,
							style: {
								fontSize: 200,
								fill: '#999',
								textAlign: 'center',
								fillOpacity: 0.3
							},
							top: false,
							animate: false,

						});
						chart.changeData(data[year]);
					}

					++count;

					if (count === years.length) {
						clearInterval(interval);
					}
				}

				countUp();
				interval = setInterval(countUp, 200);
			});
})

</script>

<template>
	<div :id="containerName"></div>
</template>

<style lang="scss" scoped>

</style>
