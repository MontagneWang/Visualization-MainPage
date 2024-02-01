<template>
	<div class="head">本次共收录 2023 上半年的 1084 首绫曲，您可以通过 [Shift + 鼠标滚轮] 来左右滑动查看</div>
	<div style="height: 70vh;width:90vw;margin:10vh auto">
		<!-- 修改为虚拟列表实现 -->
		<el-auto-resizer>
			<template #default="{ height, width }">
				<el-table
						:data="tableData"
						border
						v-loading="loading"
						height="80vh"
						stripe>
					<el-table-column fixed label="分数排行" prop="rank" rfixed width="90%"/>
					<el-table-column fixed label="作品名称" prop="title" rfixed width="400%"/>
					<el-table-column label="周刊分数" prop="score" rfixed width="90%"/>
					<el-table-column fit label="作者" prop="author" width="100%"/>
					<el-table-column fit label="投稿时间" prop="createTime" width="110%"/>
					<el-table-column fit label="播放" prop="play" width="90%"/>
					<el-table-column fit label="弹幕" prop="danmaku"/>
					<el-table-column fit label="评论" prop="reply"/>
					<el-table-column fit label="点赞" prop="likePoint"/>
					<el-table-column fit label="投币" prop="coin"/>
					<el-table-column fit label="收藏" prop="favorite"/>
					<el-table-column fit label="分享" prop="share"/>
					<el-table-column fit label="链接" prop="link" width="250%"/>
					<el-table-column fit label="简介" prop="description" width="2000%"/>
				</el-table>
			</template>
		</el-auto-resizer>
	</div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";

let tableData = reactive([])
const loading = ref(true)

onMounted(async () => {
	const response = await fetch('/data0623.json')
	let newData = await response.json()
	// 若直接替换会丢失响应式
	Object.assign(tableData, newData)
	loading.value = false
	console.log(tableData)
})
// // 刷新懒加载后的数据
// function refreshMenu(pid) {
// 	loading.value = true
// 	if (loadNodeMap.size > 0) {
// 		const hasNode = loadNodeMap.has(pid)
// 		if (hasNode) {
// 			const { row, treeNode, resolve } = loadNodeMap.get(pid)
// 			proxy.$refs.listRef.store.states.lazyTreeNodeMap[pid] = []
// 			loadMenu(row, treeNode, resolve)
// 		}
// 		loading.value = false
// 	} else {
// 		getList()
// 	}
// }

</script>

<style scoped>
.head{
	font-size: 1.5rem;
	margin: 4vh 0 -6vh 5vw;
}
</style>