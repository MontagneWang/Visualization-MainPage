<script lang="ts" setup>
import {
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  ref,
  watchEffect,
} from "vue";
import { smoothScroll } from "../utils/scrollToPosition";
// @ts-ignore
import WOW from "wow.js";
import { drawCurve } from "../utils/drawCurve";

let timer: NodeJS.Timeout;
let history = ref(null);
let headPage = ref(null);
let myCanvas = ref(null);
let lingcaiyin = ref<HTMLInputElement | null>(null);
let nowPage = ref(0);
let finalPageShowFlag = ref(false);
let bubbleBoxShowFlag = ref(false);
const items = ref([
  {
    "": "绫彩音「Ling Caiyin」",
    人设: "rikuhao（ハオ）",
    发色: "黑发",
    瞳色: "黑瞳",
    年龄: "16 岁",
    身高: "155cm",
    体重: "41kg",
    特点: "麻花辫、呆毛、美人痣、耳机、长短袜、腰鼓",
  },
  {
    "": "乐正绫「YueZheng Ling」",
    人设: "rikuhao、ideolo",
    发色: "棕发",
    瞳色: "红瞳",
    年龄: "16 岁",
    身高: "160cm",
    体重: "41kg",
    代表色: "#EE0000",
    生日: "4 月 12 日",
    特点: "麻花辫、呆毛、美人痣、耳机、长短袜、腰鼓、左撇子",
    音之精灵: "释天",
    声源: "祈Inory",
    声库制作人: "人形兎",
    声库版本: "Vocaloid™3",
    发布日期: "2015.07.17",
    使用乐器: "吉他",
    擅长节奏: "70-220 BPM",
    擅长音域: "G2-C5",
  },
  {
    "": "乐正绫「YueZheng Ling」",
    人设: "TID",
    发色: "棕发",
    瞳色: "红瞳",
    代表色: "#EE0000",
    声源: "祈Inory",
    声库制作人: "人形兎",
    声库版本: "Vocaloid™5",
    发布日期: "2022.10.14",
    音色: "炽(Normal)&幽(Dark)",
    擅长节奏: "60-220 BPM",
    擅长音域: "F2-F4",
  },
  {
    "": "乐正绫「YueZheng Ling」",
    人设: "Miz 团一",
    发色: "棕发",
    瞳色: "红瞳",
    代表色: "#EE0000",
    声源: "祈Inory",
    声库制作人: "阿元",
    声库版本: "ACE Studio",
    发布日期: "2023.05.06",
    语言: "支持中日英三语合成",
  },
]);
let wow = new WOW({
  boxClass: "wow", // 盒子类： 当用户滚动时显示隐藏框的类名。
  animateClass: "animated", // 动画类： 触发 CSS 动画的类名（默认情况下，animate.css 库为“动画”）
  offset: 20, // 抵消： 定义浏览器视口底部与隐藏框顶部之间的距离。当用户滚动并达到此距离时，将显示隐藏的框。
  mobile: true, //移动： 在移动设备上打开/关闭哇.js。
  live: true, //实时：持续检查页面上的新WOW元素。
  callback: function (box: any) {
    // 每次启动动画时都会触发回调，传入的参数是正在动画的 DOM 节点
  },
  scrollContainer: null, // optional scroll container selector, otherwise use window,
  resetAnimation: true, // reset animation on end (default is true)
});
wow.init();

// 将每页高度设置到根元素样式变量，供 下方气泡框判断 与 scss 使用
// 存储每页高度，单位为 vh
const pageHeight = [100, 240, 540, 385, 295, 100];
const rootStyle = {
  "--lingCaiyin": `${pageHeight[1]}vh`,
  "--lingV3": `${pageHeight[2]}vh`,
  "--lingV5": `${pageHeight[3]}vh`,
  "--lingAi": `${pageHeight[4]}vh`,
};
Object.entries(rootStyle).forEach(([styleName, styleValue]) =>
  document.documentElement.style.setProperty(styleName, styleValue)
);

// 当前页数计算，传入对应数据
window.addEventListener("scroll", function () {
  finalPageShowFlag.value =
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100;
  let totalHeight = 0;
  for (let i = 0; i < pageHeight.length; i++) {
    totalHeight += pageHeight[i];
    // 需要添加屏幕的一半高度，提早判断下一页的到来
    if (
      window.scrollY + window.innerHeight / 2 <
      (totalHeight * window.innerHeight) / 100
    ) {
      nowPage.value = i;
      break;
    }
  }
  if (document.documentElement.scrollTop !== 0) {
    clearTimeout(timer);
  }
});

// 判断鼠标位置，显隐气泡框
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let startX = screenWidth * 0.75;
let endX = screenWidth * 0.9;
let startY = screenHeight * 0.3;
let endY = screenHeight;

function judgeMousePosition(event: { clientX: number; clientY: number }) {
  let mouseX = event.clientX;
  let mouseY = event.clientY;
  const rect = (
    document.querySelector(".bubbleBox") as HTMLElement
  ).getBoundingClientRect();
  if (
    mouseX >= startX &&
    mouseX <= endX &&
    mouseY >= startY &&
    mouseY <= endY
  ) {
    bubbleBoxShowFlag.value = true;
  } else if (
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom
  ) {
    // 鼠标在气泡框内，保持不变
  } else {
    bubbleBoxShowFlag.value = false;
  }
}

document.addEventListener("mousemove", judgeMousePosition);

let topPageHeight: number;
onMounted(() => {
  topPageHeight = (lingcaiyin.value as HTMLElement).offsetTop;
  // 获取每项时间轴
  document.querySelectorAll(".el-timeline-item").forEach((item, index) => {
    item.classList.add("wow", "animate__animated", "animate__fadeInUp");
  });
  document.querySelectorAll(".tips").forEach((item, index) => {
    item.classList.add("wow", "animate__animated", "animate__fadeIn");
  });
  document.querySelectorAll(".finalWord p").forEach((item, index) => {
    item.classList.add(
      "wow",
      "animate__animated",
      "animate__fadeIn",
      `animate__delay-${index + 1}s`
    );
  });
  document.querySelectorAll(".finalTachie").forEach((item, index) => {
    item.classList.add(
      "wow",
      "animate__animated",
      "animate__fadeIn",
      `animate__delay-${index}s`
    );
  });
  // 获取并变大所有时间轴图标节点
  document.querySelectorAll(".el-timeline-item__node--normal").forEach(item => {
    item.classList.add("el-timeline-item__node--large");
  });
  // 5 秒后整屏滚动
  timer = setTimeout(() => {
    if (document.documentElement.scrollTop === 0) {
      smoothScroll(topPageHeight, 600, 1);
    }
  }, 4000);

  // 通过增加控制点使得贝塞尔曲线贴近控制点
  let points = [
    [screenWidth * 0.3, screenHeight * 0.1],
    [screenWidth * 0.3, screenHeight * 0.1],
    [screenWidth * 0.3, screenHeight * 0.1],
    [screenWidth * 0.3, screenHeight * 0.1],
    [screenWidth * 0.3, screenHeight * 0.1],
    [screenWidth * 0.3, screenHeight * 0.1],
    [screenWidth * 0.3, screenHeight * 0.1],

    [screenWidth * 0.25, screenHeight * 0.175],
    [screenWidth * 0.25, screenHeight * 0.175],
    [screenWidth * 0.25, screenHeight * 0.175],
    [screenWidth * 0.25, screenHeight * 0.175],
    [screenWidth * 0.25, screenHeight * 0.175],
    [screenWidth * 0.25, screenHeight * 0.175],
    [screenWidth * 0.25, screenHeight * 0.175],

    [screenWidth * 0.3, screenHeight * 0.25],
    [screenWidth * 0.3, screenHeight * 0.25],
    [screenWidth * 0.3, screenHeight * 0.25],
    [screenWidth * 0.3, screenHeight * 0.25],
    [screenWidth * 0.3, screenHeight * 0.25],
    [screenWidth * 0.3, screenHeight * 0.25],
    [screenWidth * 0.3, screenHeight * 0.25],

    [screenWidth * 0.4, screenHeight * 0.06],
    [screenWidth * 0.4, screenHeight * 0.06],
    [screenWidth * 0.4, screenHeight * 0.06],
    [screenWidth * 0.4, screenHeight * 0.06],
    [screenWidth * 0.4, screenHeight * 0.06],
    [screenWidth * 0.4, screenHeight * 0.06],
    [screenWidth * 0.4, screenHeight * 0.06],

    [screenWidth * 0.8, screenHeight * 0.05],
    [screenWidth * 0.8, screenHeight * 0.05],
    [screenWidth * 0.8, screenHeight * 0.05],
    [screenWidth * 0.8, screenHeight * 0.05],
    [screenWidth * 0.8, screenHeight * 0.05],
    [screenWidth * 0.8, screenHeight * 0.05],
    [screenWidth * 0.8, screenHeight * 0.05],
    [screenWidth * 0.8, screenHeight * 0.05],
    [screenWidth * 0.8, screenHeight * 0.05],

    [screenWidth * 0.8, screenHeight * 0.35],
    [screenWidth * 0.8, screenHeight * 0.35],
    [screenWidth * 0.8, screenHeight * 0.35],
    [screenWidth * 0.8, screenHeight * 0.35],
    [screenWidth * 0.8, screenHeight * 0.35],
    [screenWidth * 0.8, screenHeight * 0.35],
    [screenWidth * 0.8, screenHeight * 0.35],
    [screenWidth * 0.8, screenHeight * 0.35],
    [screenWidth * 0.8, screenHeight * 0.35],
    [screenWidth * 0.8, screenHeight * 0.35],

    [screenWidth * 0.05, screenHeight * 0.35],
    [screenWidth * 0.05, screenHeight * 0.35],
    [screenWidth * 0.05, screenHeight * 0.35],
    [screenWidth * 0.05, screenHeight * 0.35],
    [screenWidth * 0.05, screenHeight * 0.35],
    [screenWidth * 0.05, screenHeight * 0.35],
    [screenWidth * 0.05, screenHeight * 0.35],
    [screenWidth * 0.05, screenHeight * 0.35],
    [screenWidth * 0.05, screenHeight * 0.35],

    [screenWidth * 0.05, screenHeight * 0.7],
    [screenWidth * 0.05, screenHeight * 0.7],
    [screenWidth * 0.05, screenHeight * 0.7],
    [screenWidth * 0.05, screenHeight * 0.7],
    [screenWidth * 0.05, screenHeight * 0.7],
    [screenWidth * 0.05, screenHeight * 0.7],
    [screenWidth * 0.05, screenHeight * 0.7],
    [screenWidth * 0.05, screenHeight * 0.7],
    [screenWidth * 0.05, screenHeight * 0.7],

    [screenWidth, screenHeight * 0.65],
    [screenWidth, screenHeight * 0.65],
    [screenWidth, screenHeight * 0.65],
    [screenWidth, screenHeight * 0.65],
    [screenWidth, screenHeight * 0.65],
    [screenWidth, screenHeight * 0.65],
    [screenWidth, screenHeight * 0.65],
  ];
  let canvas = myCanvas.value as unknown as HTMLCanvasElement;

  // 滚动到最后页面时开始绘制曲线
  let isFirst = true;
  watchEffect(() => {
    if (finalPageShowFlag.value && isFirst) {
      isFirst = false;
      setTimeout(() => {
        drawCurve(canvas, points, "rgb(238, 0, 0)", 0.65, 5, 4500);
      }, 1000);
    }
  });
});

onActivated(() => {
  document.addEventListener("mousemove", judgeMousePosition);
});
onDeactivated(() => {
  document.removeEventListener("mousemove", judgeMousePosition);
  clearTimeout(timer);
});
onBeforeUnmount(() => {
  document.removeEventListener("mousemove", judgeMousePosition);
  clearTimeout(timer);
});
</script>

<template>
  <div
    v-show="nowPage !== 0 && nowPage !== 5"
    ref="bubbleBox"
    :class="{ show: bubbleBoxShowFlag }"
    class="bubbleBox"
  >
    <ul>
      <li v-for="(value, key) in items[nowPage - 1]" :key="key">
        {{ key }} {{ !key ? "" : "-" }} {{ value }}
      </li>
    </ul>
  </div>

  <div ref="headPage" class="page head" @click="smoothScroll(topPageHeight)">
    <div class="history show content">
      <div class="inside">
        <div class="words">
          <span class="animate__animated animate__fadeIn animate__delay-1s"
            >悠悠十年</span
          >
          <span class="titleMid animate__animated animate__fadeIn"
            >&nbsp;|&nbsp;</span
          >
          <span class="animate__animated animate__fadeIn animate__delay-2s"
            >一瞬永远</span
          >
        </div>
      </div>
    </div>
  </div>
  <div style="display: auto">
    <div id="lingcaiyin" ref="lingcaiyin" class="page">
      <div class="story">
        <div class="bg"></div>
      </div>
      <div class="content">
        <div class="inside">
          <el-timeline>
            <el-timeline-item
              icon="Aim"
              placement="top"
              timestamp="&ensp;2011.11.20"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Aim />
                </el-icon> </template
              >&emsp;VOCALOID China Project 项目启动
            </el-timeline-item>
            <el-timeline-item
              icon="Management"
              placement="top"
              timestamp="&ensp;2011.12.01"
              type="warning"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Management />
                </el-icon> </template
              >&emsp;开始征集 VOCALOID China Project 企划人物形象设计
            </el-timeline-item>
            <el-timeline-item
              icon="Checked"
              placement="top"
              timestamp="&ensp;2012.01.03"
              type="danger"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <FolderChecked />
                </el-icon> </template
              >&emsp;VOCALOID China Project 形象征集结束
            </el-timeline-item>
            <el-timeline-item
              icon="FolderChecked"
              placement="top"
              timestamp="&ensp;2012.01.17"
              type="success"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Checked />
                </el-icon>
              </template>
              <el-card>
                <h2>「雅音宫羽、绫彩音、MOKO、牙音、蝶音」五位人设入选</h2>
                <p>
                  &emsp;VOCALOID China Project
                  形象评选结果公布，分别是「雅音宫羽、<span
                    style="color: #ee0000a0"
                    >绫</span
                  >彩音、MOKO、牙音、蝶音」
                </p>
                <h4>
                  &emsp;其中「绫彩音」因其『元气十足的可爱外表和带有浓郁中国风的新颖设计，赢得了大批粉丝的青睐』
                </h4>
              </el-card>
            </el-timeline-item>
            <el-timeline-item
              icon="Place"
              placement="top"
              timestamp="&ensp;2012.03.21"
              type="success"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <UserFilled />
                </el-icon>
              </template>
              <el-card>
                <h2>VOCALOID China Project 最终形象定稿公布</h2>
                <h3>
                  确定最终形象为「洛天依、乐正<span style="color: #ee0000"
                    >绫</span
                  >、徵羽摩柯、乐正龙牙、墨清弦」
                </h3>
              </el-card>
            </el-timeline-item>
            <el-timeline-item
              class="is-loading"
              icon="Loading"
              placement="top"
              timestamp="&ensp;只是在之后三年时间里，「乐正绫」依旧找不到属于她的声音"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <MoonNight />
                </el-icon>
              </template>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </el-timeline-item>
            <el-timeline-item
              icon="Promotion"
              placement="top"
              timestamp="&ensp;2014.04.05"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Promotion />
                </el-icon>
              </template>
              <el-card class="box-card">
                <template #header>
                  <h2 class="card-header" style="margin: 0.5vw 0vw">
                    无声曲『云端』发布 —— 「三年孤寂愿与你相伴」
                  </h2>
                </template>
                <div class="text item">
                  <p style="margin-top: 0.5vw">
                    P 主与 STAFF
                    们以这一首无声歌曲，献给当时仍未发售声库的乐正绫
                  </p>
                  <p>某种意义上算是阿绫的第一首歌曲</p>
                  <el-row :gutter="20" style="margin-top: -1.5vw">
                    <el-col :span="7"
                      ><div class="grid-content ep-bg-purple">
                        <h3>Staff</h3>
                        <p>&emsp;作曲：卫星（音绕阁）</p>
                        <p>&emsp;填词：萌兔（音绕阁）</p>
                        <p>&emsp;绘师：碎影无痕、锦冲田</p>
                        <p>&emsp;编曲：bz86nick</p>
                        <p>&emsp;PV：墨兰花语</p>
                        <p>&emsp;演唱：乐正绫</p>
                      </div>
                    </el-col>
                    <el-col :span="15"
                      ><div class="grid-content ep-bg-purple">
                        <h3>作者寄语</h3>
                        <p
                          style="
                            margin-top: -0.5em;
                            line-height: 2em;
                            transform: translateX(1em);
                          "
                        >
                          &emsp;&emsp;乐正绫作为同洛天依一起第一批被 VC
                          选中的人设，一直没有音源，UP
                          主和众多喜欢她的小伙伴一直都很想听她唱歌，但是，两年了，UP
                          主终于等不起了，和一些喜欢绫的人一起创作了这首属于这个没有音源的歌姬的曲子，希望喜欢绫的大家不要忘记她，也希望有更多的人能喜欢上这个中国红元气娘
                          —— 乐正绫
                          <el-divider content-position="right"
                            ><h2 style="color: #ee0000">
                              「哪怕没有声音 也依然为你们而歌唱」
                            </h2></el-divider
                          >
                        </p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
    <div id="v3" class="page">
      <div class="story">
        <div class="bg"></div>
      </div>
      <div class="content">
        <div class="inside">
          <el-timeline>
            <el-timeline-item
              icon="microphone"
              placement="top"
              timestamp="&ensp;2014.10.15"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <microphone />
                </el-icon> </template
              >「乐正绫」声源公布，「祈Inory」为乐正绫 VOCALOID™3 中文声库声源
            </el-timeline-item>
            <el-timeline-item
              color="rgb(238,0,0)"
              icon="StarFilled"
              placement="top"
              timestamp="&ensp;2015.06.12"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <mic />
                </el-icon>
              </template>
              <el-card>
                <h2>
                  「乐正绫」第一首官方试听曲<span style="color: #ee0000"
                    >《Scarlet Drop》</span
                  >发布
                </h2>
                <el-divider content-position="right"
                  ><h2 style="color: #ee0000">
                    『记住我&ensp;鲜艳的红色』
                  </h2></el-divider
                >
                <p>
                  「作为乐正绫爱好者们急切期盼的曲目，激昂的旋律从头至尾弥漫着重金属的味道，<br />
                  &emsp;歌词字里行间抒发着乐正绫不顾被世间与未来所阻隔和遗忘，努力唱响自己的歌声」
                </p>
                <p>『抵达梦的尽头　之后放声而歌</p>
                <p>
                  &emsp;已不再是过客　<span style="color: #ee0000"
                    >因为彼此约定着</span
                  >』
                </p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item
              icon="headset"
              placement="top"
              timestamp="&ensp;2015.07.04"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <StarFilled />
                </el-icon>
              </template>
              <el-card>
                <h2>
                  &nbsp;「乐正绫」第二首官方试听曲<span
                    style="color: rgb(64, 88, 164)"
                    >《梦语》</span
                  >发布
                </h2>
                <el-divider content-position="right">
                  <h2 style="color: rgb(64, 88, 164)">
                    『将这份无用思念&ensp;与你再讲一遍』
                  </h2></el-divider
                >
                <p>
                  「本曲是 Vsinger 官方发布的第二首乐正绫无参试听 Demo 曲<br />
                  &emsp;与前一首试听曲《Scarlet
                  Drop》不同，本曲采用了柔美抒情的曲风<br />
                  &emsp;歌词的字里行间都充满了温柔的思念之情<br />
                  &emsp;强烈地抒发了乐正绫作为一个虚拟歌手，对观众的思念之情」
                </p>
                <p>『如果说　有一天　再相见</p>
                <p>&emsp;将这份无用思念　与你再讲一遍</p>
                <p>&emsp;那我再看一眼　在你眼中流转的世界</p>
                <p>
                  <span style="color: rgb(64, 88, 164); font-size: 1.5vw"
                    >&emsp;一瞬永远&nbsp;</span
                  >』
                </p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item
              color="rgb(238,0,0)"
              icon="mic"
              placement="top"
              timestamp="&ensp;2015.07.17"
              ><template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <mic />
                </el-icon>
              </template>
              <el-card>
                <h1>「乐正绫」VOCALOID 3 中文声库发售</h1>
                <p>
                  VOCALOID™3 中文声库「乐正绫」正式发售，从此声库走向民间创作者
                </p>
                <p>
                  创作者们借由「乐正绫」之口，抒发心中所想，一个新的时代开启了
                </p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item
              icon="Calendar"
              timestamp="&ensp;这一年，乐正绫参与演唱了以下专辑"
              placement="top"
              type="success"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Calendar />
                </el-icon>
              </template>

              <p>
                《南北寻光》《Saligia系列》《双向·轮回与幸福》《Travel
                Days》《平行四界Quadimension3&4》等
              </p>
              <hr />
            </el-timeline-item>
            <el-timeline-item
              icon="List"
              placement="top"
              timestamp="&ensp;2016 年"
              type="primary"
              ><template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <List />
                </el-icon>
              </template>
              <div style="transform: translateX(0.5em)">
                <p>
                  2016
                  是一个神奇的年份，这一年，乐正绫登上了拜年祭的舞台，留下了一曲传唱千古的《九九八十一》
                </p>
                <p>
                  8 月 25 日，COP
                  投稿了《世末歌者》，这首歌成为了再生数第二高的绫曲，被众多歌手翻唱
                </p>
                <p>
                  同年「妄想症系列」「节气物语系列」「白石溪」等作品投稿，越来越多创作者们开始借绫之口抒情达意
                </p>
                <p>
                  16
                  年还有一个企划，那便是「时之歌Project」，不知道如今的你，还在听这些曲子吗
                </p>
                <p>
                  2016-12-03&nbsp;《为战而生》【乐正绫原创】<br />
                  2016-08-06&nbsp;《破晓将至》【乐正绫原创】<br />
                  2016-04-09&nbsp;《黑暗审判》【乐正绫原创】<br />
                  2016-03-19&nbsp;《光流终焉》【乐正绫原创】<br />
                  2016-02-27&nbsp;《虚拟神明》【乐正绫&言和原创】<br />
                  2016-01-30&nbsp;《悬空》&emsp;&emsp;【乐正绫&洛天依原创】<br />
                  2016-01-10&nbsp;《归一》&emsp;&emsp;【乐正绫&洛天依&心华原创】<br />
                </p>
              </div>
              <el-divider content-position="right">
                <h2 style="color: rgb(64, 88, 164)">
                  『心跳沉沉试图召唤着哀伤&ensp;而你用双手拨开我所有匆忙』
                </h2></el-divider
              >
            </el-timeline-item>
            <el-timeline-item
              icon="Calendar"
              timestamp="&ensp;这一年，乐正绫参与演唱了以下专辑"
              placement="top"
              type="success"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Calendar />
                </el-icon>
              </template>
              <p>
                《中华少女Project》《红颜志》《朝花夕拾》《Dear:》《节气物语》
              </p>
              <p>
                《南北极星》《平行四界Quadimension5》《幻想·幻境》《恋爱理论》等
              </p>
              <hr />
            </el-timeline-item>
            <el-timeline-item
              icon="Promotion"
              placement="top"
              timestamp="&ensp;2017.04.28"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Promotion />
                </el-icon>
              </template>
              <h2>
                &ensp;&ensp;Vsinger 官方投稿了第三首乐正绫独唱曲<span
                  style="color: #ee0000"
                  >《未来的我》</span
                >
              </h2>
              <p>
                &ensp;「励志歌词与旋律，搭配明亮坚定的歌声和史诗般恢弘的编曲，充满了希望与力量」
              </p>
            </el-timeline-item>
            <el-timeline-item
              color="rgb(238,0,0)"
              icon="Checked"
              placement="top"
              timestamp="&ensp;2017.06.17"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Mic />
                </el-icon>
              </template>
              <h3>&ensp;参与 Vsinger Live 2017 演唱会</h3>
              <p>
                &ensp;本次演唱会是以洛天依为首的 Vsinger
                全员举行的首次大型演唱会，六名成员均有参与演唱歌曲
              </p>
              <!-- <p>todo 这里可以添加各歌曲名称作曲等,参考萌百复制过来</p> -->
            </el-timeline-item>
            <el-timeline-item
              color="rgb(238,0,0)"
              icon="Checked"
              placement="top"
              timestamp="&ensp;2017.12.02"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Management />
                </el-icon> </template
              ><el-card>
                <h2>
                  「乐正绫」首张官方专辑<span style="color: #ee0000"
                    >《绫》</span
                  >正式发售
                </h2>
                <p>
                  2017 年 12 月 2 日，Vsinger
                  发布了乐正绫的首张官方单人专辑《绫》，该专辑内共有7首单曲
                </p>
                <!-- 使用表格会对适配产生影响，且不美观 -->
                <!-- <el-table
                :data="tableData"
                border
                stripe
                style="width: 60%;  font-size: 1vw"
              >
                <el-table-column prop="song" label="歌曲" />
                <el-table-column prop="lyricist" label="词作" />
                <el-table-column prop="composer" label="作曲" />
                <el-table-column prop="arrangement" label="编曲" />
              </el-table> -->
              </el-card>
            </el-timeline-item>
            <el-timeline-item
              icon="Calendar"
              timestamp="&ensp;这一年，乐正绫参与演唱了以下专辑"
              placement="top"
              type="success"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Calendar />
                </el-icon>
              </template>
              <p>《绫》《Ling聽》《人·間》《妄想症Paranoia》《四季四世》</p>
              <p>《无名》《平行四界Quadimension 5》《殿堂 3》《One·一个》等</p>
              <hr />
            </el-timeline-item>
            <el-timeline-item
              color="rgb(238,0,0)"
              icon="Checked"
              placement="top"
              timestamp="&ensp;2018.07.20"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Mic />
                </el-icon>
              </template>
              <h3>&ensp;参与 Vsinger Live 2018 演唱会</h3>
              <p>
                &ensp;本次演唱会为 Vsinger 全员携手 BML 共同举办的「BML
                VR×VSINGER LIVE」2018 全息演唱会
              </p>
              <p>
                &ensp;此次演出为 Vsinger 专场，除 2233
                站娘外，整个舞台将全部交给 Vsinger
                洛天依、乐正绫、言和、乐正龙牙、墨清弦、徵羽摩柯 6 人
              </p>
            </el-timeline-item>
            <el-timeline-item
              icon="Calendar"
              timestamp="&ensp;这一年，乐正绫参与演唱了以下专辑"
              placement="top"
              type="success"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Calendar />
                </el-icon>
              </template>
              <p>
                《华哉有夏》《如是我闻》《朝花夕拾
                2》《八月的幽灵》《秘密邮件》《Godrose》
              </p>
              <p>
                《卡纳塔幻想曲》《平行四界Quadimension
                6》《表情包》《No.13852》《天宫九问》等
              </p>
              <hr />
            </el-timeline-item>
            <el-timeline-item
              color="rgb(238,0,0)"
              icon="Mic"
              placement="top"
              timestamp="&ensp;2019.02.04"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <flag />
                </el-icon>
              </template>
              <h3>&ensp;参与 19 年拜年祭，演唱「繁华唱遍」</h3>
              <el-divider content-position="right">
                <h2 style="color: #ee0000">
                  『我以为那个时代已过去，殊不知当你歌唱时，属于那个时代的一切都在归来
                  —— 题记』
                </h2></el-divider
              >
              <!-- <p>&ensp;台前一眼，把戏缘偷染，从此后生世不倦。</p>
            <p>&ensp;以心火绵绵，护薪火相传。</p>
            <p>
              &ensp;这一切，世间看不尽演不完的美的好的真的易逝的永恒的一切，都在继续。
            </p>
            <p>&ensp;有人继，有人承，有人守，有人传。</p>
            <p>&ensp;你我亦然。</p> -->
              <p>
                &ensp;台前一眼，把戏缘偷染，从此后生世不倦。
                <br />&ensp;以心火绵绵，护薪火相传。
                <br />&ensp;这一切，世间看不尽演不完的美的好的真的易逝的永恒的一切，都在继续。
                <br />&ensp;有人继，有人承，有人守，有人传。
                <br />&ensp;你我亦然。
              </p>
            </el-timeline-item>
            <el-timeline-item
              color="rgb(238,0,0)"
              icon="Mic"
              placement="top"
              timestamp="&ensp;2019.04.12"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Present />
                </el-icon> </template
              ><el-card>
                <h2>
                  乐正绫四周年，官方发布生贺曲<span style="color: #ee0000"
                    >《我在》
                  </span>
                </h2>
                <el-divider content-position="right">
                  <h2 style="color: #ee0000">
                    『在此歌唱 从零开始万千景象延伸远方』
                  </h2></el-divider
                >
                <p>
                  《我在》以绫的视角描写自诞生以来的心境，以及对听众们的感谢
                </p>
                <p>
                  同日，官方宣布与游戏联动，发布了游戏联动曲《蝶恋花·何处谣》
                </p>
              </el-card>
            </el-timeline-item>
            <!-- <el-timeline-item
            icon="TrendCharts"
            placement="top"
            timestamp="&ensp;2019.12.07"
            type="danger"
          >
            <template #dot>
              <el-icon color="#ee0000" class="avatar">
                <Promotion />
              </el-icon> </template
            >&emsp;
            <p>沙雕教投稿了【赤羽x乐正绫】《赤伶》【原创剧情向pv附】</p>
            <p>
              『原曲为李建衡作曲、何天程编曲、清彦作词、HITA演唱的同名歌曲，收录于同名专辑中
            </p>
            <p>
              &emsp;以中国抗日战争时期为背景，讲述名伶裴晏之受日军要求唱戏，设计纵火焚毁戏楼的故事，展现「位卑未敢忘忧国」的爱国情怀
            </p>
            <p>
              &emsp;本作在原曲背景故事的基础上进行延伸，将乐正绫设定为裴晏之（赤羽饰）的后辈；两位歌手合称的「赤绫」与标题谐音，为人所津津乐道
            </p>
            <p>
              &emsp;纯熟调教下的戏腔高亢优美、极具震撼力，令人身临其境，回溯那场热烈而悲壮的绝唱』
            </p>
          </el-timeline-item> -->
            <el-timeline-item
              icon="Calendar"
              timestamp="&ensp;这一年，乐正绫参与演唱了以下专辑"
              placement="top"
              type="success"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Calendar />
                </el-icon>
              </template>
              <p>
                《从众效应》《Les Fleurs Du Mal
                恶之花》《柒》《名字》《1&0》《飞行梦》等
              </p>
              <hr />
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
    <div id="v5" class="page">
      <div class="story">
        <div class="bg"></div>
      </div>
      <div class="content">
        <div class="inside">
          <el-timeline>
            <el-timeline-item
              color="rgb(238,0,0)"
              icon="Mic"
              placement="top"
              timestamp="&ensp;2020.04.12"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Present />
                </el-icon>
              </template>
              <el-card>
                <h2>
                  乐正绫五周年，官方发布生贺曲<span style="color: #ee0000"
                    >《花》
                  </span>
                </h2>
                <el-divider content-position="right">
                  <h2 style="color: #ee0000">
                    『为你而来 而存在』
                  </h2></el-divider
                >
                <p>禾念也在这一天发布了乐正绫官方 EP《告白诗》专辑试听 PV</p>
                <p>
                  《告白诗》是 2020
                  年乐正绫诞生祭企划作品，也是乐正绫的第二张官方专辑
                </p>
                <p>该专辑内共有 4 首单曲《花》《多数人》《酒心吻》《悸动》</p>
                <p>
                  特别值得一提的是，《花》第一次使用了绫的 Vocaloid5
                  音源，给予无数听众希望
                </p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item
              icon="guide"
              placement="top"
              timestamp="&ensp;2020.05.22"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Promotion />
                </el-icon>
              </template>
              <h3>
                &emsp;ChiliChill 投稿了《山遥路远》，本曲是第二次使用尚未发售的
                V5 音源
              </h3>
              <p>
                「然后非常感谢人老师和动老师。前些日子听了《花》，眼前一亮，真的一亮
              </p>
              <p>
                &emsp;非常快就决定想让阿绫来唱这首，于是我们联系到了人老师，这才有了接下来的故事」——
                Yu H.
              </p>
              <hr />
              <el-divider content-position="left">
                <h3 style="color: rgb(64, 88, 164)">
                  笔者正是在听到这曲《山遥路远》后真正坚定了追寻儿时梦想的决心，在第二年完成
                  318 川藏线的骑行
                </h3></el-divider
              >
              <p>
                &emsp;每个人都有自己的山遥路远。即使现在交通便利，但有的路，依然很远
              </p>
              <p>&emsp;不必留念，不必驻足不前，故乡是我，我亦是故乡</p>
              <p>
                &emsp;我会为未来的自己献上全部的祝福，只是盼望着你走远，走得足够遥远
              </p>
              <p>
                &emsp;我们还年轻，路还很长。山遥路远，愿我们在飘散着花瓣的清风中相遇
              </p>

              <el-divider content-position="right">
                <h2 style="color: rgb(64, 88, 164)">
                  『快走吧，山遥路远』
                </h2></el-divider
              >
            </el-timeline-item>
            <el-timeline-item
              icon="Calendar"
              timestamp="&ensp;这一年，乐正绫参与演唱了以下专辑"
              placement="top"
              type="success"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <calendar />
                </el-icon>
              </template>
              <p>《告白诗》《Cotton_Candy》《ReSist》《终贰为诗》《星座》等</p>
              <hr />
            </el-timeline-item>
            <el-timeline-item
              color="rgb(238,0,0)"
              icon="Mic"
              placement="top"
              timestamp="&ensp;2021.04.12"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <present />
                </el-icon>
              </template>
              <el-card>
                <h2>
                  乐正绫六周年，官方发布生贺曲<span style="color: #ee0000"
                    >《丑马》
                  </span>
                </h2>
                <el-divider content-position="right">
                  <h2 style="color: #ee0000">
                    『我看见一匹丑马有了双翼 飞进了七彩的云里』
                  </h2></el-divider
                >
                <p>生日当天还投稿了一份互动视频</p>
                <p>内容是与阿绫在游乐园共度的一天</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item
              icon="User"
              placement="top"
              timestamp="&ensp;2021.06.18"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <UserFilled />
                </el-icon>
              </template>
              <p>
                &emsp;Vsinger 官方微博发文，正式宣布乐正绫 V5
                声库进入测试阶段，同时公开了 V5 初版形象
              </p>
              <p>
                &emsp;但该初版形象引起了非常大的争议，禾念表示会考虑大家的意见进行修改
              </p>
            </el-timeline-item>
            <el-timeline-item
              icon="Calendar"
              timestamp="&ensp;这一年，乐正绫参与演唱了以下专辑"
              placement="top"
              type="success"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <calendar />
                </el-icon>
              </template>
              <p>
                《华哉有夏·贰》《百变绫绫》《Color Flow》《桃花雪》《现实逃避
                Project》《水花》
              </p>
              <p>
                《甘泽谣》《Dear:2》《αrtist5 系列》《以念之名》《Special Wishes
                2021》等
              </p>
              <hr />
            </el-timeline-item>

            <el-timeline-item
              icon="Film"
              placement="top"
              timestamp="&ensp;2022.02.01"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <sunset />
                </el-icon>
              </template>
              <h2 style="color: #ee0000">「龙腾虎跃，再振旗鼓」</h2>

              <p>&emsp;在 2022 的春节，我们有了自己举办的「虚拟歌手贺岁纪」</p>
              <p>
                &emsp;在这次贺岁纪中，涌现出了许多优秀的歌曲，绫参与演唱的原创歌曲有：《扬旗鸣鼓》《布虎记》
              </p>
              <el-divider content-position="right">
                <h2 style="color: #ee0000">唢呐一响，好戏开场！</h2></el-divider
              >
            </el-timeline-item>
            <el-timeline-item
              color="rgb(238,0,0)"
              icon="Mic"
              placement="top"
              timestamp="&ensp;2022.04.12"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <present />
                </el-icon>
              </template>
              <el-card>
                <h2>
                  乐正绫七周年，官方发布生贺曲<span style="color: #ee0000"
                    >《未知旅行FM》
                  </span>
                </h2>
                <el-divider content-position="right">
                  <h2 style="color: #ee0000">
                    『结伴冲向未知的彼岸』
                  </h2></el-divider
                >
                <p>
                  同时，民间创作者们也举办了七周年生日接龙活动，创作了许多作品
                </p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item
              icon="User"
              placement="top"
              timestamp="&ensp;2022.05.11"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <UserFilled />
                </el-icon>
              </template>
              <p>&emsp;2022年5月11日，官方敲定并公开了乐正绫 V5 最终形象</p>
              <p>
                &emsp;但该形象依旧没能得到大家的认可，由于禾念已将改版形象提交给雅马哈，因此无法再进行修改
              </p>
            </el-timeline-item>
            <el-timeline-item
              color="rgb(238,0,0)"
              icon="Mic"
              placement="top"
              timestamp="&ensp;2022.10.14"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <mic />
                </el-icon> </template
              ><el-card>
                <h2>乐正绫 Vocaloid5 声库正式发售</h2>
                <p>
                  值得一提的是，声库的形式不再是以碟片的形式，而是使用 U
                  盘来启动
                </p>
                <p>并且盒子上并未使用争议较大的 V5 立绘</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item
              icon="Calendar"
              timestamp="&ensp;这一年，乐正绫参与演唱了以下专辑"
              placement="top"
              type="success"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <calendar />
                </el-icon>
              </template>
              <p>
                《拾》《南北》《喧闹世界》《Special Wishes
                2022》《和光同尘》《微塵》等
              </p>
              <hr />
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
    <div id="ai" class="page">
      <div class="story">
        <div class="bg"></div>
      </div>
      <div class="content">
        <div class="inside">
          <el-timeline>
            <el-timeline-item
              color="rgb(238,0,0)"
              icon="Mic"
              placement="top"
              timestamp="&ensp;2022.12.25"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <mic />
                </el-icon> </template
              ><el-card>
                <h2>Vsinger 官方宣布「乐正绫」AI 声库开启内测</h2>
                <p>AI 声库依托于 ACE Studio 平台</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item
              icon="Headset"
              placement="top"
              timestamp="&ensp;2023.01.13"
              type="success"
              ><template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Promotion />
                </el-icon>
              </template>
              <h3>&ensp;乐正绫第一首 AI 曲投稿</h3>
              <p>&ensp;【乐正绫AI】云端 —— 愿我们都能在云端歌唱</p>
            </el-timeline-item>
            <el-timeline-item
              icon="User"
              placement="top"
              timestamp="&ensp;2023.01.14"
              type="primary"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <UserFilled />
                </el-icon>
              </template>
              <h3>&emsp;Vsinger 官方开启「乐正绫」AI 声库形象创作征集活动</h3>
              <p>
                &emsp;在众多投稿的作品中，第一轮得票数最多的十个作品将进入第二轮终选
              </p>
              <p>&emsp;而第二轮终选票数最高的作品将成为乐正绫 AI 声库的形象</p>
            </el-timeline-item>
            <el-timeline-item
              color="rgb(238,0,0)"
              icon="Mic"
              placement="top"
              timestamp="&ensp;2023.04.12"
              ><template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Present />
                </el-icon>
              </template>
              <el-card>
                <h2>
                  乐正绫八周年，官方发布生贺曲<span style="color: #ee0000"
                    >《Break Out》
                  </span>
                </h2>
                <el-divider content-position="right">
                  <h2 style="color: #ee0000">
                    『要我的骄傲随生命 — 喧嚣』
                  </h2></el-divider
                >
                <p>特别值得一提的是，今年的主题很有意思，也很能让人共鸣</p>
                <p>
                  如果说去年官方给出的“旅行”主题偏向于题材创作，那么今年“成为自己”的主题则更具有人文关怀
                </p>
                <p>时隔三年，官方也推出了绫的第二套主题装扮</p>
                <p>同时将选取三首民间原创曲与生贺曲一起作为生贺纪念 EP 发行</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item
              icon="Avatar"
              placement="top"
              timestamp="&ensp;2023.04.12"
              type="success"
              ><template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <UserFilled />
                </el-icon>
              </template>
              <el-card>
                <h2>乐正绫 AI 形象公布</h2>
                <p>
                  在数十个优秀作品中，[Miz 团一]老师的设计拔得头筹，当选乐正绫
                  AI 形象
                </p>
                <p
                  style="
                    text-decoration: underline;
                    text-underline-offset: 0.3em;
                  "
                >
                  <strong
                    >⚠ 官方暂未放出 AI
                    形象的终稿，故右侧立绘采用投稿较早的「渺纱飘雪」老师的设定，见谅</strong
                  >
                </p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item
              icon="User"
              placement="top"
              timestamp="&ensp;2023.04.30"
              type="primary"
              ><template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Management />
                </el-icon>
              </template>
              <h3>&ensp;乐正绫八周年生贺纪念 EP 发行</h3>
              <p>&ensp;《炽星轨迹》是「乐正绫」的第三张官方单人 EP</p>
              <p>
                &ensp;本张生贺纪念 EP 由一首官方生贺曲《Break Out》
                与三首同人原创生贺曲构成
              </p>
              <p>
                &ensp;其中官方
                Pick《礼物pre-Sent》为高手作品，《烁光回流》为人气作品，《雾都来客》为新星作品
              </p>
              <p>
                &ensp;同时官方对这三首同人原创生贺曲进行了一定程度的改编（如编曲、混音、调校等环节）
              </p>
              <!-- <br />
            <p>
              当炽热星芒划过四月的天边，你与我再次相遇，于彼此眼中刻下最动人的热烈
            </p>
            <p>我们共同编制的旋律，是一朵朵逆着光却仍恣意绽放的向日葵；</p>
            <p>
              是雾都中穿透雨幕的那声电吉他；也是永远相伴，互相照亮的星与月……
            </p>
            <p>
              这份礼物，一定会成为我心中永远珍藏的美好，一段夜空中最闪耀的轨迹
            </p> -->
            </el-timeline-item>
            <el-timeline-item
              icon="User"
              placement="top"
              timestamp="&ensp;2023.05.06"
              type="primary"
              ><template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <Mic />
                </el-icon>
              </template>
              <el-card>
                <h2>乐正绫 AI 声库公测</h2>
                <p>ACE_Studio 官方进行了 AI 合成模型的更新升级（v1.7.0）</p>
                <p>
                  乐正绫 AI
                  声库同步升级并开启公测，具备[中文、日文、英文]三语合成功能
                </p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item
              icon="Calendar"
              timestamp="&ensp;这一年，乐正绫参与演唱了以下专辑"
              placement="top"
              type="success"
            >
              <template #dot>
                <el-icon color="#ee0000" class="avatar">
                  <calendar />
                </el-icon>
              </template>
              <p>《炽星轨迹》《海客谈》《故事》《双星波形》《依路相随》等</p>
              <hr />
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
  <!-- todo 统一事件重要程度，例如 是否使用card，v5形象公布就应该使 用 -->
  <div style="display: none">
    <div class="page final">
      <div
        ref="history"
        :class="{ show: finalPageShowFlag }"
        class="history content"
      >
        <div class="inside">
          <!--fixme 标记点位置可能在不同的屏幕分辨率下会错位，需要根据以下修复-->
          <!--画线算法返回所有点位置的数组，然后每个自设标记点的位置从数组中获取，或者划线位置通过vw确认-->
          <canvas
            id="myCanvas"
            ref="myCanvas"
            :height="screenHeight * 0.7"
            :width="screenWidth * 0.85"
          >
          </canvas>
          <div class="finalTachie finalWord">
            <p>就让我将未来编成一双翅膀</p>
            <p style="color: #ee0000">随着荧光飞跃红色海洋</p>
            <p>再次歌唱</p>
            <p style="color: #ee0000">从零开始万千景象延伸远方</p>
          </div>
          <div class="tips tips0">2012 - 01 - 17<br />绫彩音人设入选</div>
          <div class="tips tips1">2012 - 03 - 21<br />乐正绫形象公布</div>
          <div class="tips tips2">2015 - 07 - 17<br />乐正绫声库发售</div>
          <div class="tips tips3">
            2017 - 12 - 02<br />首张官方专辑《绫》发布
          </div>
          <div class="tips tips4">2020 - 04 - 12<br />官专《告白诗》发布</div>
          <div class="tips tips5">2022 - 10 - 14<br />Vocaloid5 声库发售</div>
          <div class="tips tips6">2022 - 12 - 25<br />AI 声库开始内测</div>
          <div class="tips tips7">2023 - 04 - 12<br />AI 形象公布</div>
          <div class="tips tips8">
            悠悠十年，一瞬永远<br />『为你而来 而存在』
          </div>
          <div class="finalTachie final0">
            <img
              alt=""
              src="https://article.biliimg.com/bfs/article/3a6184943556ceb4c6216a0099770274d7b9ffa2.png@1e_1c.webp"
            />
          </div>
          <div class="finalTachie finalV3">
            <img
              alt=""
              src="https://article.biliimg.com/bfs/article/1c4505061ad44ae244932752d3d794f29c2684ad.png@1e_1c.webp"
            />
          </div>
          <div class="finalTachie finalV5">
            <img
              alt=""
              src="https://article.biliimg.com/bfs/article/9b14ff130dbdd0c8c32661806864f4760ae21ac1.png@1e_1c.webp"
            />
          </div>
          <div class="finalTachie finalAi">
            <img
              alt=""
              src="https://article.biliimg.com/bfs/article/4652649af358ea81f80eec4994596cb778457b88.png@1e_1c.webp"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 优化响应式布局，尽量减少不同分辨率下的高度差 -->
<style lang="scss" scoped>
$CyPosition: 86%;
$V3Position: 85.7%;
$V5Position: 90%;
$AiPosition: 88%;
$CySize: 72vh;
$V3Size: 70vh;
$V5Size: 73vh;
$AiSize: 72vh;

.avatar {
  border: 0.2vw solid #ee0000;
  background-color: #ffffff34;
  border-radius: 50%;
  width: 1.6vw;
  height: 1.6vw;
  top: 0vw;
  left: calc(100% - 150% + 5px);
  font-size: 1.1vw;
  position: relative;
}
.el-divider {
  --el-bg-color: transparent !important;
  h2,
  h3 {
    font-size: 1vw;
  }
}
.el-timeline {
  width: 95%;
  margin: 1vw 2vw;
  --el-fill-color-blank: rgba(255, 255, 255, 0.5);
  --el-font-size-small: 1.75vw; // 修改日期字号
  --el-text-color-secondary: #ee0000a0; // 修改日期颜色
  .el-timeline-item {
    font-size: 1.3vw;
    width: 75%;
    --el-text-color-primary: #000;
    padding-bottom: 1vw;
    .el-card {
      --el-card-bg-color: rgba(0, 0, 0, 0.1);
      border: 0.1vw solid rgba(0, 0, 0, 0.15);
      font-size: 1.2vw;
      width: 95%;
      margin: 1.25vw auto 0.25vw 1vw;
      padding: 0.2vw 0 0.2vw 1vw;
      border-radius: 0.7vw;
      // h3,
      // p {
      //   margin: 1.2vw 0;
      // }
    }
  }
}

.bubbleBox {
  opacity: 0;
  width: 20vw;
  position: fixed;
  left: calc(80vw - 27vw);
  font-size: 1.2vw;
  top: 20vh;
  background-color: rgba($color: #fff, $alpha: 0.85);
  border-radius: 1vw;
  border: 0.15vw solid #66ccff;
  transition: all 0.5s;
  z-index: 100;
  user-select: none;
  &::after {
    content: "";
    position: absolute;
    top: 70%;
    right: -0.5vw;
    transform: translateY(-50%);
    border-top: 0.5vw solid transparent;
    border-bottom: 0.5vw solid transparent;
    border-left: 0.5vw solid #66ccff;
  }
  ul {
    margin: 0;
    padding: 10%;

    li {
      line-height: 1.3em;
    }
  }
}

.show {
  opacity: 1 !important;
  transition: all 0.5s;
}

.head,
.final {
  @include content(100vh);
  height: 100vh !important;
  overflow: hidden;
  .content {
    height: 75vh !important;
    width: 90vw;
    margin: 0 auto;
    opacity: 0;
    transition: all 0.5s;
    padding: 10vh 0 0 0;
    .inside {
      height: 80vh !important;
      overflow: hidden;
      margin: 5vh 3vw;
    }
  }
}

.head {
  .inside {
    font-size: 5vw;
    div {
      text-align: center;
      line-height: 70vh;
      white-space: nowrap;
      overflow: hidden;
      span.titleMid {
        animation: blink 1.5s infinite;
      }
    }
  }
}
.final {
  .inside {
    position: relative;

    img {
      width: inherit;
    }

    .tips {
      display: inline-block;
      // float: left;
      color: white;
      padding: 1em;
      user-select: none;
      border-radius: 0.8vw;
      background-color: rgba(0, 0, 0, 0.5);
      position: relative;

      &::before {
        content: "";
        position: absolute;
        bottom: -20px;
        left: 50%;
        margin-left: -10px; /* 三角形宽度的一半 */
        border: 10px solid transparent;
        border-top-color: rgba(0, 0, 0, 0.5);
      }

      &::after {
        content: "";
        position: absolute;
        bottom: -20px;
        left: 50%;
        margin-left: -4px; /* 圆形直径的一半 */
        width: 5px;
        height: 5px;
        border: 1.5px solid rgba(255, 255, 255, 1);
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
      }

      $animationDelay: 1s;

      &.tips0 {
        top: -70.5vh;
        left: 30vw;
        -webkit-animation-delay: $animationDelay;
        animation-delay: $animationDelay;
      }

      &.tips1 {
        top: -61.3vh;
        left: 40vw;
        -webkit-animation-delay: $animationDelay + 0.5s;
        animation-delay: $animationDelay + 0.5s;
        // 向上三角
        &::before {
          content: "";
          position: absolute;
          bottom: 4.3em;
          left: 50%;
          margin-left: -10px; /* 三角形宽度的一半 */
          border: 10px solid transparent;
          border-bottom-color: rgba(0, 0, 0, 0.5);
        }

        &::after {
          content: "";
          position: absolute;
          bottom: 5em;
          left: 50%;
          margin-left: -4px; /* 圆形直径的一半 */
          width: 5px;
          height: 5px;
          border: 1.5px solid rgba(255, 255, 255, 1);
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
        }
      }

      &.tips2 {
        top: -49.8vh;
        left: 35vw;
        padding: 0.9vw;
        -webkit-animation-delay: $animationDelay + 1s;
        animation-delay: $animationDelay + 1s;
      }

      &.tips3 {
        top: -49.5vh;
        left: 3vw;
        -webkit-animation-delay: $animationDelay + 1.5s;
        animation-delay: $animationDelay + 1.5s;
      }

      &.tips4 {
        top: -32vh;
        left: -25vw;
        -webkit-animation-delay: $animationDelay + 2s;
        animation-delay: $animationDelay + 2s;
        // 向上三角
        &::before {
          content: "";
          position: absolute;
          bottom: 4.3em;
          left: 50%;
          margin-left: -10px; /* 三角形宽度的一半 */
          border: 10px solid transparent;
          border-bottom-color: rgba(0, 0, 0, 0.5);
        }

        &::after {
          content: "";
          position: absolute;
          bottom: 5em;
          left: 50%;
          margin-left: -4px; /* 圆形直径的一半 */
          width: 5px;
          height: 5px;
          border: 1.5px solid rgba(255, 255, 255, 1);
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
        }
      }

      &.tips5 {
        top: -16vh;
        left: -48vw;
        -webkit-animation-delay: $animationDelay + 2.5s;
        animation-delay: $animationDelay + 2.5s;
      }

      &.tips6 {
        top: -27.3vh;
        left: 33vw;
        -webkit-animation-delay: $animationDelay + 3s;
        animation-delay: $animationDelay + 3s;
      }

      &.tips7 {
        top: -28.3vh;
        left: 43vw;
        -webkit-animation-delay: $animationDelay + 3.5s;
        animation-delay: $animationDelay + 3.5s;
      }

      &.tips8 {
        top: -31vh;
        left: 46vw;
        line-height: 1.5em;
        -webkit-animation-delay: $animationDelay + 4s;
        animation-delay: $animationDelay + 4s;
      }
    }

    .finalTachie {
      position: absolute;
      // width: 7vw;
      user-select: none;

      &.finalWord {
        white-space: nowrap;
        font-size: 1.5vw;
        //transform: rotate(-45deg);
        top: 0vh;
        left: 2vw;

        p {
          width: 12em;
          padding: 0.5em 1.5em;
          background-color: rgba(0, 0, 0, 0.3);
          margin: 0;
        }

        p:nth-child(1) {
          padding-top: 1.5em;
        }

        p:last-child {
          padding-bottom: 1.5em;
        }
      }

      &.final0 {
        width: 7vw;
        top: -2vh;
        left: 25vw;
      }

      &.finalV3 {
        width: 6vw;
        top: 0vh;
        right: 8vw;
      }

      &.finalV5 {
        width: 8vw;
        bottom: 10vh;
        left: 4vw;
      }

      &.finalAi {
        width: 8.5vw;
        bottom: 10vh;
        right: 38vw;
      }
    }
  }
}

.page {
  background-size: cover !important;
  background-position: center, top;
  background-attachment: fixed !important;

  // 注意：这里不可以通过 margin 值设置，background-image 需要与背景同高为 120vh，上下 10vh 设置为透明
  .content {
    width: 90vw;
    text-align: left;
    margin: 0 auto;
    padding: 15vh 0 0 0;
    .inside {
      overflow: hidden;
      margin: 3vh 1vw;
    }
  }
  .story {
    width: 100vw;
    .bg {
      position: absolute;
      width: 98vw;
      z-index: 10;
      background-size: auto 70vh !important;
    }
  }
}

.head {
  background: url(https://article.biliimg.com/bfs/article/3907d9824988b14a38f69cc18a5960b11ad214a7.png@1e_1c.webp)
    fixed;
  background-position: center !important;
}

#lingcaiyin {
  @include content(var(--lingCaiyin));
  background-image: url(https://article.biliimg.com/bfs/article/77f11eee1f298e29095747608cb090c62eadb81c.png@1e_1c.webp),
    url(https://article.biliimg.com/bfs/article/f73d67839c71eb90352b6945ffd807ab2d5f369a.png@1e_1c.webp);
  .bg {
    background: url(https://article.biliimg.com/bfs/article/3a6184943556ceb4c6216a0099770274d7b9ffa2.png@1e_1c.webp)
      no-repeat fixed $CyPosition bottom !important;
    background-size: auto $CySize !important;
  }
}

#v3 {
  @include content(var(--lingV3));
  background-image: url(https://article.biliimg.com/bfs/article/9d857ae5dc05626cc44cecd4b18ff88a3d096b48.png@1e_1c.webp),
    url(https://article.biliimg.com/bfs/article/e1143590da779c44243f54a685a9a7f410d169ae.png@1e_1c.webp);
  .bg {
    background: url(https://article.biliimg.com/bfs/article/1c4505061ad44ae244932752d3d794f29c2684ad.png@1e_1c.webp)
      no-repeat fixed $V3Position bottom;
    background-size: auto $V3Size !important;
  }
}

#v5 {
  @include content(var(--lingV5));
  background-image: url(https://article.biliimg.com/bfs/article/3b373ba97060d3b0f43da260e6d44cdf85633533.png@1e_1c.webp),
    url(https://article.biliimg.com/bfs/article/c06ba9fa33e09d6c6d7df2ff420a24c919e688f2.jpg@1e_1c.webp);
  .bg {
    background: url(https://article.biliimg.com/bfs/article/9b14ff130dbdd0c8c32661806864f4760ae21ac1.png@1e_1c.webp)
      $V5Position bottom no-repeat fixed;
    background-size: auto $V5Size !important;
  }
}

#ai {
  @include content(var(--lingAi));
  background-image: url(https://article.biliimg.com/bfs/article/ddaf99a3cc247c44f8c1e9df24adbbc0d211831d.png@1e_1c.webp),
    url(https://i0.hdslb.com/bfs/article/e636c24f9c4ced88a99b4ea1d9c17cef1402305269.png@1e_1c.webp);
  .bg {
    background: url(https://article.biliimg.com/bfs/article/4652649af358ea81f80eec4994596cb778457b88.png@1e_1c.webp)
      $AiPosition bottom no-repeat fixed;
    background-size: auto $AiSize !important;
  }
}

.final {
  background: url(https://article.biliimg.com/bfs/article/6b55f667d718fda42ffef7550188df246473e2f7.png@1e_1c.webp)
    fixed;
}
</style>
