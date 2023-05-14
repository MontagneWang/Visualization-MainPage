<script lang="ts" setup>
import axios from '../api/axios';
import {onMounted} from "vue";
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

onMounted(async () => {
	try {
		// const {data: {data:res}} = await axios.get('/x/web-interface/view?bvid=BV1BM411k7MS');
		const {data:res} = await axios.get('/Midterm/getdata.php?page=18');
		console.log(res)
	} catch (error) {
		console.error('Error fetching songs:', error);
	}
});
</script>

<template>
	<h1>这里是 DataVisualization</h1>
	</template>

<style scoped>
body {
	margin: 0 auto;
}
</style>
