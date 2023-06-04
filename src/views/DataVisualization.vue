<script lang="ts" setup>
import axios from '../api/axios';
import {onMounted, reactive, ref, toRaw, watchEffect} from "vue";
import ChartRank from "../components/charts/ChartRank.vue";
import ChartCircle from "../components/charts/ChartCircle.vue";
import ChartBubble from "../components/charts/ChartBubble.vue";

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
let counter = 1

let options = {
	scrollBar: true,
	// scrollingSpeed: 700
}
let time = ref(new Date())
setInterval(() => {
	time.value = new Date();
}, 1000);

// const updateData = async (id = 314772, title = time.value.toLocaleString()) => {
// 	try {
// 		const response = await axios.post('/Visualization/tempTest/getdata.php', {
// 			id: id,
// 			title: title
// 		});
// 		console.log(response.data);
// 		await getData()
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

let res = reactive([
	{id: 0, title: '', play: 0}
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

watchEffect(() => {
	// updateData()
})
onMounted(() => {
	// getData()

	// 隐藏签名 + 报错
	;(()=>{
		let fpWatermark = document.querySelector('.fp-watermark') as HTMLElement | null;
		if (fpWatermark) {
			fpWatermark.style.display = 'none';
			console.clear()
		}
	})()
});

</script>

<template>
	<!--todo 完成整页滚动内容-->
	<!--todo 这里可以加一个 固钉 affix （可以使用 naive UI）-->
	<div>
		<full-page ref="fullpage" :options="options">
			<div class="section">
				<h1>这里是 DataVisualization</h1>
				<chart-bubble :container-name="'container'+counter++"
				              style="overflow-x: hidden"/>
			</div>
			<div class="section">
				<chart-circle :container-name="'container'+counter++"
				              style="overflow-x: hidden"/>
			</div>
			<div class="section">
				<chart-rank :container-name="'container'+counter++"
				            style="overflow-x: hidden"/>
			</div>
		</full-page>
	</div>

	<!--<ul>-->
	<!--	<li v-for="song in res">-->
	<!--		{{ song.title }} - {{ song.play }}-->
	<!--	</li>-->
	<!--</ul>-->
	<!--<hr>-->
	<!--<ul>-->
	<!--	<li v-for="song in res">-->
	<!--		<input style="width: 76%" v-model="song.title" />-->
	<!--		<input style="width: 20%" v-model="song.play" />-->
	<!--	</li>-->
	<!--</ul>-->
</template>

<style scoped>

body {
	margin: 0 auto;
}

div {
	text-align: center;
}
</style>
