<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw, watchEffect } from "vue";

// 隐藏签名 + 报错
(() => {
  let fpWatermark = document.querySelector(
    ".fp-watermark"
  ) as HTMLElement | null;
  if (fpWatermark) {
    fpWatermark.style.display = "none";
    console.clear();
  }
})();
</script>

<template>
  <div style="font-size: 2vw; margin: 7.5vw 10vw; width: 16em;scro">
    <p>本站所有数据来自 B 站公开的 API</p>
    <p>您可以通过 右键菜单 了解更多内容</p>
    <hr />
    <div style="font-size: 1.4vw; width: 30em">
      <br />
      <p>「果然是爽朗的大晴天有时会蒙上一层乌云，</p>
      <p>&emsp;在夏季以后不免要有朔风寒凛的严冬，</p>
      <p>&emsp;像季节的飞逝一样，</p>
      <p>&emsp;人生的哀乐也是变换不停的。」</p>
      <br />
      <p>&emsp;记住：并非一切已逝。春天会回来的，带着希望坚持下去。</p>
      <p>&emsp;我要走了，你要勇敢。</p>
    </div>
  </div>
</template>

<style scoped>
body {
	overflow: hidden;
}
</style>
