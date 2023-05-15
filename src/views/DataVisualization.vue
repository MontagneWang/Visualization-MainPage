<script lang="ts" setup>
import axios from '../api/axios';
import {onMounted, ref, toRaw, watchEffect} from "vue";
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

let res = ref([
	{id:0,title:'',play:0}
])

async function getData() {
	try {
		const {data: response} = await axios.get('/Visualization/tempTest/getdata.php?page=1');
		res.value = response
		console.log(toRaw(res.value))
	} catch (error) {
		console.error('Error fetching songs:', error);
	}
}
// todo
watchEffect(()=>{
	updateData()
})
onMounted(()=>{
	getData()
});

</script>

<template>
	<h1>这里是 DataVisualization</h1>
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
