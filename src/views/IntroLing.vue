<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref, watchEffect} from "vue"
import {smoothScroll} from '../utils/scrollToPosition';
// @ts-ignore
import WOW from "wow.js";
import {drawCurve} from "../utils/drawCurve";

let timer: NodeJS.Timeout
let history = ref(null)
let headPage = ref(null)
let myCanvas = ref(null)
let lingcaiyin = ref<HTMLInputElement | null>(null)
let nowPage = ref(0)
let finalPageShowFlag = ref(false)
let bubbleBoxShowFlag = ref(false)
// fixme change ref to reactive
const items = ref([
			{
				'': '绫彩音「Ling Caiyin」',
				'人设': 'rikuhao（ハオ）',
				'发色': '黑发',
				'瞳色': '黑瞳',
				'年龄': '16 岁',
				'身高': '155cm',
				'体重': '41kg',
				'特点': '麻花辫、呆毛、美人痣、耳机、长短袜、腰鼓'
			},
			{
				'': '乐正绫「YueZheng Ling」',
				'人设': 'rikuhao、ideolo',
				'发色': '棕发',
				'瞳色': '红瞳',
				'年龄': '16 岁',
				'身高': '160cm',
				'体重': '41kg',
				'代表色': '#EE0000',
				'生日': '4 月 12 日',
				'特点': '麻花辫、呆毛、美人痣、耳机、长短袜、腰鼓、左撇子',
				'音之精灵': '释天',
				'声源': '祈Inory',
				'声库制作人': '人形兎',
				'声库版本': 'Vocaloid™3',
				'发布日期': '2015.07.17',
				'使用乐器': '吉他',
				'擅长节奏': '70-220 BPM',
				'擅长音域': 'G2-C5',

			},
			{
				'': '乐正绫「YueZheng Ling」',
				'人设': 'TID',
				'发色': '棕发',
				'瞳色': '红瞳',
				'代表色': '#EE0000',
				'声源': '祈Inory',
				'声库制作人': '人形兎',
				'声库版本': 'Vocaloid™5',
				'发布日期': '2022.10.14',
				'音色': '炽(Normal)&幽(Dark)',
				'擅长节奏': '60-220 BPM',
				'擅长音域': 'F2-F4',
			},
			{
				'': '乐正绫「YueZheng Ling」',
				'人设': 'Miz 团一',
				'发色': '棕发',
				'瞳色': '红瞳',
				'代表色': '#EE0000',
				'声源': '祈Inory',
				'声库制作人': '阿元',
				'声库版本': 'ACE-Studio',
				'发布日期': '2023.__.__',
				'音色': '______',
				'擅长节奏': '____ BPM',
				'擅长音域': 'F2-F4',
			},
		]
)
let wow = new WOW({
	boxClass: "wow", // 盒子类： 当用户滚动时显示隐藏框的类名。
	animateClass: "animated",// 动画类： 触发 CSS 动画的类名（默认情况下，animate.css 库为“动画”）
	offset: 20,// 抵消： 定义浏览器视口底部与隐藏框顶部之间的距离。当用户滚动并达到此距离时，将显示隐藏的框。
	mobile: true,//移动： 在移动设备上打开/关闭哇.js。
	live: true,//实时：持续检查页面上的新WOW元素。
	callback: function (box: any) {
		// 每次启动动画时都会触发回调，传入的参数是正在动画的 DOM 节点
	},
	scrollContainer: null, // optional scroll container selector, otherwise use window,
	resetAnimation: true, // reset animation on end (default is true)
});
wow.init();

// idea 可能需要考虑通过动态获取屏幕高度来设置每页高度（比如获取文本总高度后，与用户当前界面大小进行计算转换，判断需要多少个 vh），当前在不同屏幕下效果不好
// idea 修改 font-size
// idea 撑大缩小盒子时也添加动效
// 当前页数计算，传入对应数据
window.addEventListener('scroll', function () {
	finalPageShowFlag.value = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100
	// 存储每页高度，单位为 vh
	let pageHeight = [100, 190, 420, 310, 180, 100];
	let totalHeight = 0;
	for (let i = 0; i < pageHeight.length; i++) {
		totalHeight += pageHeight[i];
		// 需要添加屏幕的一半高度，提早判断下一页的到来
		if (window.scrollY + window.innerHeight / 2 < totalHeight * window.innerHeight / 100) {
			nowPage.value = i;
			break;
		}
	}
	if (document.documentElement.scrollTop !== 0) {
		clearTimeout(timer)
	}
})

// 判断鼠标位置，显隐气泡框
// fixme 这个通过位置判断似乎并不太好，在不同分辨率的屏幕下容易错位
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let startX = screenWidth * 0.625;
let endX = screenWidth * 0.85;
let startY = screenHeight * 0.3;
let endY = screenHeight;

function judgeMousePosition(event: { clientX: number; clientY: number; }) {
	let mouseX = event.clientX;
	let mouseY = event.clientY;
	const rect = (document.querySelector('.bubbleBox') as HTMLElement).getBoundingClientRect();
	if (mouseX >= startX && mouseX <= endX && mouseY >= startY && mouseY <= endY) {
		bubbleBoxShowFlag.value = true
	} else if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
		// 鼠标在气泡框内，保持不变
	} else {
		bubbleBoxShowFlag.value = false;
	}
}

document.addEventListener('mousemove', judgeMousePosition);


let pageHeight: number
onMounted(() => {
	pageHeight = (lingcaiyin.value as HTMLElement).offsetTop
	// 获取每项时间轴
	document.querySelectorAll('.el-timeline-item').forEach((item, index) => {
		item.classList.add('wow', 'animate__animated', 'animate__fadeInUp')
	})
	document.querySelectorAll('.tips').forEach((item, index) => {
		item.classList.add('wow', 'animate__animated', 'animate__fadeIn')
	})
	document.querySelectorAll('.finalWord p').forEach((item, index) => {
		item.classList.add('wow', 'animate__animated', 'animate__fadeIn', `animate__delay-${index + 1}s`)
	})
	document.querySelectorAll('.finalTachie').forEach((item, index) => {
		item.classList.add('wow', 'animate__animated', 'animate__fadeIn', `animate__delay-${index}s`)
	})
	// 以上两段也可以这么做，就是可读性不好
	// document.querySelectorAll('.finalWord p, .finalTachie').forEach((item, index) => {
	// 	item.classList.add('wow', 'animate__animated', 'animate__fadeIn', `animate__delay-${index + (item.classList.contains('finalWord') ? 1 : 0)}s`);
	// });
	// 获取并变大所有时间轴图标节点
	document.querySelectorAll('.el-timeline-item__node--normal').forEach((item) => {
		item.classList.add('el-timeline-item__node--large')
	})
	// 5 秒后整屏滚动
	timer = setTimeout(() => {
		if (document.documentElement.scrollTop === 0) {
			smoothScroll(pageHeight, 600, 1);
		}
	}, 4000)

	// 通过增加控制点使得贝塞尔曲线贴近控制点
	let points = [
		[window.innerWidth * 0.25, window.innerHeight * 0.1],
		[window.innerWidth * 0.25, window.innerHeight * 0.1],
		[window.innerWidth * 0.25, window.innerHeight * 0.1],
		[window.innerWidth * 0.25, window.innerHeight * 0.1],
		[window.innerWidth * 0.25, window.innerHeight * 0.1],
		[window.innerWidth * 0.25, window.innerHeight * 0.1],
		[window.innerWidth * 0.25, window.innerHeight * 0.1],

		[window.innerWidth * 0.20, window.innerHeight * 0.175],
		[window.innerWidth * 0.20, window.innerHeight * 0.175],
		[window.innerWidth * 0.20, window.innerHeight * 0.175],
		[window.innerWidth * 0.20, window.innerHeight * 0.175],
		[window.innerWidth * 0.20, window.innerHeight * 0.175],
		[window.innerWidth * 0.20, window.innerHeight * 0.175],
		[window.innerWidth * 0.20, window.innerHeight * 0.175],

		[window.innerWidth * 0.25, window.innerHeight * 0.25],
		[window.innerWidth * 0.25, window.innerHeight * 0.25],
		[window.innerWidth * 0.25, window.innerHeight * 0.25],
		[window.innerWidth * 0.25, window.innerHeight * 0.25],
		[window.innerWidth * 0.25, window.innerHeight * 0.25],
		[window.innerWidth * 0.25, window.innerHeight * 0.25],
		[window.innerWidth * 0.25, window.innerHeight * 0.25],

		[window.innerWidth * 0.4, window.innerHeight * 0.06],
		[window.innerWidth * 0.4, window.innerHeight * 0.06],
		[window.innerWidth * 0.4, window.innerHeight * 0.06],
		[window.innerWidth * 0.4, window.innerHeight * 0.06],
		[window.innerWidth * 0.4, window.innerHeight * 0.06],
		[window.innerWidth * 0.4, window.innerHeight * 0.06],
		[window.innerWidth * 0.4, window.innerHeight * 0.06],

		[window.innerWidth * 0.75, window.innerHeight * 0.05],
		[window.innerWidth * 0.75, window.innerHeight * 0.05],
		[window.innerWidth * 0.75, window.innerHeight * 0.05],
		[window.innerWidth * 0.75, window.innerHeight * 0.05],
		[window.innerWidth * 0.75, window.innerHeight * 0.05],
		[window.innerWidth * 0.75, window.innerHeight * 0.05],
		[window.innerWidth * 0.75, window.innerHeight * 0.05],
		[window.innerWidth * 0.75, window.innerHeight * 0.05],
		[window.innerWidth * 0.75, window.innerHeight * 0.05],

		[window.innerWidth * 0.75, window.innerHeight * 0.35],
		[window.innerWidth * 0.75, window.innerHeight * 0.35],
		[window.innerWidth * 0.75, window.innerHeight * 0.35],
		[window.innerWidth * 0.75, window.innerHeight * 0.35],
		[window.innerWidth * 0.75, window.innerHeight * 0.35],
		[window.innerWidth * 0.75, window.innerHeight * 0.35],
		[window.innerWidth * 0.75, window.innerHeight * 0.35],
		[window.innerWidth * 0.75, window.innerHeight * 0.35],
		[window.innerWidth * 0.75, window.innerHeight * 0.35],
		[window.innerWidth * 0.75, window.innerHeight * 0.35],

		[window.innerWidth * 0.1, window.innerHeight * 0.35],
		[window.innerWidth * 0.1, window.innerHeight * 0.35],
		[window.innerWidth * 0.1, window.innerHeight * 0.35],
		[window.innerWidth * 0.1, window.innerHeight * 0.35],
		[window.innerWidth * 0.1, window.innerHeight * 0.35],
		[window.innerWidth * 0.1, window.innerHeight * 0.35],
		[window.innerWidth * 0.1, window.innerHeight * 0.35],
		[window.innerWidth * 0.1, window.innerHeight * 0.35],
		[window.innerWidth * 0.1, window.innerHeight * 0.35],

		[window.innerWidth * 0.1, window.innerHeight * 0.7],
		[window.innerWidth * 0.1, window.innerHeight * 0.7],
		[window.innerWidth * 0.1, window.innerHeight * 0.7],
		[window.innerWidth * 0.1, window.innerHeight * 0.7],
		[window.innerWidth * 0.1, window.innerHeight * 0.7],
		[window.innerWidth * 0.1, window.innerHeight * 0.7],
		[window.innerWidth * 0.1, window.innerHeight * 0.7],
		[window.innerWidth * 0.1, window.innerHeight * 0.7],
		[window.innerWidth * 0.1, window.innerHeight * 0.7],

		[window.innerWidth, window.innerHeight * 0.65],
		[window.innerWidth, window.innerHeight * 0.65],
		[window.innerWidth, window.innerHeight * 0.65],
		[window.innerWidth, window.innerHeight * 0.65],
		[window.innerWidth, window.innerHeight * 0.65],
		[window.innerWidth, window.innerHeight * 0.65],
		[window.innerWidth, window.innerHeight * 0.65],
	];
	let canvas = myCanvas.value as unknown as HTMLCanvasElement;

	// 滚动到最后页面时开始绘制曲线
	watchEffect(() => {
		if (finalPageShowFlag.value === true) {
			drawCurve(canvas, points, "rgb(238, 0, 0)", 0.65, 5,4500)
		}
	})
})

onBeforeUnmount(() => {
	document.removeEventListener('mousemove', judgeMousePosition);
	clearTimeout(timer)
})

</script>

<template>
	<!--idea 通过 <Transition> 来增加过渡 -->
	<div v-show="nowPage!==0 && nowPage!==5"
	     ref="bubbleBox"
	     :class="{show:bubbleBoxShowFlag}"
	     class="bubbleBox">
		<ul>
			<li v-for="(value, key) in items[nowPage-1]" :key="key">
				{{ key }} {{ key === '' ? '' : '-' }} {{ value }}
			</li>
		</ul>
	</div>
	<div ref="headPage" class="page head"
	     @click="smoothScroll(pageHeight)">
		<div class="history show ">
			<div class="inside">
				<div class="words ">
					<span class="animate__animated animate__fadeIn animate__delay-1s">悠悠十年</span>
					<span class="titleMid animate__animated animate__fadeIn">&nbsp;|&nbsp;</span>
					<span class="animate__animated animate__fadeIn animate__delay-2s">一瞬永远</span>
				</div>
			</div>
		</div>
	</div>
	<div id="lingcaiyin" ref="lingcaiyin" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			<div class="inside">
				<el-timeline>
					<el-timeline-item icon="Aim" placement="top"
					                  timestamp="2011.11.20"
					                  type="primary">
						VOCALOID China Project 项目启动
					</el-timeline-item>
					<el-timeline-item icon="Management"
					                  placement="top"
					                  timestamp="2011.12.01"
					                  type="warning">
						开始征集 VOCALOID China Project 企划人物形象设计
					</el-timeline-item>
					<el-timeline-item icon="Checked" placement="top"
					                  timestamp="2012.01.03" type="danger">
						VOCALOID China Project 形象征集结束
					</el-timeline-item>
					<el-timeline-item icon="FolderChecked"
					                  placement="top"
					                  timestamp="2012.01.17"
					                  type="success">
						<el-card>
							<h2>「雅音宫羽、绫彩音、MOKO、牙音、蝶音」五位人设入选</h2>
							<p>VOCALOID China Project 形象评选结果公布，分别是「雅音宫羽、绫彩音、MOKO、牙音、蝶音」</p>
							<h3>『元气十足的可爱外表和带有浓郁中国风的新颖设计，赢得了大批粉丝的青睐。』</h3>
						</el-card>
					</el-timeline-item>
					<el-timeline-item icon="Place" placement="top" timestamp="2012.03.21"
					                  type="success">
						<el-card>
							<h3>VOCALOID China Project 最终形象定稿公布</h3>
							<p>确定最终形象为「洛天依、乐正绫、徵羽摩柯、乐正龙牙、墨清弦」</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item class="is-loading" icon="Loading"
					                  placement="top"
					                  timestamp="2012 年 7 月 12 日，VOCALOID™3「洛天依」中文声库首发，只是在之后三年时间里，「乐正绫」却依旧找不到属于她的声音"
					                  type="primary">
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
					</el-timeline-item>
					<el-timeline-item icon="Promotion" placement="top"
					                  timestamp="2014.04.05" type="primary">
						<p>《云端》发布 —— 「三年孤寂愿与你相伴」</p>
						<p> P 主与 STAFF 们以这一首无声歌曲，献给当时仍未发售声库的乐正绫</p>
						<p>某种意义上算是阿绫的<strong> 第一首 </strong>歌曲</p>
						<p>「作曲：卫星（音绕阁） | 填词：萌兔（音绕阁） | 绘师：碎影无痕、锦冲田 | 编曲：bz86nick | PV：墨兰花语 | 演唱：乐正绫」</p>
						<p>『乐正绫作为同洛天依一起第一批被VC选中的人设，一直没有音源，</p>
						<p>&emsp;UP 主和众多喜欢她的小伙伴一直都很想听她唱歌，</p>
						<p>&emsp;但是，两年了，UP 主终于等不起了，和一些喜欢绫的人一起创作了这首属于这个没有音源的歌姬的曲子，</p>
						<p>&emsp;希望喜欢绫的大家不要忘记她，也希望有更多的人能喜欢上这个中国红元气娘 —— 乐正绫』 —— 萌兔兔兔子</p>
						<hr>
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
					<el-timeline-item icon="microphone" placement="top"
					                  timestamp="2014.10.15" type="primary">
						「乐正绫」声源公布，「祈Inory」为其 VOCALOID™3 中文声库声源
					</el-timeline-item>
					<el-timeline-item color="rgb(238,0,0)"
					                  icon="StarFilled" placement="top"
					                  timestamp="2015.06.12">
						<el-card>
							<h2 style="color: #ee0000">「记住我&emsp;鲜艳的红色」</h2>
							<h3>&nbsp;官方发布了「乐正绫」第一首试听曲 —— 《Scarlet Drop》</h3>
							<p>“作为乐正绫爱好者们急切期盼的曲目，激昂的旋律从头至尾弥漫着重金属的味道，<br/>
								&nbsp;歌词字里行间抒发着乐正绫不顾被世间
								<del>官方</del>
								与未来所阻隔和遗忘，努力唱响自己的歌声。”
							</p>
							<p>『抵达梦的尽头　之后放声而歌</p>
							<p>&emsp;已不再是过客　<span style="color: #ee0000">因为彼此约定着</span>』</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item icon="headset" placement="top"
					                  timestamp="2015.07.04" type="primary">
						<el-card>
							<h2 style="color: rgb(64, 88, 164)">「将这份无用思念&emsp;与你再讲一遍」</h2>
							<h3>&nbsp;乐正绫第二首官方试听曲《梦语》发布</h3>
							<p>“本曲是 Vsinger 官方发布的第二首乐正绫无参试听 Demo 曲。<br/>
								&nbsp;与前一首试听曲《Scarlet Drop》不同，本曲采用了柔美抒情的曲风。<br/>
								&nbsp;歌词的字里行间都充满了温柔的思念之情，<br/>
								&nbsp;强烈地抒发了乐正绫作为一个
								<del>被官方遗忘许久的</del>
								虚拟歌手，对观众的思念之情。”
							</p>
							<p>『如果说　有一天　再相见</p>
							<p>&emsp;将这份无用思念　与你再讲一遍</p>
							<p>&emsp;那我再看一眼　在你眼中流转的世界</p>
							<p><span style="color: #ee0000;font-size:1.5em;">&emsp;一瞬永远&nbsp;</span>』</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item color="rgb(238,0,0)" icon="mic"
					                  placement="top" timestamp="2015.07.17">
						<el-card>
							<h1>「乐正绫」VOCALOID™3 中文声库发售</h1>
							<p>VOCALOID™3 中文声库「乐正绫」正式发售，从此声库走向民间创作者，一个新的时代开启了</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item icon="Calendar" placement="top" type="success">
						<hr>
						<p>2015 年，乐正绫参与演唱的专辑有：《南北寻光》《Saligia系列》《双向·轮回与幸福》《Travel Days》《平行四界Quadimension 3 & 4》</p>
						<hr>
					</el-timeline-item>
					<el-timeline-item icon="List" placement="top"
					                  timestamp="2016 年" type="primary">
						<p>2016 是一个神奇的年份，在这一年，乐正绫登上了拜年祭的舞台，留下了一曲传唱千古的《九九八十一》</p>
						<p>8 月 25 日，COP 投稿了《世末歌者》，这首歌后来成为了乐正绫再生数第二高的歌曲，
							<del>同时也为 V 家留下了 2018 coming soon 的传说</del>
						</p>
						<p>同年还有「妄想症系列」、「白石溪」、「节气物语」等作品，越来越多的 P 主开始借绫之口抒发心中所想。</p>
						<p>当然，16 年还有一个企划 —— 「时之歌Project」，不知道如今的你，还在听这些曲子吗</p>
						<p>2016-08-06&nbsp;《破晓将至》【乐正绫原创】<br/>
							2016-04-09&nbsp;《黑暗审判》【乐正绫原创】<br/>
							2016-03-19&nbsp;《光流终焉》【乐正绫原创】<br/>
							2016-12-03&nbsp;《为战而生》【乐正绫原创】<br/>
							2016-02-27&nbsp;《虚拟神明》【言和&乐正绫原创】<br/>
							2016-01-30&nbsp;&emsp;《悬空》&emsp;【洛天依&乐正绫原创】<br/>
							2016-01-10&nbsp;&emsp;《归一》&emsp;【洛天依&乐正绫&心华原创】<br/></p>
						<h3>『心跳沉沉试图召唤着哀伤&emsp;而你用双手拨开我所有匆忙』</h3>
					</el-timeline-item>
					<el-timeline-item icon="Calendar" placement="top" type="success">
						<hr>
						<p>2016 年，乐正绫参与演唱的专辑有：《中华少女Project》《恋爱理论》《Dear:》《节气物语》《南北极星 Vol.1》《平行四界Quadimension 5 》</p>
						<hr>
					</el-timeline-item>
					<el-timeline-item icon="Promotion" placement="top"
					                  timestamp="2017.04.28"
					                  type="primary">
						<p>Vsinger 官方投稿了乐正绫独唱曲《未来的我》 —— 「励志歌词与旋律，搭配明亮坚定的歌声和史诗般恢弘的编曲，充满了希望与力量。」</p>
					</el-timeline-item>
					<el-timeline-item color="rgb(238,0,0)" icon="Checked"
					                  placement="top" timestamp="2017.12.02" type="primary">
						<el-card>
							<h2>「乐正绫」首张官方专辑<span style="color: #ee0000;">《绫》</span>正式发售</h2>
							<p>2017 年 12 月 2 日，Vsinger 发布了乐正绫的首张官方单人专辑《绫》，该专辑内共有7首单曲。</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item icon="Calendar" placement="top" type="success">
						<hr>
						<p>2017 年，乐正绫参与演唱的专辑有：《绫》《Ling聽》《妄想症Paranoia》《无名》《四季四世》《人·間》《平行四界Quadimension 5》</p>
						<hr>
					</el-timeline-item>
					<!--<el-timeline-item icon="" placement="top" timestamp="2018.07.28" type="primary">-->
					<!--	<p>忘川风华录投稿了南北合唱的《易水诀》，这是忘川第一次选取乐正绫作为歌手来演唱歌曲-->
					<!--		<del> 可惜也是最后一次</del>-->
					<!--	</p>-->
					<!--</el-timeline-item>-->
					<el-timeline-item icon="Calendar" placement="top" type="success">
						<hr>
						<p>2018 年，乐正绫参与演唱的专辑有：《华哉有夏》《如是我闻》《八月的幽灵》</p>
						<p>《秘密邮件》《Godrose》《卡纳塔幻想曲》《平行四界Quadimension 6》《No.13852》</p>
						<hr>
					</el-timeline-item>
					<!--todo 繁华唱遍-->
					<el-timeline-item color="rgb(238,0,0)" icon="Mic" placement="top"
					                  timestamp="2019.04.12" type="primary">
						<el-card>
							<h3>乐正绫四周年，『在此歌唱 从零开始万千景象延伸远方』——《我在》</h3>
							<p>《我在》以绫的视角描写自诞生以来的心境，以及对听众们的感谢。</p>
							<p>同日，官方宣布与游戏联动，投稿了游戏联动曲《蝶恋花·何处谣》</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item icon="TrendCharts" placement="top"
					                  timestamp="2019.12.07" type="danger">
						<p>沙雕教投稿了【赤羽x乐正绫】《赤伶》【原创剧情向pv附】</p>
						<p>『原曲为李建衡作曲、何天程编曲、清彦作词、HITA演唱的同名歌曲，收录于同名专辑中。</p>
						<p>&emsp;以中国抗日战争时期为背景，讲述名伶裴晏之受日军要求唱戏，设计纵火焚毁戏楼的故事，展现「位卑未敢忘忧国」的爱国情怀。</p>
						<p>&emsp;本作在原曲背景故事的基础上进行延伸，将乐正绫设定为裴晏之（赤羽饰）的后辈；两位歌手合称的「赤绫」与标题谐音，为人所津津乐道。</p>
						<p>&emsp;纯熟调教下的戏腔高亢优美、极具震撼力，令人身临其境，回溯那场热烈而悲壮的绝唱。』</p>
					</el-timeline-item>
					<el-timeline-item icon="Calendar" placement="top" type="success">
						<hr>
						<p>2019 年，乐正绫参与演唱的专辑有：《从众效应》《Les Fleurs Du Mal 恶之花》《名字》《柒》</p>
						<hr>
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
					<el-timeline-item color="rgb(238,0,0)" icon="Mic" placement="top"
					                  timestamp="2020.04.12">
						<el-card>
							<h3>乐正绫五周年，『为你而来 而存在』——《花》</h3>
							<p>官方也在今天发布了乐正绫官方 EP《告白诗》专辑试听 PV</p>
							<p>《告白诗》是 2020 年乐正绫诞生祭企划作品，也是乐正绫的第二张官方专辑</p>
							<p>该专辑内共有4首单曲【《花》《多数人》《酒心吻》《悸动》】</p>
							<p>值得一提的是，《花》第一次使用了绫的 Vocaloid5 音源，给予无数听众以希望。</p>
							<h3 style="color: #ee0000">「请你知晓　—— <i>好不好</i>」</h3>
						</el-card>
					</el-timeline-item>
					<el-timeline-item icon="guide" placement="top" timestamp="2020.05.22" type="primary">
						<h3>「快走吧，山遥路远」</h3>
						<p>ChiliChill 投稿了《山遥路远》，本曲使用了尚未发售的 V5 音源</p>
						<p>『然后非常感谢人老师和动老师。前些日子听了《花》，眼前一亮，真的一亮，</p>
						<p>非常快就决定想让阿绫来唱这首，于是我们联系到了人老师，这才有了接下来的故事。』—— Yu H.</p>
					</el-timeline-item>
					<el-timeline-item icon="Calendar" placement="top" type="success">
						<hr>
						<p>2020 年，乐正绫参与演唱的专辑有：《告白诗》《Cotton_Candy》</p>
						<hr>
					</el-timeline-item>
					<el-timeline-item color="rgb(238,0,0)" icon="Mic" placement="top" timestamp="2021.04.12">
						<el-card>
							<h3>乐正绫六周年，『我看见一匹丑马有了双翼 飞进了七彩的云里』《丑马》</h3>
							<p>官方还投稿了一份互动视频</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item icon="User" placement="top" timestamp="2021.06.18" type="primary">
						<p>Vsinger官方微博发文，正式宣布乐正绫 V5 声库进入测试阶段，同时公开了 V5 初版形象。
						</p>
						<p>但该初版形象引起了非常大的争议，官方表示会考虑大家的意见进行修改。</p>
					</el-timeline-item>
					<el-timeline-item icon="Calendar" placement="top" type="success">
						<hr>
						<p>2021 年，乐正绫参与演唱的专辑有：《华哉有夏·贰》《百变绫绫》《Color Flow》《桃花雪》</p>
						<p>《现实逃避Project》《甘泽谣》《Dear:2 异类与群羊》《αrtist5系列》《Special Wishes 2021》</p>
						<hr>
					</el-timeline-item>

					<el-timeline-item icon="Film" placement="top" timestamp="2022.02.01" type="primary">
						<h3 style="color: #ee0000">唢呐一响，好戏开场！</h3>
						<p>2022 的春节，我们已经有了自己举办的「虚拟歌手贺岁纪」</p>
						<p>在这次贺岁纪中，涌现出了许多优秀的歌曲，绫参与演唱的原创歌曲有：《扬旗鸣鼓》《布虎记》</p>
					</el-timeline-item>
					<el-timeline-item color="rgb(238,0,0)" icon="Mic" placement="top" timestamp="2022.04.12">
						<el-card>
							<h3>乐正绫七周年，『结伴冲向未知的彼岸』——《未知旅行FM》</h3>
							<p>同时，同人也举办了七周年生日接龙活动，创作了许多歌曲</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item icon="User" placement="top" timestamp="2022.05.11" type="primary">
						<p>2022年5月11日，官方敲定并公开了乐正绫 V5 最终形象</p>
						<p>但该形象依旧没能得到大家的认可，由于改版形象已提交给雅马哈官方，因此无法再进行修改</p>
						<p>
							<del>（笔者对审美方面一窍不通故不做评价，但戴着手套是不方便弹吉他的吧）</del>
						</p>
					</el-timeline-item>
					<el-timeline-item color="rgb(238,0,0)" icon="Mic" placement="top" timestamp="2022.10.14">
						<el-card>
							<h2>乐正绫 Vocaloid5 声库正式发售</h2>
							<p>值得一提的是，声库的形式不再是以碟片，而是使用 U 盘来启动。</p>
							<p>
								<del>并且盒子上并未使用争议较大的 V5 立绘</del>
							</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item icon="Calendar" placement="top" type="success">
						<hr>
						<p>2022 年，乐正绫参与演唱的专辑有：《拾》《南北》《喧闹世界》《Special Wishes 2022》</p>
						<hr>
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
					<el-timeline-item color="rgb(238,0,0)" icon="Mic" placement="top" timestamp="2022.12.25">
						<el-card>
							<h2>卫星哥官方发文，正式宣布 ACE-Studio「乐正绫」Ai 声库开启内测</h2>
							<del>但出了点意外，官方又一直没有消息，调教老师们等了十八天才收到内测码</del>
						</el-card>
					</el-timeline-item>
					<el-timeline-item icon="Headset" placement="top" timestamp="2023.01.13" type="success">
						<h3>乐正绫第一首 Ai 曲投稿</h3>
						<p>【乐正绫AI】云端 —— 愿我们都能在云端歌唱</p>
					</el-timeline-item>
					<el-timeline-item icon="User" placement="top" timestamp="2023.01.14" type="primary">
						<h3>Vsinger 官方发布，开启形象创作征集活动</h3>
					</el-timeline-item>
					<el-timeline-item color="rgb(238,0,0)" icon="Mic" placement="top" timestamp="2023.04.12">
						<el-card>
							<h2>乐正绫八周年生日快乐🎂</h2>
							<p>『要我的骄傲随生命 — 喧嚣』——《Break Out》</p>
							<p>特别值得一提的是，今年的主题很有意思，也很能让人共鸣</p>
							<p>如果说去年官方给出的“旅行”主题偏向于题材创作，那么今年“成为自己”的主题则更具有人文关怀</p>
							<p>时隔三年，官方也推出了绫的第二套主题装扮，同时将选取三首民间原创曲与生贺曲一起作为生贺纪念 EP 发行</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item icon="Avatar" placement="top" timestamp="2023.04.12" type="success">
						<el-card>
							<h2>乐正绫 Ai 形象敲定🎉</h2>
							<!-- todo 更新-->
							<p>在数十个优秀作品中，[Miz 团一] 老师的设计脱颖而出，成功当选乐正绫 Ai 形象</p>
							<del>终稿还在调整中，右侧立绘暂缺</del>
						</el-card>
					</el-timeline-item>
					<el-timeline-item icon="User" placement="top" timestamp="2023.04.30" type="primary">
						<h3>乐正绫八周年生贺纪念 EP 发行</h3>
						<hr />
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
	</div>
	<!--todo 最后一页fadeInUp出小框，提示‘去看看其他歌手的’跳转到/#/vocaloid-->
	<div class="page final">
		<div ref="history"
		     :class="{show:finalPageShowFlag}"
		     class="history">
			<div class="inside">
				<!--<p>在此歌唱 从零开始万千景象延伸远方</p>-->
				<canvas id="myCanvas" ref="myCanvas"
				        :height="screenHeight*0.7"
				        :width="screenWidth*0.85">
				</canvas>
				<div class="finalTachie finalWord">
					<p>就让我将未来编成一双翅膀</p>
					<p style="color:#ee0000">随着荧光飞跃红色海洋</p>
					<p>再次歌唱</p>
					<p style="color:#ee0000">从零开始万千景象延伸远方</p>
				</div>
				<!--fixme 标记点位置可能在不同的屏幕分辨率下会错位，需要根据以下修复-->
				<!--idea 画线算法返回所有点位置的数组，然后每个自设标记点的位置从数组中获取-->
				<div class="tips tips0">2012 - 01 - 17<br/>绫彩音人设入选</div>
				<div class="tips tips1">2012 - 03 - 21<br/>乐正绫形象公布</div>
				<div class="tips tips2">2015 - 07 - 17<br/>乐正绫声库发售</div>
				<div class="tips tips3">2017 - 12 - 02<br/>首张官方专辑《绫》发布</div>
				<div class="tips tips4">2020 - 04 - 12<br/>官专《告白诗》发布</div>
				<div class="tips tips5">2022 - 10 - 14<br/>Vocaloid5 声库发售</div>
				<div class="tips tips6">2022 - 12 - 25<br/>Ai 声库开始内测</div>
				<div class="tips tips7">2023 - 04 - 12<br/>Ai 形象公布</div>
				<div class="tips tips8">悠悠十年，一瞬永远<br/>『为你而来 而存在』</div>
				<div class="finalTachie final0">
					<img alt="" src="https://article.biliimg.com/bfs/article/3a6184943556ceb4c6216a0099770274d7b9ffa2.png">
				</div>
				<div class="finalTachie finalV3">
					<img alt="" src="https://article.biliimg.com/bfs/article/1c4505061ad44ae244932752d3d794f29c2684ad.png">
				</div>
				<div class="finalTachie finalV5">
					<img alt="" src="https://article.biliimg.com/bfs/article/9b14ff130dbdd0c8c32661806864f4760ae21ac1.png">
				</div>
				<div class="finalTachie finalAi">
					<!--todo-->
					<!--<img alt="" src="https://article.biliimg.com/bfs/article/4652649af358ea81f80eec4994596cb778457b88.png">-->
				</div>
			</div>
		</div>
	</div>


</template>

<style lang="scss" scoped>
.el-timeline {
	--el-timeline-node-size-large: 18px !important;
}

.el-timeline-item {
	width: 75vw;
}

.head {
	.inside {
		font-size: 5em;

		div {
			text-align: center;
			line-height: 70vh;
			//color: rgba(238, 0, 0,0.7);
			white-space: nowrap;
			overflow: hidden;

			span.titleMid {
				animation: blink 1.5s infinite;
			}
		}
	}
}

@keyframes blink {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

body,
html {
	height: 100vh;
}


.bubbleBox {
	opacity: 0;
	width: 20vw;
	max-height: 1000px;
	position: fixed;
	left: calc(80vw - 32vw);
	top: 20vh;
	background-color: #fff;
	border-radius: 5px;
	border: 1px solid #66ccff;
	transition: all 0.5s;
	z-index: 100;
	user-select: none;

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
	height: 100vh !important;
	overflow: hidden;

	.history {
		height: 90vh;
		width: 90vw;
		background-image: linear-gradient(
						to bottom, transparent 0, transparent 10vh,
						rgba(255, 255, 255, 0.5) 10vh, rgba(255, 255, 255, 0.5) 90vh,
						transparent 90vh, transparent 100vh);
		margin: 0 auto;
		opacity: 0;
		transition: all 0.5s;
		padding: 10vh 0 0 0;

		.inside {
			overflow: hidden;
			margin: 5vh 3vw;
			//canvas{
			//	height: 500px;
			//	width: 1200px;
			//}
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
			float: left;
			color: white;
			padding: 1em;
			user-select: none;
			border-radius: 10px;
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
				-webkit-animation-delay: $animationDelay+0.5s;
				animation-delay: $animationDelay+0.5s;
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
				-webkit-animation-delay: $animationDelay+1s;
				animation-delay: $animationDelay+1s;
			}

			&.tips3 {
				top: -49.5vh;
				left: 3vw;
				-webkit-animation-delay: $animationDelay+1.5s;
				animation-delay: $animationDelay+1.5s;
			}

			&.tips4 {
				top: -32vh;
				left: -25vw;
				-webkit-animation-delay: $animationDelay+2s;
				animation-delay: $animationDelay+2s;
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
				-webkit-animation-delay: $animationDelay+2.5s;
				animation-delay: $animationDelay+2.5s;
			}

			&.tips6 {
				top: -27.3vh;
				left: 33vw;
				-webkit-animation-delay: $animationDelay+3s;
				animation-delay: $animationDelay+3s;
			}

			&.tips7 {
				top: -28.3vh;
				left: 43vw;
				-webkit-animation-delay: $animationDelay+3.5s;
				animation-delay: $animationDelay+3.5s;
			}

			&.tips8 {
				top: -31vh;
				left: 46vw;
				line-height: 1.5em;
				-webkit-animation-delay: $animationDelay+4s;
				animation-delay: $animationDelay+4s;
			}
		}

		.finalTachie {
			position: absolute;
			width: 7vw;
			user-select: none;

			&.finalWord {
				white-space: nowrap;
				font-size: 1.2em;
				//transform: rotate(-45deg);
				top: 2vh;
				left: 0vw;

				p {
					width: 16rem;
					padding: 1vw 2vw;
					background-color: rgba(0, 0, 0, 0.3);
					margin: 0;
				}

				p:nth-child(1) {
					padding-top: 2vw;
				}

				p:last-child {
					padding-bottom: 2vw;
				}
			}

			&.final0 {
				width: 7vw;
				top: 0vh;
				left: 20vw;
			}

			&.finalV3 {
				width: 6vw;
				top: 0vh;
				right: 8vw;
			}

			&.finalV5 {
				width: 7vw;
				bottom: 24vh;
				left: 9vw;
			}

			&.finalAi {
				width: 8.5vw;
				bottom: 23vh;
				right: 30vw;
			}
		}

	}
}


$pageHeight: 320vh;
.page {
	height: $pageHeight;
	background-size: cover !important;
	background-position: center, top;
	background-attachment: fixed !important;

	// 注意：这里不可以通过 margin 值设置，background-image 需要与背景同高为 120vh，上下 10vh 设置为透明
	.content {
		width: 90vw;
		height: $pageHeight - 20vh;
		background-image: linear-gradient(
						to bottom, transparent 0, transparent 10vh,
						rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) $pageHeight - 10vh,
						transparent $pageHeight - 10vh, transparent $pageHeight);

		text-align: left;
		margin: 0 auto;
		padding: 15vh 0 0 0;

		.inside {
			overflow: hidden;
			margin: 3vh 1vw;
			height: $pageHeight - 30vh;
		}
	}

	.story {
		width: 100vw;

		.bg {
			height: $pageHeight;
			position: absolute;
			width: 98vw;
			z-index: 10;
			background-size: auto 70vh !important;
		}
	}
}

.head {
	//background: url(../assets/bgPic/首页.png) fixed;
	background: url(https://article.biliimg.com/bfs/article/3907d9824988b14a38f69cc18a5960b11ad214a7.png) fixed;
	background-position: center !important;
}

#lingcaiyin {
	// 每一页的独特高度
	$pageHeight: 190vh;

	height: $pageHeight;

	.bg {
		height: $pageHeight;
	}

	.content {
		height: $pageHeight - 20vh;
		background-image: linear-gradient(
						to bottom, transparent 0, transparent 10vh,
						rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) $pageHeight - 10vh,
						transparent $pageHeight - 10vh, transparent $pageHeight);

		.inside {
			height: $pageHeight - 30vh;
		}
	}

	//background-image: url(../assets/bgWord/VCP.png), url(../assets/bgPic/云端.png);
	background-image: url(https://article.biliimg.com/bfs/article/77f11eee1f298e29095747608cb090c62eadb81c.png), url(https://article.biliimg.com/bfs/article/f73d67839c71eb90352b6945ffd807ab2d5f369a.png);

	.bg {
		//background: url(../assets/bgLing/0.png) 80% bottom no-repeat fixed;
		background: url(https://article.biliimg.com/bfs/article/3a6184943556ceb4c6216a0099770274d7b9ffa2.png) 80% bottom no-repeat fixed;
		background-size: auto 72.5vh !important;
	}
}

#v3 {
	$pageHeight: 420vh;

	height: $pageHeight;

	.bg {
		height: $pageHeight;
	}

	.content {
		height: $pageHeight - 20vh;
		background-image: linear-gradient(
						to bottom, transparent 0, transparent 10vh,
						rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) $pageHeight - 10vh,
						transparent $pageHeight - 10vh, transparent $pageHeight);

		.inside {
			height: $pageHeight - 30vh;
		}
	}

	//background-image: url(../assets/bgWord/v3word.png), url(../assets/bgPic/梦语.png);
	background-image: url(https://article.biliimg.com/bfs/article/9d857ae5dc05626cc44cecd4b18ff88a3d096b48.png), url(https://article.biliimg.com/bfs/article/e1143590da779c44243f54a685a9a7f410d169ae.png);

	.bg {
		//background: url(../assets/bgLing/v3.png) 80% bottom no-repeat fixed;
		background: url(https://article.biliimg.com/bfs/article/1c4505061ad44ae244932752d3d794f29c2684ad.png) 80% bottom no-repeat fixed;
	}
}

#v5 {
	$pageHeight: 310vh;

	height: $pageHeight;

	.bg {
		height: $pageHeight;
	}

	.content {
		height: $pageHeight - 20vh;
		background-image: linear-gradient(
						to bottom, transparent 0, transparent 10vh,
						rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) $pageHeight - 10vh,
						transparent $pageHeight - 10vh, transparent $pageHeight);

		.inside {
			height: $pageHeight - 30vh;
		}
	}

	//background-image: url(../assets/bgWord/v5word.png), url(../assets/bgPic/山遥路远.png);
	background-image: url(https://article.biliimg.com/bfs/article/3b373ba97060d3b0f43da260e6d44cdf85633533.png), url(https://article.biliimg.com/bfs/article/54f15a16f5554c03056011570f8ff1c4557b749b.png);

	.bg {
		//background: url(../assets/bgLing/V5.png) 83.5% bottom no-repeat fixed;
		background: url(https://article.biliimg.com/bfs/article/9b14ff130dbdd0c8c32661806864f4760ae21ac1.png) 83.5% bottom no-repeat fixed;
		background-size: auto 71vh !important;
	}
}

#ai {
	$pageHeight: 180vh;

	height: $pageHeight;

	.bg {
		height: $pageHeight;
	}

	.content {
		height: $pageHeight - 20vh;
		background-image: linear-gradient(
						to bottom, transparent 0, transparent 10vh,
						rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) $pageHeight - 10vh,
						transparent $pageHeight - 10vh, transparent $pageHeight);

		.inside {
			height: $pageHeight - 30vh;
		}
	}

	//background-image: url(../assets/bgWord/ace.png), url(../assets/bgPic/无限接近幻想.jpg);
	background-image: url(https://article.biliimg.com/bfs/article/ddaf99a3cc247c44f8c1e9df24adbbc0d211831d.png), url(https://article.biliimg.com/bfs/article/c06ba9fa33e09d6c6d7df2ff420a24c919e688f2.jpg);

	.bg {
		// todo fixme
		//background: url(../assets/ai.png) 81% bottom no-repeat fixed;
		//background: url(https://article.biliimg.com/bfs/article/4652649af358ea81f80eec4994596cb778457b88.png) 81% bottom no-repeat fixed;
		background-size: auto 71vh !important;
	}
}

.final {
	//background: url(../assets/bgPic/繁华唱遍.png) fixed;
	background: url(https://article.biliimg.com/bfs/article/6b55f667d718fda42ffef7550188df246473e2f7.png) fixed;
}

</style>
