<script setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import {onMounted} from "vue";


function initMap() {
	AMapLoader.load({
		key: "0f680fc17ef03445c8e5548cc28a7225",             // 申请好的Web端开发者Key，首次调用 load 时必填
		version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
		plugins: ['AMap.Geolocation', 'AMap.Marker','AMap.MarkerCluster'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
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
		var styles = [
			{
				url: "imgs/1.png",
				size: new AMap.Size(32, 32),
				offset: new AMap.Pixel(-16, -30)
			},
			{
				url: "imgs/2.png",
				size: new AMap.Size(32, 32),
				offset: new AMap.Pixel(-16, -30)
			},
			{
				url: "imgs/3.png",
				size: new AMap.Size(48, 48),
				offset: new AMap.Pixel(-24, -45),
				textColor: '#CC0066'
			}];
		var points = [
			{weight: 8, lnglat: ["108.939621", "34.343147"]},
			{weight: 1, lnglat: ["113.370643", "22.938827"]},
			{weight: 1, lnglat: ["112.985037", "23.15046"]},
			{weight: 1, lnglat: ["110.361899", "20.026695"]},
			{weight: 1, lnglat: ["121.434529", "31.215641"]},
		];
		let bgColor = '';
		var count = points.length;
		var _renderClusterMarker = function (context) {
			// 聚合中点个数
			var clusterCount = context.count;
			var div = document.createElement('div');
			// 聚合点配色
			var defaultColor = [
				'204,235,197',
				'168,221,181',
				'123,204,196',
				'78,179,211',
				'43,140,190',
			]
			if (clusterCount >= 0 && clusterCount < 10) {
				bgColor = defaultColor[0];
			} else if (clusterCount >= 10 && clusterCount < 100) {
				bgColor = defaultColor[1];
			} else if (clusterCount >= 100 && clusterCount < 1000) {
				bgColor = defaultColor[2];
			} else if (clusterCount >= 1000 && clusterCount < 10000) {
				bgColor = defaultColor[3];
			} else if (clusterCount >= 10000) {
				bgColor = defaultColor[4];
			}
			div.style.backgroundColor = 'rgba(' + bgColor + ',.5)';
			var size = Math.round(25 + Math.pow(clusterCount / count, 1 / 5) * 40);
			div.style.width = div.style.height = size + 'px';
			div.style.border = 'solid 1px rgba(' + bgColor + ',1)';
			div.style.borderRadius = size / 2 + 'px';
			// div.innerHTML = context.count;
			div.style.lineHeight = size + 'px';
			div.style.color = '#ffffff';
			div.style.fontSize = '12px';
			div.style.textAlign = 'center';
			context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
			context.marker.setContent(div);
		};
		var _renderMarker = function (context) {
			var content = '<div style="background-color: rgba(255,255,178,.9); height: 18px; width: 18px; border: 1px solid rgba(255,255,178,1); border-radius: 12px; box-shadow: rgba(0, 0, 0, 1) 0px 0px 3px;"></div>';
			var offset = new AMap.Pixel(-9, -9);
			context.marker.setContent(content)
			context.marker.setOffset(offset)
		}
		var cluster = new AMap.MarkerCluster(map, points, {
			gridSize: 60, // 聚合网格像素大小
			renderClusterMarker: _renderClusterMarker, // 自定义聚合点样式
			renderMarker: _renderMarker,   // 自定义非聚合点样式
		});
		map.plugin(["AMap.MarkerCluster"], function () {
			cluster = new AMap.MarkerCluster(
					map,     // 地图实例
					points, // 海量点数据，数据中需包含经纬度信息字段 lnglat
					{
						styles: styles
					});
		});
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
