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
</template>

<style lang="scss" scoped>
* {
	padding: 0;
	margin: 0;
}

</style>
