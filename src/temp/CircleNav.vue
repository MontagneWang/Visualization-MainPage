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

onMounted(() => {
  //  ref.value 获取元素添加 addEventListener 报错
  let navCircle: HTMLElement = document.querySelector(
    ".mainCircularNav"
  ) as HTMLElement;
  let routerLink: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
    ".mainCircularNav > div > ul > li a"
  );
  let menuItems: NodeListOf<HTMLAnchorElement> =
    document.querySelectorAll(".menu li");

  // 初始化一个角度数组变量，用于保存每一个路由的旋转角度，然后做加减运算【此方法可同时解决上锁问题】
  let angleArray = [0, 45, 90, 135, 180, 225, 270, 315];

  // 滚动时修改角度数组，然后将角度赋给每一项路由，最后将是否为第一次滚动的 flag 设置为 false
  function handleWheel() {
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
    setTimeout(function () {
      routerLink.forEach(item => {
        item.setAttribute("id", "expand");
      });
    }, 500);
  });
  navCircle.addEventListener("mouseleave", function () {
    routerLink.forEach(item => {
      item.removeAttribute("id");
    });
  });
});
</script>

<template>
  <div :class="{ hide: isScrollingDown }" class="mainCircularNav">
    <div class="insideNav">
      <span class="nav-text">导航</span>
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
<!--todo idea 可以在每个导航按钮前加一个圆形的图标,里面放入[月相图 Icon]-->

<style lang="scss" scoped>
// .mainCircularNav .insideNav .menu
.hide {
  transform: translateX(-30vh);
  transition: all 0.5s;
}

#expand {
  width: 16vh !important;
  border-radius: 3vh !important;
  transition: all 0.5s 0.15s !important; // 延时放大路由文本框
  position: absolute !important;
  top: 0 !important;
  left: -1vh !important;
}
// todo 外圆盘太大了，想办法不hover时变小/淡点或者隐藏
.mainCircularNav {
  height: 80vh;
  width: 80vh;
  border-radius: 50%; // 防止边角触发
  opacity: 0.6;
  z-index: 100;
  background: url("https://i0.hdslb.com/bfs/article/a24c9b7506fce57b923db8acd7d414621402305269.png@1e_1c.webp")
    no-repeat center / cover;
  position: fixed;
  top: 10vh;
  left: -50vh; // 隐藏一半
  transition: all 0.5s;
  .nav-text {
    font-size: 2.3vw;
    writing-mode: vertical-lr;
    user-select: none;
    float: left;
    transform: translate(15vw, 14.5vh) !important;
    transition: all 0.5s;
  }

  // 动效
  &:hover {
    left: -35vh; // 隐藏 1/3
    opacity: 1;
    transition: all 0.5s;
    // 文字左移
    .nav-text {
      // color: #99b977;
      font-size: 3vw;
      transform: translate(13.3vw, 13.3vh) !important;
      transition: all 0.5s;
    }
    .menu li {
      opacity: 1;
      transition: all 0.6s;
    }
    // .insideNav::before {
    //   animation: rotate 7s linear infinite;
    //   animation-play-state: paused;
    // }
  }
}

.insideNav {
  height: 40vh;
  width: 40vh;
  margin: 20vh;
  // opacity: 1 !important;
  position: relative;
  // 在伪元素处设置，实现只旋转背景图
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("https://i0.hdslb.com/bfs/article/a24c9b7506fce57b923db8acd7d414621402305269.png@1e_1c.webp")
      no-repeat center / cover;
    animation: rotate 7s linear infinite;
  }
  .menu {
    padding: 0;
    margin: 0;
    position: absolute;
    top: -11vh;
    left: 19vh;
    // todo 最后的方法,想其他方法缩小右键菜单
    zoom: 0.9;
    li {
      opacity: 0;
      text-align: center;
      transform-origin: 3vh 33vh;
      transition: all 0.5s 0.1s; // 控制显隐时间
      a {
        color: #99b977;
        font-size: 1.4vw;
        font-weight: bold;
        position: absolute;
        top: 0;
        left: 0;
        width: 6vh;
        height: 6vh;
        border-radius: 50%;
        border: 0.15vw solid #f4d5a6;
        line-height: calc(6vh - 0.15vw);
        box-sizing: border-box;
        overflow: hidden;
        transition: 0.6s;
        background: rgba($color: #fff, $alpha: 0.7);
        &:hover {
          color: #66ccff;
          background-color: #f4d5a6;
        }
        &.router-link-exact-active {
          color: #ee0000; // 当前路由高亮
        }
        // position: absolute;
        // top: 0;
        // left: 0;
        // line-height: 6vh;

        // border-radius: 50%;
        // background: #fff;
        // font-size: 60%;
        // text-decoration: none;
        // transition: 0.6s;
      }
    }
  }
}
.mainCircularNav:hover {
  $delayIncrement: 0.02s;
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
