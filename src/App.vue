<script setup lang="ts">
import { useRouter } from "vue-router";
import MobilePage from "./components/MobilePage.vue";
import TheBackTop from "./components/TheBackTop.vue";
import TheCircularNav from "./components/TheCircularNav.vue";
import TheRightMenu from "./components/TheRightMenu.vue";
import IntroLing from "./views/IntroLing.vue";
import { onMounted, ref } from "vue";
const router = useRouter();
// router.push('/message')

// 控制台输出
document.addEventListener("keydown", e => {
  if (
    e.code === "F12" ||
    ((e.code === "KeyJ" || e.code === "KeyI") &&
      (e.ctrlKey || e.metaKey) &&
      (e.shiftKey || e.altKey))
  ) {
    console.clear();
    console.log(
      ` %c「我也曾忐忑 如果没有如果」\n %c「感谢你 停留时 看到我」\n%c 欢迎访问本博客 %c 一座互联网角落的孤岛 \n%c 联系博主：ling.vc@foxmail.com ✧(≖ ◡ ≖✿) \n %c `,
      `color: #ee0000; font-size: 16px;margin: 10px 0 5px 0 ;`,
      "color: #ee0000; font-size: 16px;margin: 5px 0 10px 0 ;",
      "background: #35495e; padding: 4px; border-radius: 3px 0 0 3px; color: #fff;color: #66ccff; font-size: 16px;margin-bottom:10px;",
      "background: #41b883; padding: 4px; border-radius: 0 3px 3px 0; color: #fff;color: #00ffcc; font-size: 16px;margin-bottom:10px;",
      "color: #ee0000; font-size: 16px;margin: 0 0 10px 0 ;",
      "font-size:880px;line-height:335px;margin-bottom:-1000px;background:url('https://i0.hdslb.com/bfs/album/9126b8133d66830b8e74cc8b5feca8f787efd42d.png@1e_1c.webp') no-repeat"
    );
  }
});

// onMounted(() => {
//   let viewport = document.getElementById("viewport");
//   let screenChange = document.getElementById("screen-change");
//   let dw = 0;
//   if (document.body.clientHeight > document.body.clientWidth) {
//     dw = 750; //页面的高度
//     screenChange!.classList.remove("h");
//     screenChange!.classList.add("w");
//   } else if (document.body.clientHeight < document.body.clientWidth) {
//     dw = 1334; //页面的宽度
//   }
//   viewport!.setAttribute("content", "width=" + dw + ", user-scalable=no");
//   window.addEventListener(
//     "orientationchange",
//     function () {
//       if (window.orientation == 0) {
//         screenChange!.classList.remove("h");
//         screenChange!.classList.add("w");
//         dw = 750; //页面的高度
//         viewport!.setAttribute("content", "width=" + dw + ", user-scalable=no");
//       } else if (window.orientation == 90) {
//         screenChange!.classList.remove("w");
//         screenChange!.classList.add("h");
//         dw = 1334; //页面的宽度
//         viewport!.setAttribute("content", "width=" + dw + ", user-scalable=no");
//       }
//     },
//     false
//   );
// });

// 移动端跳转

let width = ref(window.innerWidth);
window.addEventListener("resize", () => {
  width.value = window.innerWidth;
});
</script>

<template>
  <mobile-page v-if="width <= 768" />
  <template v-else>
    <the-circular-nav />
    <the-back-top />
    <the-right-menu />

    <router-view v-slot="{ Component, route }">
      <transition name="scale" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
      <transition name="scale" mode="out-in">
        <component :is="Component" :key="route.path" v-if="!route.meta.keepAlive" />
      </transition>
    </router-view>
  </template>
</template>
<!-- todo 移动端适配，横屏显示 -->
<style>
/* #screen-change {
  position: absolute;
  left: 50%;
  top: 50%;
  overflow: hidden;
  z-index: 10;
}
#screen-change.w {
  height: 100vw;
  width: 100vh;
  transform: translate(-50%, -50%) rotate(90deg);
  -webkit-transform: translate(-50%, -50%) rotate(90deg);
}
#screen-change.h {
  height: 100vh;
  width: 100vw;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
} */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
}

html {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

html * {
  font-family: 'LXGW WenKai', LXGW WenKai Lite, serif !important;
}

body,
html {
  cursor: url(./assets/lingCursor/乐正绫-正常选择.cur), auto !important;
}

a:hover,
button:hover {
  cursor: url(./assets/lingCursor/乐正绫-链接选择1.cur), auto !important;
}

input:hover {
  cursor: url(./assets/lingCursor/乐正绫-手写.cur), auto !important;
}
</style>
