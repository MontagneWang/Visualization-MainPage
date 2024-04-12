<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { TableV2FixedDir, TableV2SortOrder } from "element-plus";
import type { SortBy } from "element-plus";

interface Song {
  title: string;
  author: string;
  createTime: string;
  link: string;
  play: number;
  danmaku: number;
  reply: number;
  likePoint: number;
  coin: number;
  favorite: number;
  share: number;
  description: string;
  score: number;
  rank: number;
}
const loading = ref(true);
let data = reactive<Song[]>([]);
let columnsName = [
  { key: "title", name: "标题", width: 250 },
  { key: "author", name: "作者", width: 150 },
  { key: "createTime", name: "投稿日期", width: 100 },
  { key: "link", name: "链接", width: 119 },
  { key: "play", name: "播放量", width: 90 },
  { key: "danmaku", name: "弹幕数", width: 70 },
  { key: "reply", name: "评论数", width: 70 },
  { key: "likePoint", name: "点赞数", width: 70 },
  { key: "coin", name: "投币", width: 70 },
  { key: "favorite", name: "收藏", width: 70 },
  { key: "share", name: "分享", width: 70 },
  {
    key: "description",
    name: "简介（鼠标悬浮可查看更多详细信息）",
    width: 500,
    class: "desc",
  },
  { key: "score", name: "综合得分", width: 95 },
  { key: "rank", name: "总排名", width: 60 },
];

const generateColumns = (length: number, dataKeys: any[], props?: any) =>
  Array.from({ length }).map((_, index) => ({
    ...props,
    key: dataKeys[index]["key"],
    dataKey: dataKeys[index]["key"],
    title: dataKeys[index]["name"],
    width: dataKeys[index]["width"],
    class: dataKeys[index]["class"] || "",
    // 更多属性 | https://element-plus.gitee.io/zh-CN/component/table-v2.html#column-%E5%B1%9E%E6%80%A7
  }));
let columns = generateColumns(columnsName.length, columnsName);

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  data: Array<any>
) =>
  data.map(item =>
    columns.reduce(
      (rowData, column) => {
        // 绑定数据 可在此处对数据进行加工，比如添加链接
        rowData[column.dataKey] = item[column.dataKey];
        return rowData;
      },
      { id: item.id }
    )
  );

// 锁定表头表尾
columns[0].fixed = TableV2FixedDir.LEFT;
columns[13].fixed = TableV2FixedDir.RIGHT;

// 排序优化 [2].[4].[5].[6].[7].[8].[9].[10][12][13]
columns[13].sortable = true;
const sortState = ref<SortBy>({
  key: "rank",
  order: TableV2SortOrder.ASC,
});
const onSort = (sortBy: SortBy) => {
  data = data.reverse();
  sortState.value = sortBy;
};

onMounted(async () => {
  // fetch 流式传输同时处理数据，在第一次获取到流数据时返回给渲染数组
  let time = performance.now();
  // const response = await fetch("/data0623.json"); // 1mb
  const response = await fetch("/data0312.json"); // 10mb
  const reader = response.body!.getReader();
  const stream = new ReadableStream({
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          break;
        }

        // 在第一次未渲染时，将返回的流数据解码为字符串，找到最后一个「rank」后「,」的位置，截断之后的文本，构造一个合法的 JSON 并替换渲染数组
        // 如果需要持续更新渲染，可以采用 reduce 累加新文本
        // idea 可以考虑设置定时器，每隔一段时间处理一次数据，将新数据流追加合并到已有数组
        if (loading.value) {
          try {
            let partialResult = new TextDecoder().decode(value);
            let rankIndex = partialResult.lastIndexOf("rank");
            let commaIndex = partialResult.indexOf(",", rankIndex);
            let finalText = partialResult.substring(0, commaIndex) + "]";
            Object.assign(data, generateData(columns, JSON.parse(finalText)));
            loading.value = false;
            console.log("首次渲染时间:" + (performance.now() - time));
          } catch (e) {
            // 只有一种情况会引发异常：请求的总文本太少，第一次 Stream 直接返回了全部数据，导致无法匹配到最后的逗号
            console.warn("数据已全部渲染完毕");
          }
        }

        controller.enqueue(value);
      }
    },
  });
  const result = await new Response(stream).json();
  Object.assign(data, generateData(columns, result));
  loading.value = false;
  console.log("流式传输总时间:" + (performance.now() - time));
});
</script>

<template>
  <div class="container">
    <div class="head">
      <p>
        共收录近十年共 9833 条「乐正绫」相关歌曲/视频，您可以通过 [Shift
        + 鼠标滚轮] 来左右滑动查看
      </p>
      <p>数据暂时粗筛，如有遗漏与不匹配还请见谅，将在之后的版本进行删补</p>
    </div>
    <div class="table">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            fixed
            v-loading="loading"
            :columns="columns"
            :data="data"
            :width="width"
            :height="height"
            :estimated-row-height="83"
            @column-sort="onSort"
          />
        </template>
      </el-auto-resizer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  overflow: hidden; 
  background: url("https://article.biliimg.com/bfs/article/6b55f667d718fda42ffef7550188df246473e2f7.png@1e_1c.webp")
    no-repeat top / cover !important;

  .head {
    font-size: 1.2vw;
    display: inline-block;
    margin: 4vh 0 2vh 5vw;
    padding: 0 1em;
    line-height: 0.5em;
    background-color: #ffffff90;
    border-radius: 0.3em;
  }
  .table {
    height: 80vh;
    width: 90vw;
    margin: 0 auto;
    opacity: 0.85;
  }
}
// 添加 深度选择器，保证影响到子组件。超过五行截取，显示省略号
:deep(.desc) {
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

// 保证移动端可以滑动
:deep(.el-table-v2__body) > div:nth-child(1) {
  overflow: auto !important;
}
</style>
