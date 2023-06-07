<script lang="ts" setup>
import {Chart} from "@antv/g2";
import {onMounted} from "vue";
import DataSet from '@antv/data-set';

const props = defineProps<{
	containerName: string
}>()
const {containerName} = props

onMounted(() => {
	function getData(data: { total: { values: any[]; }; ling: { values: any[]; }; }) {
		const tmp: any[] = [];
		const dates: any[] = [];

		data.total.values.forEach(function (obj) {
			if (dates.indexOf(obj.date) === -1) {
				dates.push(obj.date);
			}
			obj.age_groups.forEach(function (subObject: { gender: string; date: any; }) {
				subObject.gender = '全部歌曲';
				subObject.date = obj.date;
				tmp.push(subObject);
			});
		});

		data.ling.values.forEach(function (obj) {
			obj.age_groups.forEach(function (subObject: { gender: string; date: any; }) {
				subObject.gender = '绫曲';
				subObject.date = obj.date;
				tmp.push(subObject);
			});
		});

		const ds = new DataSet();
		const dv = ds.createView()
				.source(tmp)
				.transform({
					type: 'filter',
					callback(row) { // 判断某一行是否保留，默认返回true
						return new Date(row.date * 1000).getFullYear() === new Date(dates[0] * 1000).getFullYear();
					}
				});

		return dv.rows;
	}

	const axisWidth = 50;

	// fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/population.json')
	fetch('/src/assets/testDataForTranspose.json')
			.then(res => res.json())
			.then(data => {
				const chart = new Chart({
					container: containerName,
					autoFit: true,
					height: 500,
					padding: [10, 0, 25, 0]
				});

				chart.data(getData(data));
				chart.scale({
					age: {
						sync: true,
						tickCount: 30
					},
					total_percentage: {
						sync: true,
						formatter(v) {
							return v + '%';
						}
					},
					gender: {
						sync: true
					}
				});

				chart.facet('mirror', {
					fields: ['gender'],
					transpose: true,
					padding: [0, axisWidth / 2, 0, axisWidth / 2],
					eachView(view) {
						view.interval()
								.position('age*total_percentage')
								.color('gender', ['#1890ff', '#f04864']);
					}
				});

				chart.on('afterrender', () => {
					const { width: rWidth, x: rX } = chart.viewBBox;
					const view = chart.views[0];
					const { width: vWidth, x: vX } = view.viewBBox
					view.axis('age', {
						label: {
							style: {
								textAlign: 'center'
							},
							offset: rWidth / 2 - vWidth - rX - vX + axisWidth / 2
						},
						tickLine: false
					})
					view.render()
				})
				chart.legend(false);
				chart.render();
			});
})

</script>

<template>
	<div :id="containerName"></div>
</template>

<style lang="scss" scoped>

</style>
