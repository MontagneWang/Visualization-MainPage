<script setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import {onMounted} from "vue";

function initMap() {
	AMapLoader.load({
		key: "0f680fc17ef03445c8e5548cc28a7225",             // 申请好的Web端开发者Key，首次调用 load 时必填
		version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
		plugins: ['AMap.Geolocation', 'AMap.Marker', 'AMap.MarkerCluster'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
	}).then((AMap) => {
		let map = new AMap.Map('container', {
			resizeEnable: true,
			viewMode: '3D', //是否为3D地图模式
			zoom: 4, //初始化地图级别
			center: [110.699242, 35.99375], //初始化地图中心点位置
			mapStyle: 'amap://styles/fresh',  //设置地图的显示样式
		})
		// let marker = new AMap.Marker({
		// 	position: [110.699242, 35.99375] // 基点坐标
		// });
		// map.add(marker)

		//设置圆形位置
		var center = new AMap.LngLat(116.433322, 39.900255);
		//设置圆的半径大小
		var radius = 100000;
		// 创建圆形 Circle实例
		var circle = new AMap.Circle({
			center: center, //圆心
			radius: radius, //半径
			fillOpacity: 0.4,
			fillColor: '#1791fc',
			zIndex: 5,
		})
		map.add(circle);
		map.setFitView([circle])
	}).catch(err => {
		console.dir(err);
	})
}

onMounted(() => {
	initMap()
})
</script>

<template>
	<div id="container"></div>
</template>

<style lang="scss" scoped>
#container {
	padding: 0;
	margin: 0;

	a, .amap-copyright {
		display: none !important;
	}
}
</style>
