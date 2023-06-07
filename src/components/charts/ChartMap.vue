<script lang="ts" setup>
import {onMounted} from "vue";
import AMapLoader from '@amap/amap-jsapi-loader'

const props = defineProps<{
	containerName: string
}>()
const {containerName} = props
onMounted(() => {

})
</script>

<template>
	<div :id="containerName"></div>
</template>

<style lang="scss" scoped>

</style>
