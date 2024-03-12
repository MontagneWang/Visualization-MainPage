<script lang="ts" setup>
import {useCounterStore} from '../stores'
import {ref,watchEffect} from "vue";

defineProps<{ msg: string }>()

let Counter
watchEffect(() => {
	Counter = useCounterStore()
})

// 直接请求 页面会卡死
let handleRequest1 = async () => {
  let time = performance.now();
  // const response = await fetch("/data0623.json"); // 1mb
  const response = await fetch("/data0623large.json"); // 36mb 压缩后 8m
  const fetchData = await response.json();
  // 将获取的数据加工后替换到表格渲染数据上
  // Object.assign(data, generateData(columns, fetchData));
  // loading.value = false;
  console.log("直接请求:" + (performance.now() - time));
};

// 分块请求, 部署到服务器时无法获取到 contentLength
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

    if (contentLength === null) {
      throw new Error("Content-Length header is missing");
    }

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

  // Object.assign(data, generateData(columns, fullJson));
  // loading.value = false;
  console.log("分块请求:" + (performance.now() - time));
};
</script>

<template>
	<div class="fancy-btn">
		<slot> <!-- 插槽出口 -->
			插槽未填写，显示默认内容 <!-- 默认内容 -->
		</slot>
	</div>

</template>

<style lang="scss" scoped>

</style>