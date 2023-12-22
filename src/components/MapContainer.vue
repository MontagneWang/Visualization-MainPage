<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import {onMounted, ref} from "vue";

function initMap() {
	AMapLoader.load({
		key: "0f680fc17ef03445c8e5548cc28a7225",             // 申请好的Web端开发者Key，首次调用 load 时必填
		version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
		plugins: ['AMap.Geolocation', 'AMap.Marker', 'AMap.MarkerCluster'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
	}).then((AMap) => {
		let map = new AMap.Map('container', {
			resizeEnable: true,
			viewMode: '3D', //是否为3D地图模式
			zoom: 5, //初始化地图级别
			center: [110, 33], //初始化地图中心点位置
			mapStyle: 'amap://styles/fresh',  //设置地图的显示样式
		})

		locData.forEach(item => {
			// todo 圈改小 中心加点
			let center = new AMap.LngLat(item['LngLat'][0], item['LngLat'][1]);
			let multiples = () => {
				if (item['value'] > 3000) {
					return 60
				}
				if (item['value'] > 2000) {
					return 70
				}
				if (item['value'] > 1000) {
					return 80
				}
				if (item['value'] > 500) {
					return 100
				}
				if (item['value'] > 100) {
					return 200
				}
				if (item['value'] > 50) {
					return 300
				}
				if (item['value'] > 10) {
					return 500
				}
				if (item['value'] > 1) {
					return 2000
				}
			}
			let radius = item['value'] * multiples()!;
			// 创建圆形 Circle实例
			let circle = new AMap.Circle({
				// todo 完善更多样式 https://lbs.amap.com/api/javascript-api-v2/documentation#circle
				center: center, //圆心
				radius: radius, //半径
				strokeColor: '#fec87e',
				strokeOpacity: 1,
				strokeWeight: 1.5,
				strokeStyle: 'dashed',
				fillOpacity: 0.4,
				fillColor: '#66ccff',
				zIndex: 5,
				extData: [item['name'], item['value']]
			})
			circle.on('mouseover', (e: { originEvent: { offsetY: number; offsetX: number; }; target: { _opts: { extData: any[]; }; }; }) => {
				showText.value = true
				positionTop.value = e.originEvent.offsetY
				positionLeft.value = e.originEvent.offsetX
				cityName.value = e.target._opts.extData[0]
				pubCount.value = e.target._opts.extData[1]
			});
			window.addEventListener('mousemove',e => {
					positionTop.value = e.offsetY
					positionLeft.value = e.offsetX
			})
			// map.on('mouseout', () => {
			circle.on('mouseout', () => {
				showText.value = false
			});
			map.add(circle);
		})

	}).catch(err => {
		console.dir(err);
	})
}

let showText = ref(false)
let positionTop = ref(0)
let positionLeft = ref(0)
let cityName = ref('')
let pubCount = ref(0)
let locData: any[] = []
onMounted(() => {
	initMap()
	fetch('/dataForLocation.json')
			.then(res => res.json())
			.then(data => {
				locData = data
			})
})

</script>

<template>
	<div id="container">
		<div v-show="showText"
		     :style="{top: positionTop+'px',left: positionLeft+'px',}"
		     class="text">
			<span>城市：{{ cityName }}</span>
			<br>
			<span>投稿数：{{ pubCount }}</span>
		</div>
	</div>

</template>

<style lang="scss" scoped>
.text {
	z-index: 2;
	position: absolute;
	font-size: 1.5vw;
	line-height: 2vw;
	padding: 1vw;
	border: 0.1vw solid #fff;
	background: #ffffffa0;
	border-radius: 1.5vw;
	user-select: none;
}

#container {
	padding: 0;
	margin: 0;

	a, .amap-copyright {
		display: none !important;
	}
}
</style>
