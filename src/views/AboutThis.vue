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
	<div class="container">
		<div class="section section1">
			<h1>第1屏</h1>
		</div>
		<div class="section section2">
			<h1>第2屏</h1>
		</div>
		<div class="section section3">
			<h1>第3屏</h1>
		</div>
		<div class="section section4">
			<h1>第4屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>
		<div class="section section5">
			<h1>第5屏</h1>
		</div>

	</div>


</template>

<style lang="scss" scoped>
* {
	padding: 0;
	margin: 0;
}

html,
body {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.container {
	width: 100%;
	height: 500%;
	position: absolute;
	top: 0;
	transition: all 0.3s ease;
}


.section1 {
	background-color: rebeccapurple;

}

.section2 {
	background-color: skyblue;

}

.section3 {
	background-color: red;

}

.section4 {
	background-color: orange;

}

.section5 {
	background-color: lightgreen;

}

.section {
	width: 100%;
	height: 20%;
	display: flex;
	color: white;
	justify-content: center;
	align-items: center;
	background-size: cover;
}


.controls {
	position: absolute;
	top: 50%;
	right: 20px;
	transform: translateY(-50%);
	list-style: none;
}

.controls li {
	width: 50px;
	height: 50px;
	font: bold 22px/50px '宋体';
	text-align: center;
	background-color: #000;
	color: white;
	cursor: pointer;
	border-radius: 50%;
}

.controls li+li {
	margin-top: 5px;
}

.controls li.active {
	background-color: #fff;
	color: red;
}
</style>
