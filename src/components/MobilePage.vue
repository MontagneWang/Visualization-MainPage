<script lang="ts" setup>
import { onMounted, ref } from "vue";
import createObserver, { delay } from "../utils/observer";

let [mask, text, text2, text3] = [
  ref<HTMLDivElement | null>(null),
  ref<HTMLDivElement | null>(null),
  ref<HTMLDivElement | null>(null),
  ref<HTMLDivElement | null>(null),
];

onMounted(() => {
  createObserver(mask.value as HTMLDivElement, async () => {
    await delay(1000);
    mask.value!.classList.add("animate__animated", "animate__fadeIn");
    await delay(1000);
    text.value!.classList.add("animate__animated", "animate__fadeInLeft");
    await delay(700);
    text2.value!.classList.add("animate__animated", "animate__fadeInLeft");
    await delay(700);
    text3.value!.classList.add("animate__animated", "animate__fadeInLeft");
  });
});
let vh = window.innerHeight * 0.01; // 重新设置 vh，去除地址栏与底部导航栏
document.documentElement.style.setProperty("--vh", `${vh}px`);
</script>

<template>
  <!-- 竖排文字 向上滑入 -->
  <div ref="mask" class="mask"></div>
  <div class="mobile-container">
    <div class="content">
      <div class="text">
        <p ref="text">「万分抱歉</p>
        <p ref="text2">
          &emsp;站点目前仅支持<span style="letter-spacing: 0">&#8239;</span><span
            style="text-decoration: underline">电脑端</span><span style="letter-spacing: 0">&#8239;</span>访问
        </p>
        <p ref="text3">
          &emsp;希望以后能为您带来更好的阅读体验<span style="letter-spacing: 0">&#8239;</span>」
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mask {
  opacity: 0;
  width: 84vw;
  height: calc(88 * var(--vh));
  position: fixed;
  left: 8vw;
  top: calc(6 * var(--vh));
  background-color: #ffffffa0;
  border-radius: 6vw;
  border: #e98e44 0.75vw solid;
  // border-bottom-color: transparent;
  // border-left-color: transparent;
}

.mobile-container {
  background: url("https://i0.hdslb.com/bfs/article/53c0aee0e0997648fc2ed95c9add25431402305269.png@1e_1c.webp") no-repeat center;
  background-size: cover;

  writing-mode: vertical-rl;
  height: calc(100 * var(--vh));
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .text {
      z-index: 1;
      display: block;
      font-size: 7vw;
      font-weight: bold;
      letter-spacing: 1.25vw;

      p {
        opacity: 0;
      }
    }
  }
}
</style>
