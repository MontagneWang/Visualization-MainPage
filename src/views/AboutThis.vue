<script lang="ts" setup>
import {useCounterStore} from '../stores'
import {onMounted, watchEffect} from "vue";

// 不能用 computed，因为在 computed 函数中，
// 对 useCounterStore() 的调用是异步的，而 Counter 在模板中使用时是同步的，
// 所以在模板中使用 Counter.count 时，Counter 还未被赋值为 useCounterStore() 的返回值，
// 可以使用 watchEffect 函数，让 Counter 在 useCounterStore() 发生变化时同步更新，代码如下：
let Counter
watchEffect(() => {
	Counter = useCounterStore()
})

</script>

<template>
	<h1>这里是 AboutThis</h1>
	<hr>
	<h2>项目说明：通过 B 站的视频数据，可视化展示从 2012-2023 年这 11 年间 Vocaloid China 的发展情况。</h2>
	<h2>从 四十七万 条数据中发现不同视频之间的关联，筛选出有意义的维度进行展示。</h2>
	<p>&emsp;&emsp;创作者、创作社团、创作者们合作关系[联合投稿]</p>
	<p>&emsp;&emsp;歌手与其他歌手的合唱次数 </p>
	<p>&emsp;&emsp;视频（播放量、点赞数、硬币、分享数、评论、投稿地理位置、时间等） </p>
	<h2>该可视化项目采用前后端分离实现，天然解耦为三个部分，通过数据库中心相连：</h2>
	<h3>&emsp;&emsp;爬虫：采集 B 站数据，初步清洗后传入后端</h3>
	<h3>&emsp;&emsp;后端：负责再加工数据并向数据库写入，在鉴权后响应接口返回数据</h3>
	<h3>&emsp;&emsp;前端：通过接口获取数据，负责数据的可视化展示与交互</h3>
	<h2>前端技术栈：Vue3 + TypeScript + Sass + Element-plus</h2>
	<h4>&emsp;&emsp;包括使用 Vite 作为脚手架，Pinia 进行状态管理，Vue-router 构建前端路由等</h4>
	<h2>后端使用 PHP 构建 RESTful API</h2>
	<h2>爬虫基于 Python</h2>
	<h2>数据库使用 MySQL</h2>
	<br>
	<h1 style="text-align: center">项目比较复杂，目前初步构建完框架与基础配置，可能无法在结课前将所有功能都完美实现，但作为一个课程作业提交应该还是可以的</h1>
	<br>
	<br>
	<br>
	<br>
	<br>
</template>

<style lang="scss" scoped>
* {
	padding: 0;
	margin: 0;
}

* {
	margin: 20px 5%;
}
</style>
