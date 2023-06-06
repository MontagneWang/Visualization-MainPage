<script lang="ts" setup>
import {Chart} from '@antv/g2';
import {onMounted} from "vue";
import DataSet from '@antv/data-set';

const props = defineProps<{
	containerName: string
}>()
const {containerName} = props
onMounted(() => {

	const data = [
		{year:'2012',value:  1850.4058},
		{year:'2013',value: 12181.7936},
		{year:'2014',value: 10591.2867},
		{year:'2015',value:  9452.1948},
		{year:'2016',value: 20042.9020},
		{year:'2017',value: 25584.7066},
		{year:'2018',value: 26827.3762},
		{year:'2019',value: 39425.6016},
		{year:'2020',value: 41348.2924},
		{year:'2021',value: 21645.3468},
		{year:'2022',value: 62626.5197},
		{year:'2023',value: 22863.0042}
	];
	const ds = new DataSet();
	const dv = ds.createView().source(data);
	dv.transform({
		type: 'map',
		callback: row => {
			row.year = parseInt(row.year, 10);
			return row;
		}
	}).transform({
		type: 'regression',
		method: 'polynomial',
		fields: ['year', 'value'],
		bandwidth: 0.1,
		as: ['Year', 'Value']
	});

	const chart = new Chart({
		container: containerName,
		autoFit: true,
		height: 500,
		padding: [10, 5, 10, 23],
	});

	chart.scale({
		Year: {
			range: [0, 1],
		},
		value: {
			alias: '总播放量(单位:万)',
			sync: true,
			nice: true
		},
		Value: {
			sync: true,
			nice: true
		},
	});
	chart.axis('year', {
		tickLine: null
	});

	const view1 = chart.createView();
	view1.data(data);
	view1
			.interval()
			.position('year*value')
			.style({
				fillOpacity: 1,
			});

	const view2 = chart.createView();
	view2.axis(false);
	view2.data(dv.rows);
	view2
			.line()
			.position('Year*Value')
			.style({
				stroke: '#969696',
				lineDash: [3, 3]
			})
			.tooltip(false);
	view2.annotation().text({
		content: '',
		position: ['min', 'min'],
		style: {
			fill: '#8c8c8c',
			fontSize: 14,
			fontWeight: 300
		},
		offsetY: -140
	});

	chart.render();
})
</script>

<template>
	<div :id="containerName"></div>
</template>

<style lang="scss" scoped>

</style>
