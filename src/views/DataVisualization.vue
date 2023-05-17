<script lang="ts" setup>
import axios from '../api/axios';
import {onMounted, reactive, ref, toRaw, watchEffect} from "vue";
import { Chart, IGroup, registerAnimation } from '@antv/g2';
//@ts-ignore
import DataSet from '@antv/data-set';

// import {Songs} from "../api/getSongData"; // 根据您的项目路径进行调整
// import { ref, onMounted } from 'vue';
// import { getSongs, Songs } from '../api/getSongData';
//
// const songs = ref<Songs>();
//
// onMounted(async () => {
// 	songs.value = await getSongs();
// 	// console.log(songs.value.code)
// 	// console.log(songs.value.data.desc)
// });

let time = ref(new Date())
setInterval(() => {
	time.value = new Date();
}, 1000);

const updateData = async (id=314772,title=time.value.toLocaleString()) => {
	try {
		const response = await axios.post('/Visualization/tempTest/getdata.php', {
			id: id,
			title: title
		});
		console.log(response.data);
		await getData()
	} catch (error) {
		console.error(error);
	}
};

let res = reactive([
	{id:0,title:'',play:0}
])

async function getData() {
	try {
		const {data: response} = await axios.get('/Visualization/tempTest/getdata.php?page=1');
		// todo 改用 reactive 后
		res = response
		console.log(toRaw(res))
	} catch (error) {
		console.error('Error fetching songs:', error);
	}
}
// todo

watchEffect(()=>{
	// updateData()
})
onMounted(()=>{
	// getData()

	registerAnimation('label-appear', (element, animateCfg, cfg) => {
		const label = (element as IGroup).getChildren()[0];
		const coordinate = cfg.coordinate;
		const startX = coordinate.start.x;
		const finalX = label.attr('x');
		const labelContent = label.attr('text');

		label.attr('x', startX);
		label.attr('text', 0);

		const distance = finalX - startX;
		label.animate((ratio: number) => {
			const position = startX + distance * ratio;
			const text = (labelContent * ratio).toFixed(0);

			return {
				x: position,
				text,
			};
		}, animateCfg);
	});

	registerAnimation('label-update', (element, animateCfg, cfg) => {
		const startX = element.attr('x');
		const startY = element.attr('y');
		// @ts-ignore
		const finalX = cfg.toAttrs.x;
		// @ts-ignore
		const finalY = cfg.toAttrs.y;
		const labelContent = element.attr('text');
		// @ts-ignore
		const finalContent = cfg.toAttrs.text;

		const distanceX = finalX - startX;
		const distanceY = finalY - startY;
		const numberDiff = +finalContent - +labelContent;

		element.animate((ratio: number) => {
			const positionX = startX + distanceX * ratio;
			const positionY = startY + distanceY * ratio;
			const text = (+labelContent + numberDiff * ratio).toFixed(0);

			return {
				x: positionX,
				y: positionY,
				text,
			};
		}, animateCfg);


	});

	function handleData(source: any) {
		source.sort((a: { value: number; }, b: { value: number; }) => {
			return a.value - b.value;
		});

		return source;
	}

	fetch('https://raw.githubusercontent.com/antvis/G2/master/examples/data/china-gdp.json')
			.then(res => res.json())
			.then(data => {
				let count = 0;
				let chart: Chart;
				let interval: string | number | NodeJS.Timer | undefined;

				function countUp() {
					if (count === 0) {
						chart = new Chart({
							container: 'container',
							autoFit: true,
							height: 500,
							padding: [ 20, 60 ]
						});
						// @ts-ignore
						chart.data(handleData(Object.values(data)[count]));
						chart.coordinate('rect').transpose();
						chart.legend(false);
						chart.tooltip(false);
						// chart.axis('value', false);
						chart.axis('city', {
							animateOption: {
								update: {
									duration: 1000,
									easing: 'easeLinear'
								}
							}
						});
						chart.annotation().text({
							position: ['95%', '90%'],
							content: Object.keys(data)[count],
							style: {
								fontSize: 40,
								fontWeight: 'bold',
								fill: '#ddd',
								textAlign: 'end'
							},
							animate: false,
						});
						chart
								.interval()
								.position('city*value')
								.color('city')
								.label('value', (value) => {
									// if (value !== 0) {
									return {
										animate: {
											appear: {
												animation: 'label-appear',
												delay: 0,
												duration: 1000,
												easing: 'easeLinear'
											},
											update: {
												animation: 'label-update',
												duration: 1000,
												easing: 'easeLinear'
											}
										},
										offset: 5,
									};
									// }
								}).animate({
							appear: {
								duration: 1000,
								easing: 'easeLinear'
							},
							update: {
								duration: 1000,
								easing: 'easeLinear'
							}
						});

						chart.render();
					} else {
						chart.annotation().clear(true);
						chart.annotation().text({
							position: ['95%', '90%'],
							content: Object.keys(data)[count],
							style: {
								fontSize: 40,
								fontWeight: 'bold',
								fill: '#ddd',
								textAlign: 'end'
							},
							animate: false,
						});
						// @ts-ignore
						chart.changeData(handleData(Object.values(data)[count]));
					}

					++count;

					if (count === Object.keys(data).length) {
						clearInterval(interval);
					}
				}

				countUp();
				interval = setInterval(countUp, 980);
			});



	// contain2
	fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relationship-with-weight.json')
			.then(res => res.json())
			.then(data => {
				const ds = new DataSet();
				const dv = ds.createView().source(data, {
					type: 'graph',
					edges: d => d.links
				});
				dv.transform({
					type: 'diagram.arc',
					sourceWeight: e => e.sourceWeight,
					targetWeight: e => e.targetWeight,
					weight: true,
					marginRatio: 0.3
				});

				const chart = new Chart({
					container: 'container2',
					autoFit: true,
					height: 500,
					padding: 30,
				});
				chart.legend(false);
				chart.tooltip({
					showTitle: false,
					showMarkers: false,
				});
				chart.scale({
					x: {
						sync: true,
						nice: true,
					},
					y: {
						sync: true,
						nice: true,
						max: 1,
					}
				});

				const edgeView = chart.createView();
				edgeView.data(dv.edges);
				edgeView.coordinate('polar').reflect('y');
				edgeView.axis(false);
				edgeView.edge()
						.position('x*y')
						.shape('arc')
						.color('source')
						.tooltip('source*target*value')
						.style({
							fillOpacity: 0.5
						});

				const nodeView = chart.createView();
				nodeView.data(dv.nodes);
				nodeView.coordinate('polar').reflect('y');
				nodeView.axis(false);
				nodeView.polygon()
						.position('x*y')
						.color('id')
						.label('name', {
							labelEmit: true,
							style: {
								fill: '#8c8c8c',
							},
						})
						.style({
							fillOpacity: 0.5
						});
				chart.interaction('element-active');

				chart.render();
			});


	// contain3
	// fetch('https://raw.githubusercontent.com/antvis/G2/master/examples/data/life.json')
	fetch('/src/assets/testData.json')
			.then(res => res.json())
			.then(data => {
				const years = Object.keys(data);
				const colorsMap = {
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
							container: 'container3',
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

});



</script>

<template>
	<h1>这里是 DataVisualization</h1>

	<div id="container3"></div>
	<div id="container2"></div>
	<div id="container"></div>

	<ul>
		<li v-for="song in res">
			{{ song.title }} - {{ song.play }}
		</li>
	</ul>
	<hr>
	<ul>
		<li v-for="song in res">
			<input style="width: 76%" v-model="song.title" />
			<input style="width: 20%" v-model="song.play" />
		</li>
	</ul>
</template>

<style scoped>
body {
	margin: 0 auto;
}
</style>
