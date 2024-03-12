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
let data = reactive<Song[]>([]);
onMounted(async () => {
  // todo 分割大请求，先请求小文件渲染一部分，再不断请求数据并更新
});

// 直接请求，需要 7s，页面卡死
let handleRequest1 = async () => {
  let time = performance.now();
  // const response = await fetch("/data0623.json"); // 1mb
  const response = await fetch("/data0623large.json"); // 36mb 压缩后 8m
  const fetchData = await response.json();
  // 将获取的数据加工后替换到表格渲染数据上
  Object.assign(data, generateData(columns, fetchData));
  loading.value = false;
  console.log("直接请求:" + (performance.now() - time));
  // todo 每个 添加计时模块
};

// fetch 流式传输 从7秒减少到3秒
// todo 2 并发读取：你可以尝试使用多个读取器并发地从服务器读取数据。这可能需要服务器支持Range请求，这样每个读取器可以读取文件的不同部分。然而，这可能会使代码复杂化，因为你需要处理并发读取和数据合并。
// todo 3 处理数据的同时读取数据：在你的代码中，你首先读取所有的数据，然后处理数据。你可以尝试边读取数据边处理数据，这样可能会更快。例如，如果你的数据是JSON格式的，你可以使用流式JSON解析器，如JSONStream或stream-json。
// let data = reactive<Song[]>([]);
let handleRequest2 = async () => {
  let time = performance.now();
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
        controller.enqueue(value);
      }
    },
  });
  const result = await new Response(stream).json();
  Object.assign(data, generateData(columns, result));
  loading.value = false;
  console.log("流式传输:" + (performance.now() - time));
};

// 分块请求
let handleRequest3 = async (size: number) => {
  let time = performance.now();

  // 每个请求块的大小，单位是字节。
  const CHUNK_SIZE = size * 1024; // size KB

  const dataUrl = "/data0623large.json";
  const chunks = ref<string[]>([]);

  // 先获取文件总大小
  const fetchTotalSize = async () => {
    const response = await fetch(dataUrl, { method: "HEAD" });
    const contentLength = response.headers.get("Content-Length");

    // if (contentLength === null) {
    //   throw new Error("Content-Length header is missing");
    // }

    return Number(contentLength);
  };

  const fetchChunk = async (start: number, end: number) => {
    const response = await fetch(dataUrl, {
      headers: {
        Range: `bytes=${start}-${end}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    chunks.value.push(text);
  };

  const totalSize = await fetchTotalSize();
  const chunkCount = Math.ceil(totalSize / CHUNK_SIZE);

  for (let i = 0; i < chunkCount; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min((i + 1) * CHUNK_SIZE - 1, totalSize - 1);

    try {
      await fetchChunk(start, end);
    } catch (error) {
      console.error(`Failed to fetch chunk ${i + 1}:`, error);
    }
  }

  const fullText = chunks.value.join("");
  const fullJson = JSON.parse(fullText);

  Object.assign(data, generateData(columns, fullJson));
  loading.value = false;
  console.log("分块请求:" + (performance.now() - time));
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
      <button @click="handleRequest1()">直接请求</button>
      <button @click="handleRequest2()">流式传输</button>
      <button @click="handleRequest3(500)">分块请求500k</button>
      <button @click="handleRequest3(50)">分块请求50k</button>
      <button @click="handleRequest3(1000)">分块请求1m</button>
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
