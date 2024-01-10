<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { throttle } from "../utils/throttle";
import { judgeScrollDirection } from "../utils/judgeScrollDirection";

interface RouteMap {
  [key: string]: string;
}

let routerMap: RouteMap = {
  "/": "歌曲数据",
  "/vocaloid": "Vocaloid",
  "/ling": "乐正绫",
  "/producer": "创作者",
  "/club": "创作社团",
  "/song": "词曲站",
  "/message": "留言板",
  "/about": "关于本站",
};
const route = useRoute();
let isScrollingDown = ref(false);
let wheelDirection = 1;

// 导航栏，上滑隐藏下滑显示
window.addEventListener("scroll", () => {
  isScrollingDown.value = judgeScrollDirection();
});

let circularNav = ref<HTMLDivElement | null>(null);
onMounted(() => {
  let navCircle = circularNav.value as HTMLElement;
  let routerLink: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
    ".mainCircularNav > div > ul > li a"
  );
  let menuItems: NodeListOf<HTMLAnchorElement> =
    document.querySelectorAll(".menu li");
  // 初始化一个角度数组变量，用于保存每一个路由的旋转角度，然后做加减运算【此方法可同时解决上锁问题】
  let angleArray = [0, 45, 90, 135, 180, 225, 270, 315];
  // 滚动时修改角度数组，然后将角度赋给每一项路由，最后将是否为第一次滚动的 flag 设置为 false
  function handleWheel() {
    navCircle.classList.add("active");

    angleArray.forEach((eachAngle, index) => {
      angleArray[index] = eachAngle + 45 * wheelDirection;
    });
    menuItems.forEach((item, index) => {
      menuItems[index].style.transform = `rotate(${angleArray[index]}deg)`;
      (
        menuItems[index].childNodes[0] as HTMLElement
      ).style.transform = `rotate(${-angleArray[index]}deg)`;
    });
  }
  // 将当前路由动态展示在右上方
  let menuLi = document.querySelectorAll(".menu li");
  watchEffect(() => {
    menuLi.forEach((item, index) => {
      // 找到当前 active 路由
      if (
        routerMap[route.path] === (item as HTMLElement).innerText &&
        angleArray[index] % 360 !== 45
      ) {
        let num, delta;
        // 计算 active 路由距离右上方的角度差，推算出需要调用滚动函数的次数
        delta = (angleArray[index] % 360) - 45;
        delta < 0 ? (delta += 360) : delta;
        // 差值小于一半 上滚
        if (delta < 180) {
          wheelDirection = -1;
          num = delta / 45;
        } else {
          wheelDirection = 1;
          num = (360 - delta) / 45;
        }
        for (let i = 0; i < num; i++) {
          handleWheel();
        }
      }
    });
  });
  // 节流滚动事件，throttle() 函数会返回一个新的函数，该函数会在指定时间间隔内执行一次原始函数。
  // 必须将它返回的新函数保存到一个变量，然后使用该变量作为事件监听器
  let throttledHandleWheel = throttle(handleWheel, 500);
  navCircle.addEventListener(
    "wheel",
    function (e) {
      e.preventDefault();
      e.stopPropagation(); //
      // 下滚时为 1，上滚为 -1
      e.deltaY > 0 ? (wheelDirection = 1) : (wheelDirection = -1);
      throttledHandleWheel();
    },
    { passive: false }
  );

  // 延时添加 id 属性，让路由变宽（不使用添加类名，因为会在路由切换时被覆盖类名）
  navCircle.addEventListener("mouseenter", function () {
    // navCircle.classList.remove("paused");
    setTimeout(function () {
      routerLink.forEach(item => {
        item.setAttribute("id", "expand");
      });
    }, 750);
  });
  navCircle.addEventListener("mouseleave", function () {
    // navCircle.classList.add("paused");
    routerLink.forEach(item => {
      item.removeAttribute("id");
    });
  });
});
// 供路由使用
const routerContent = [
  { path: "/about", name: "关于本站", describe: "" },
  { path: "", name: "", describe: "" },
  { path: "", name: "", describe: "" },
  { path: "", name: "", describe: "" },
];
</script>

<template>
  <div
    ref="circularNav"
    :class="{ hide: isScrollingDown }"
    class="mainCircularNav"
  >
    <div class="insideNav">
      <span class="nav-text">导航</span>
      <!-- todo 实在来不及就把一些页面导入到已有页面 -->
      <ul class="menu">
        <li>
          <router-link to="/about">关于本站</router-link>
        </li>
        <li>
          <router-link to="/">歌曲数据</router-link>
        </li>
        <li>
          <router-link to="/ling">乐正绫</router-link>
        </li>
        <li>
          <router-link to="/vocaloid">Vocaloid</router-link>
        </li>
        <li>
          <router-link to="/producer">创作者</router-link>
        </li>
        <li>
          <router-link to="/club">创作社团</router-link>
        </li>
        <li>
          <router-link to="/song">词曲站</router-link>
        </li>
        <li>
          <router-link to="/message">留言板</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<!--todo idea 可以添加背景（刻度与指针等等）参考[炽星轨道]的背景图,背景图不动,线条转动做成gif盖在上面-->

<style lang="scss" scoped>
// .mainCircularNav .insideNav .menu/.nav-text
.hide {
  transform: translateX(-30vh);
  transition: all 0.5s;
}

.mainCircularNav {
  height: 80vh;
  width: 80vh;
  opacity: 0.6;
  z-index: 100;
  border-radius: 50%; // 防止边角触发
  position: fixed;
  top: 10vh;
  left: -50vh; // 左移隐藏一半
  transform: scale(0.5);
  transition: all 0.5s 0.25s; // 鼠标离开时延迟缩回，先隐藏路由项
  &::before {
    content: "";
    position: absolute;
    border-radius: 50%; // 防止边角停留
    width: 100%;
    height: 100%;
    background: url("https://i0.hdslb.com/bfs/article/960112201a2bc6d8ac24c33ad7faad2a1402305269.png@1e_1c.webp")
      no-repeat center / cover;
    transition: all 0.5s ease-in-out; // 缩放背景圆盘
  }
  // &.paused::before {
  //   animation-play-state: paused !important;
  // }
  // 动效
  &:hover {
    left: -35vh; // 隐藏 1/3
    opacity: 1;
    transition: all 0.5s; // 右移效果
    transform: scale(1);
    &::before {
      animation: rotate 8s linear infinite;
    }
    .nav-text {
      opacity: 0;
      font-size: 2.4vw;
      transform: translate(13.3vw, 13.3vh) !important;
      transition: all 0.5s;
    }
    .menu li {
      opacity: 1;
      transition-property: all, opacity;
      transition-duration: 0.6s;
    }
  }
  // 转过一次后添加延时(如果一开始就添加会导致第一次开屏动画被覆盖)
  &.active:hover .menu li {
    transition-delay: 0s, 0.5s !important;
  }
}

.insideNav {
  height: 40vh;
  width: 40vh;
  margin: 20vh;
  position: relative;
  // 在伪元素处设置，实现只旋转背景图
  &::before {
    content: "";
    position: absolute;
    left: 25%;
    top: 25%;
    width: 50%;
    height: 50%;
    background: url("https://i0.hdslb.com/bfs/article/4c617509707471d5a0435ce88f0e9fad1402305269.png@1e_1c.webp")
      no-repeat center / cover !important;
    // animation: rotate 7s linear infinite;
  }
  .nav-text {
    // font-size: 2.3vw;
    font-size: 4.6vw;
    writing-mode: vertical-lr;
    user-select: none;
    float: left;
    transform: translate(20.3vw, 9.3vh) !important;
    transition: all 0.5s 0.5s;
  }
}

.insideNav li {
  opacity: 0;
  text-align: center;
  position: absolute;
  top: -7.3vh;
  left: 17vh;
  transform-origin: 3vh 27vh; // 3vh 33vh
  transition: all 0.5s; // 控制显隐时间
  #expand {
    width: 16vh;
    border-radius: 3vh;
    transition: all 0.5s; // 延时放在 JS 设置，不然回去时也会有延时
  }
  a {
    position: absolute;
    top: 0;
    left: 0;
    color: #99b977;
    font-size: 1.3vw;
    font-weight: bold;
    width: 6vh;
    height: 6vh;
    border-radius: 50%;
    border: 0.15vw solid #f4d5a6;
    line-height: calc(6vh - 0.15vw);
    box-sizing: border-box;
    overflow: hidden;
    transition: 0.6s;
    background: rgba($color: #fff, $alpha: 0.7);
    &.router-link-exact-active {
      color: #ee0000; // 高亮当前路由
    }
    // idea hover 路由时右边显示一个气泡方框来告诉读者其中的内容（左边再加个小三角） 当前问题:无法给每个a元素的伪元素都添加content,只会显示第一个content
    // &::before {
    //   content: "";
    //   position: absolute;
    //   left: 0vw;
    //   top: -0.1vw;
    //   box-sizing: border-box;
    //   background: rgba($color: #f4d5a6, $alpha: 1);
    //   border: 0.15vw solid #fff;
    //   opacity: 0;
    //   transition: all 0.5s;
    //   border-radius: 1vw;
    //   border-top-left-radius: 0;
    // }
    &:hover {
      color: #66ccff;
      background-color: #f4d5a6;
      border: 0.15vw solid #fff;
      overflow: visible;
      // &::before {
      //   opacity: 1;
      //   transition: all 0.5s;
      //   width: 10vw;
      //   height: 5vw;
      //   transform: translateX(6.5vw);
      // }
    }
  }
}

// 设置开屏动画 初始化位置
.mainCircularNav:hover {
  $delayIncrement: 0.03s;
  $angleIncrement: 45deg;

  @for $i from 1 through 8 {
    $delay: $delayIncrement * ($i - 1);
    $angle: $angleIncrement * ($i - 1);
    .menu li:nth-child(#{$i}) {
      transition-delay: $delay;
      transform: rotate($angle);
    }

    .menu li:nth-child(#{$i}) a {
      transition-delay: $delay * 2;
      transform: rotate($angle * -1);
    }
  }
}
</style>
