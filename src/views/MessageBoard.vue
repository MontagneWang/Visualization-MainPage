<script lang="ts" setup>
// import {onMounted, reactive, ref, watch, watchEffect} from 'vue'
//
// let title = ['score', 'title', 'author', 'createTime', 'play', 'danmaku', 'reply', 'likePoint', 'coin', 'favorite', 'share']
// let titleName = ['得分', '标题', '作者', '投稿时间', '播放', '弹幕', '评论', '点赞', '投币', '收藏', '分享']
// let songData = reactive([])
//
// onMounted(async () => {
// 	const response = await fetch('/data0623.json')
// 	songData = await response.json()
// 	console.log(songData[0]['title'])
// })
//
// const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
// 		Array.from({length}).map((_, columnIndex) => ({
// 			...props,
// 			key: `${prefix}${columnIndex}`,
// 			dataKey: `${prefix}${columnIndex}`,
// 			title: `${titleName[columnIndex]}`,
// 			width: 100,
// 		}))
//
// // score title author createTime play danmaku reply likePoint coin favorite share
// // 得分 标题 作者 投稿时间 播放 弹幕 评论 点赞 投币 收藏 分享
// const columns = generateColumns(10)
// columns.unshift({
// 	key: 'column-n-1',
// 	width: 80,
// 	title: '周刊得分',
// 	cellRenderer: ({rowIndex}) => `${rowIndex + 1}`,
// 	align: 'center',
// })
//
// const generateData = (columns: ReturnType<typeof generateColumns>, length = 1000, prefix = 'row-') =>
// 		Array.from({length}).map((_, rowIndex) => {
// 			return columns.reduce(
// 					(rowData, column, columnIndex) => {
// 						rowData[column.dataKey] = `Row${rowIndex}-Col${columnIndex}`
// 						// rowData[column.dataKey] = `${songData[rowIndex]}-Col${columnIndex}`
// 						// rowData[column.dataKey] = `${songData[rowIndex][titleName[columnIndex]]}-Col${columnIndex}`
// 						return rowData
// 					},
// 					{
// 						id: `${prefix}${rowIndex}`,
// 						parentId: null,
// 					}
// 			)
// 		})
// let data = generateData(columns, 1000)
//
// // watch(songData,()=>{
// // 	data = generateData(columns, 1000)
// // })
//
// // 十字显示
// const cellProps = ({columnIndex}) => {
// 	const key = `hovering-col-${columnIndex}`
// 	return {
// 		['data-key']: key,
// 		onMouseenter: () => {
// 			kls.value = key
// 		},
// 		onMouseleave: () => {
// 			kls.value = ''
// 		},
// 	}
// }
//
// const kls = ref<string>('')
//

</script>

<template>
		<center style="line-height: 100vh;font-size: 3rem;">这里是 留言板 页面, 还在开发中</center>

	<!--<div style="height: 70vh;width:80vw;margin:10vh auto">-->
	<!--	<el-auto-resizer>-->
	<!--		<template #default="{ height, width }">-->
	<!--			<el-table-v2-->
	<!--					:cell-props="cellProps"-->
	<!--					:class="kls"-->
	<!--					:columns="columns"-->
	<!--					:data="data"-->
	<!--					:height="height"-->
	<!--					:width="width"-->
	<!--			/>-->
	<!--		</template>-->
	<!--	</el-auto-resizer>-->
	<!--</div>-->
</template>


<style>
.hovering-col-0 [data-key='hovering-col-0'],
.hovering-col-1 [data-key='hovering-col-1'],
.hovering-col-2 [data-key='hovering-col-2'],
.hovering-col-3 [data-key='hovering-col-3'],
.hovering-col-4 [data-key='hovering-col-4'],
.hovering-col-5 [data-key='hovering-col-5'],
.hovering-col-6 [data-key='hovering-col-6'],
.hovering-col-7 [data-key='hovering-col-7'],
.hovering-col-8 [data-key='hovering-col-8'],
.hovering-col-9 [data-key='hovering-col-9'],
.hovering-col-10 [data-key='hovering-col-10'] {
	background: var(--el-table-row-hover-bg-color);
}

[data-key='hovering-col-0'] {
	font-weight: bold;
	user-select: none;
	pointer-events: none;
}
</style>