<script lang="ts" setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { smoothScroll } from "../utils/scrollToPosition";

let scrollTop = ref(document.documentElement.scrollTop);
onMounted(() => {
  window.addEventListener("scroll", () => {
    scrollTop.value = document.documentElement.scrollTop;
  });
});

// 顶部时拉环隐藏，点击回到顶部时隐藏，其余位置显示
let scrollFlag = ref(false);
let totalStyle = computed(() => {
  return scrollTop.value <= 50 || scrollFlag.value ? "120vh!important" : "";
});
function scroll() {
  scrollFlag.value = true;
  smoothScroll(0);
  setTimeout(() => {
    scrollFlag.value = false;
  }, 1000);
}
</script>

<template>
  <!-- 因为有两个动态属性，若写:style="totalStyle, scrollHide"会被自动格式化工具破坏为该逗号表达式:style="(totalStyle, scrollHide)"-->
  <div id="backToTop" :style="{ bottom: totalStyle }">
    <div class="tie"></div>
    <button title="返回顶部" @click="scroll"></button>
  </div>
</template>

<style lang="scss" scoped>
#backToTop {
  position: fixed;
  bottom: 15vh;
  right: 1vw;
  z-index: 100;
  transition: all 1s;

  /* 绳子 */
  .tie {
    height: 200vh;
    background: url(../assets/backTop/拉环绳子.gif) no-repeat bottom / contain !important;
    //background: url("https://i0.hdslb.com/bfs/album/6c38c791008ecda41c14a561d6ceac257dab0e50.gif@1e_1c.webp") no-repeat bottom !important;
  }

  /* 本体 */
  button {
    /* 原图是 5:9 */
    width: 6.67vw;
    height: 12vw;
    transform: translateY(-5vh);
    border: none;
    cursor: pointer;
    background: url(../assets/backTop/拉环按钮.gif) no-repeat bottom / contain !important ;
    //background: url("https://i0.hdslb.com/bfs/album/72db6a29c5de085d09a1fd50e3f9b38c58469f89.gif@1e_1c.webp") no-repeat bottom !important;
  }

  &:hover {
    bottom: 12vh !important;
    transition: all 0.75s;
  }
}
</style>
