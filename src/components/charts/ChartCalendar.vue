<script lang="ts" setup>
import { onMounted } from "vue";
import DataSet from '@antv/data-set';
import { Chart, registerShape } from '@antv/g2';
// import { isEmpty } from 'lodash'; // 取消 lodash 依赖

const props = defineProps<{
	containerName: string
}>()
const { containerName } = props

onMounted(() => {

	registerShape('polygon', 'boundary-polygon', {
		draw(cfg, container) {
			console.log(cfg.points);
			
			// if (!isEmpty(cfg.points)) {
			if (cfg.points) {
				const group = container.addGroup();
				const attrs = {
					stroke: '#fff',
					lineWidth: 1,
					fill: cfg.color,
				};
				const points = cfg.points;
				const path = [
					//@ts-ignore
					['M', points[0].x, points[0].y],
					//@ts-ignore
					['L', points[1].x, points[1].y],
					//@ts-ignore
					['L', points[2].x, points[2].y],
					//@ts-ignore
					['L', points[3].x, points[3].y],
					['Z']
				];
				//@ts-ignore
				attrs.path = this.parsePath(path);
				group.addShape('path', {
					attrs
				});

				//@ts-ignore
				if (cfg.data.lastWeek) {
					const linePath = [
						//@ts-ignore
						['M', points[2].x, points[2].y],
						//@ts-ignore
						['L', points[3].x, points[3].y]
					];
					// 最后一周的多边形添加右侧边框
					group.addShape('path', {
						attrs: {
							//@ts-ignore
							path: this.parsePath(linePath),
							lineWidth: 4,
							stroke: '#404040'
						}
					});
					//@ts-ignore
					if (cfg.data.lastDay) {
						group.addShape('path', {
							attrs: {
								//@ts-ignore
								path: this.parsePath([
									//@ts-ignore
									['M', points[1].x, points[1].y],
									//@ts-ignore
									['L', points[2].x, points[2].y]
								]),
								lineWidth: 4,
								stroke: '#404040'
							}
						});
					}
				}

				return group;
			}
		}
	});

	fetch('/dataForCommit.json')
		.then(res => res.json())
		.then(data => {
			const chart = new Chart({
				container: containerName,
				autoFit: true,
				padding: [10]
			});
			chart.data(data);
			chart.scale({
				day: {
					type: 'cat',
					values: ['', '', '', '', '', '', '', '']
				},
				week: {
					type: 'cat'
				},
				commits: {
					sync: true
				},
				date: {
					type: 'cat'
				}
			});

			chart.axis('week', {
				position: 'top',
				tickLine: null,
				line: null,
				label: {
					offset: 12,
					style: {
						fontSize: 12,
						fill: '#666',
						textBaseline: 'top'
					},
					formatter: val => {
						if (val === '2') {
							return '';
						} else if (val === '6') {
							return '';
						} else if (val === '10') {
							return '';
						} else if (val === '15') {
							return '';
						} else if (val === '19') {
							return '';
						} else if (val === '24') {
							return '';
						}
						return '';
					}
				}
			});
			chart.axis('day', {
				grid: null
			});
			chart.legend(false);
			chart.tooltip({
				title: 'date',
				showMarkers: false,
			});
			chart.coordinate().reflect('y');
			chart.polygon().position('week*day*date')
				.color('投稿总数', '#BAE7FF-#1890FF-#0050B3')
				.shape('boundary-polygon');

			chart.interaction('element-active');

			chart.render();
		});
})

</script>

<template>
	<div :id="containerName"></div>
</template>

<style lang="scss" scoped></style>
