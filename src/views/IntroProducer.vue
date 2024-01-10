<script lang="ts" setup>
import { onMounted } from "vue";
// todo 减少滚动的等待时间间隔
let options = {
  scrollBar: true,
  // scrollingSpeed: 700
};
// fixme vue-fullpage 只能被初始化一次，在两个页面使用时由于前一个路由缓存了所以不会被销毁，导致二次初始化
onMounted(() => {
  // 隐藏签名 + 报错
  document.querySelector(".fp-enabled");
  (() => {
    let fpWatermark = document.querySelector(
      ".fp-watermark"
    ) as HTMLElement | null;
    if (fpWatermark) {
      fpWatermark.style.display = "none";
      console.clear();
    }
  })();
});
</script>

<template>
  <full-page ref="fullpage" :options="options">
    <!--todo 完成整页滚动内容，可以加一个 固钉 affix （可以使用 naive UI）-->
    <div class="section">
      <p>大体介绍 Vocaloid (Logo)</p>
      <p>vocaloid 是什么</p>
    </div>
    <div class="section">
      <p>
        洛天依（边框为该角色的背景色）[把设定集的内容移植过来（ai
        抠图、添加动画）+ 音之精灵]
      </p>
    </div>
    <div class="section">
      <p>
        乐正绫（如果您想知道更多有关绫的内容，可以移步
        <a href="/#/ling" target="_blank">[此处]</a> ）
      </p>
    </div>
  </full-page>
  <!-- </div> -->
  <center style="line-height: 100vh; font-size: 3rem">
    这里是 Producer 页面, 还在开发中
  </center>
</template>

<style lang="scss" scoped>
div {
  text-align: center;
}
</style>
