<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { TableV2FixedDir, TableV2SortOrder } from "element-plus";
import type { SortBy } from "element-plus";

import { fetchStreamJson } from "stream-json-parse";

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
  { key: "createTime", name: "投稿日期", width: 120 },
  { key: "link", name: "链接", width: 119 },
  { key: "play", name: "播放量", width: 80 },
  { key: "danmaku", name: "弹幕数", width: 60 },
  { key: "reply", name: "评论数", width: 60 },
  { key: "likePoint", name: "点赞数", width: 60 },
  { key: "coin", name: "投币", width: 60 },
  { key: "favorite", name: "收藏", width: 60 },
  { key: "share", name: "分享", width: 60 },
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
        // 绑定数据 可在此处对数据进行加工，但会影响到性能
        rowData[column.dataKey] = item[column.dataKey];
        return rowData;
      },
      { id: item.id }
    )
  );

// 锁定表头表尾
columns[0].fixed = TableV2FixedDir.LEFT;
columns[13].fixed = TableV2FixedDir.RIGHT;

onMounted(async () => {});

// fetch 流式传输 从7秒减少到3秒
let handleRequest2 = async () => {
  let time = performance.now();
  let accumulatedText = "";
  const response = await fetch("/data0623large.json");
  const reader = response.body!.getReader();
  const stream = new ReadableStream({
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          break;
        }

        // 处理每个返回的数据块
        // let partialResult;
        // try {
        //   // partialResult = JSON.parse(new TextDecoder().decode(value));
        //   partialResult = new TextDecoder().decode(value);
        //   accumulatedText += partialResult;
        //   Object.assign(
        //     data,
        //     generateData(columns, JSON.parse(accumulatedText))
        //   );
        // } catch (e) {
        //   console.error("解析错误", e);
        // }

        controller.enqueue(value);
      }
    },
  });
  const result = await new Response(stream).json();
  // Object.assign(data, generateData(columns, JSON.parse(accumulatedText)));
  Object.assign(data, generateData(columns, result));
  loading.value = false;
  console.log("流式传输:" + (performance.now() - time));
};

// todo 流式传输时同步处理部分渲染，对返回的部分数据修正为 JSON 格式
let handleRequest3 = async () => {
  let time = performance.now();
  await fetchStreamJson({
    url: "/data0623large.json",
    JSONParseOption: {
      // completeItemPath: ["data", arrayItemSymbol], // 完整解析才上报
      updatePeriod: 300, // 执行 jsonCallback 的间隔
      // 对每次返回的部分 json 进行解析，添加到渲染列表
      jsonCallback: (error, isDone, value) => {
        if (loading.value) {
          Object.assign(data, generateData(columns, value));
          loading.value = false;
          console.log("第一次渲染时间:" + (performance.now() - time));
        }
        if (isDone) {
          Object.assign(data, generateData(columns, value));
        }
      },
    },
  });
  console.log("流式传输总时间:" + (performance.now() - time));
};

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
</script>

<template>
  <div>
    <div class="head">
      本次共收录 2023 上半年共 1084 首绫曲，您可以通过 [Shift + 鼠标滚轮]
      来左右滑动查看
      <button @click="handleRequest2()">流式传输</button>
      <button @click="handleRequest3()">流式传输处理</button>
    </div>
    <div style="height: 80vh; width: 90vw; margin: 9vh auto">
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
.head {
  font-size: 1.5rem;
  margin: 3vh 0 -6vh 5vw;
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
