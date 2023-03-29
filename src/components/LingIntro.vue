<script setup>
import {onMounted, ref} from "vue"
import WOW from "wow.js";

let history = ref(null)
let bubbleBox = ref(null)
let nowPage = ref(0)
let finalPageShowFlag = ref(false)
let bubbleBoxShowFlag = ref(false)
onMounted(() => {
	let timeLineItems = document.querySelectorAll('.el-timeline-item')
	timeLineItems.forEach((item, index) => {
		item.classList.add('wow', 'animate__animated', 'animate__fadeInUp')
	})

	let wow = new WOW({
		boxClass: "wow", // 盒子类： 当用户滚动时显示隐藏框的类名。
		animateClass: "animated",// 动画类： 触发 CSS 动画的类名（默认情况下，animate.css 库为“动画”）
		offset: 100,// 抵消： 定义浏览器视口底部与隐藏框顶部之间的距离。当用户滚动并达到此距离时，将显示隐藏的框。
		mobile: true,//移动： 在移动设备上打开/关闭哇.js。
		live: true,//实时：持续检查页面上的新WOW元素。
		callback: function (box) {
			// the callback is fired every time an animation is started
			// the argument that is passed in is the DOM node being animated
		},
		scrollContainer: null, // optional scroll container selector, otherwise use window,
		resetAnimation: true, // reset animation on end (default is true)
	});
	wow.init();
	// 滚动监听
	window.addEventListener('scroll', function () {
		finalPageShowFlag.value = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100
		// 存储每页高度，单位为 vh
		let pageHeight = [100, 220, 220, 220, 220, 100];
		let totalHeight = 0;
		for (let i = 0; i < pageHeight.length; i++) {
			totalHeight += pageHeight[i];
			// 需要添加屏幕的一半高度，提早判断下一页的到来
			if (window.scrollY + window.innerHeight / 2 < totalHeight * window.innerHeight / 100) {
				nowPage.value = i;
				break;
			}
		}
		// console.log("当前在第" + (nowPage+1) + "页");
	})

	let screenWidth = window.innerWidth;
	let screenHeight = window.innerHeight;
	let startX = screenWidth * 0.625;
	let endX = screenWidth * 0.85;
	let startY = screenHeight * 0.3;
	let endY = screenHeight;
	// 通过 scrollTop 判断卷去的高度，从而算出是在第几页，需要传入第几代的数据
	// 也需要根据不同的页数微调样式，比如把气泡框左移一点
	document.addEventListener('mousemove', function (event) {
		let mouseX = event.clientX;
		let mouseY = event.clientY;
		const rect = bubbleBox.value.getBoundingClientRect();
		if (mouseX >= startX && mouseX <= endX && mouseY >= startY && mouseY <= endY) {
			bubbleBoxShowFlag = true
		} else if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
			// 鼠标在气泡框内，保持不变
		} else {
			bubbleBoxShowFlag = false;
		}
	});
})
// todo ⚠ fix 时间轴渐入出错，保存当前代码，然后回滚
const items = ref([
			{},
			{
				'姓名': '绫彩音',
				pinyin: 'Ling Caiyin',
				'人设': 'rikuhao（ハオ）',
				'发色': '黑发',
				'瞳色': '黑瞳',
				'年龄': '16',
				'身高': '155',
				'体重': '41',
				'特点': '麻花辫、美人痣、耳机、长短袜、腰鼓'
			},
			{
				'姓名': '乐正绫',
				pinyin: 'YueZheng Ling',
				'人设': 'rikuhao、ideolo',
				'发色': '棕发',
				'瞳色': '红瞳',
				'年龄': '16',
				'身高': '160',
				'体重': '41',
				'代表色': '#EE0000',
				'生日': '4.12',
				'星座': '白羊座',
				'特点': '麻花辫、美人痣、耳机、长短袜、腰鼓、左撇子',
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
				'姓名': '乐正绫',
				pinyin: 'YueZheng Ling',
				'人设': 'TID',
				'发色': '棕发',
				'瞳色': '红瞳',
				'代表色': '#EE0000',
				'声库版本': 'Vocaloid™5',
				'发布日期': '2022.10.14',
				'声库音色': '炽（Normal）、幽（Dark）',
				'擅长节奏': '60-220BPM',
				'擅长音域': 'F2-F4',
			},
			{
				'姓名': '乐正绫',
				pinyin: 'YueZheng Ling',
				'人设': '____',
				'发色': '棕发',
				'瞳色': '红瞳',
				'代表色': '#EE0000',
				'声源': '祈Inory',
				'声库制作人': '阿元',
				'声库版本': 'ACE-Studio',
			},
			{page: '6'}
		]
)
</script>

<template>
	<!--todo 通过 <Transition> 来增加 v-show 消失与进入的效果-->
	<div v-show="nowPage!==0&&nowPage!==5"
	     ref="bubbleBox"
	     :class="{show:bubbleBoxShowFlag}"
	     class="bubbleBox">
		<ul>
			<!--todo 撑大缩小盒子时也添加动效-->
			<li v-for="(value, key) in items[nowPage]" :key="key">
				<!--第{{ nowPage + 1 }}页 - -->
				{{ key }} - {{ value }}
			</li>
		</ul>
	</div>
	<!--首页-->
	<!--todo 动效（背景图前覆盖一层黑透明，文字像博客那样由中间向两边推出，
					 中间的 | 闪烁几下后，
					 全部文字 fadeOut 然后自动滑入下一页）-->
	<div class="page head">
		<div class="history show animate__animated animate__fadeIn animate__delay-1s">
			<div class="inside">
				<div class="words">
					<span class="titleLeft animate__animated animate__fadeIn">悠悠八年</span>
					<span class="titleMid animate__animated animate__fadeIn">|</span>
					<span class="titleRight animate__animated animate__fadeIn">一瞬永远</span>
				</div>
			</div>
		</div>
	</div>
	<!--todo 背景图上添加文字+持续年份（VOCALOID™ China Project、Vocaloid™3、Vocaloid™5、ACE-Studio）-->
	<!--     可以尝试设置两张背景图？或者直接把文字 P 到一张图上-->
	<!--     文字内容 + 时间选取需要体现时代变化（跨时代意义）-->
	<!--     图片切换到 B 站图床-->
	<!--     TimeLine 美化，查看文档切换其他样式-->
	<div id="lingcaiyin" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			<div class="inside">
				<el-timeline>
					<el-timeline-item placement="top" timestamp="2011/11/20">
						VOCALOID China Project 项目启动
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2011/12/01">
						开始征集 VOCALOID China Project 企划人物形象设计
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2012/01/03">
						VOCALOID China Project 形象征集结束
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2012/01/17">
						<el-card>
							<h3>「雅音宫羽、绫彩音、MOKO、牙音、蝶音」五位人设入选</h3>
							<p>VOCALOID China Project 形象评选结果公布，分别是「雅音宫羽、绫彩音、MOKO、牙音、蝶音」</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item center placement="top" timestamp="2012/03/21">
						<el-card>
							<h3>VOCALOID China Project 最终形象定稿公布</h3>
							<p>确定最终形象为「洛天依、乐正绫、徵羽摩柯、乐正龙牙、墨清弦」</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>

				</el-timeline>
			</div>
		</div>
	</div>
	<!--2012 -> 2015-->
	<div id="v3" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			<div class="inside">
				<el-timeline>
					<el-timeline-item placement="top" timestamp="2014/04/05">
						《云端》发布 —— 「三年孤寂愿与你相伴」
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2014/10/15">
						「乐正绫」声源公布，「祈Inory」为其 VOCALOID™3 中文声库声源
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/06/12">
						<el-card>
							<h2 style="color: #ee0000">「记住我，鲜艳的红色」</h2>
							<p>官方发布了「乐正绫」第一首试听曲 —— 《Scarlet Drop》</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/04">
						<h3>「将这份无用思念，与你再讲一遍」，乐正绫第二首官方试听曲《梦语》发布</h3>
					</el-timeline-item>
					<el-timeline-item center placement="top" timestamp="2015/07/17">
						<el-card>
							<h2>「乐正绫」VOCALOID™3 中文声库发售</h2>
							<p>VOCALOID™3 中文声库「乐正绫」正式发售，从此声库走向民间创作者，一个新的时代开启了</p>
						</el-card>
					</el-timeline-item>

					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>

				</el-timeline>
			</div>
		</div>
	</div>
	<!--2015 -> 2020-->
	<div id="v5" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			<div class="inside">
				<el-timeline>
					<el-timeline-item placement="top" timestamp="2020/04/12">
						<h2>乐正绫五周年，官方发布了生日贺曲《花》，本曲使用了尚未发售的乐正绫 V5 音源 </h2>
						<h3 style="color: #ee0000">「请你知晓　—— <i>好不好</i>」</h3>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2020/05/22">
						ChiliChill 发布了《山遥路远》，本曲使用了尚未发售的乐正绫 V5 音源
						<h3>「快走吧，山遥路远」</h3>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2021/04/12">
						<h3>乐正绫六周年，官方发布了生日贺曲《丑马》，本曲也使用了尚未发售的乐正绫 V5 音源 </h3>
					</el-timeline-item>
					<el-timeline-item center placement="top" timestamp="2022/10/14">
						<el-card>
							<h3>乐正绫 Vocaloid5 声库正式发售（预售）</h3>
							<del>值得一提的是，声库盒子上并未使用争议过大的 V5 立绘</del>
						</el-card>
					</el-timeline-item>

					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
	</div>
	<!--2020 -> 2023-->
	<div id="ai" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			<div class="inside">
				<el-timeline>
					<el-timeline-item placement="top" timestamp="2022/12/25">
						<p>卫星哥官方发文，正式宣布 ACE-Studio 「乐正绫」Ai 声库开启内测</p>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2023/01/13">
						<el-card>
							<h2>乐正绫第一首 Ai 曲投稿</h2>
							<p>【乐正绫AI】云端 —— 愿我们都能在云端歌唱</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2023/01/14">
						乐正绫官方宣布，开启形象创作征集活动
					</el-timeline-item>
					<el-timeline-item center placement="top" timestamp="2023/04/10">
						<el-card>
							<h2>乐正绫 Ai 形象敲定！</h2>
							<p>在数十个优秀作品中，_______老师的设计脱颖而出，成功当选绫 Ai 形象🎉🎉🎉</p>
						</el-card>
					</el-timeline-item>

					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>

				</el-timeline>
			</div>
		</div>
	</div>
	<!--尾页-->
	<div class="page final">
		<div ref="history"
		     :class="{show:finalPageShowFlag}"
		     class="history">
			<div class="inside">
				<p>在此歌唱 从零开始万千景象延伸远方</p>
				<p>（注：这里动态展示时间线）</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.head {
	.inside {
		font-size: 5em;

		div {
			text-align: center;
			line-height: 70vh;
		}
	}
}

//span.titleMid {
//	animation: blink 2s infinite;
//	position: relative;
//	left: 24vw;
//}
//
//span.titleLeft {
//	float: right;
//	text-align: center;
//	animation: leftEaseInAnimate 2s ease 1;
//	animation-fill-mode: forwards; /*定义动画结束的状态*/
//}
//
//span.titleRight {
//	float: right;
//	text-align: center;
//	animation: rightEaseInAnimate 2s ease 1;
//	animation-fill-mode: forwards; /*定义动画结束的状态*/
//}
//
//@keyframes blink {
//	0% {
//		opacity: 1;
//	}
//	50% {
//		opacity: 0;
//	}
//	100% {
//		opacity: 1;
//	}
//}
//
//@keyframes leftEaseInAnimate { /*定义从右边滑入文字的动画*/
//	0% {
//		transform: translateX(0vw);
//		opacity: 0;
//	}
//	100% {
//		transform: translateX(-47vw);
//		opacity: 1;
//	}
//}
//
//// 一瞬永远
//@keyframes rightEaseInAnimate { /*定义从左边滑入文字的动画*/
//	0% {
//		transform: translateX(-35vw);
//		opacity: 0;
//	}
//	100% {
//		transform: translateX(12vw);
//		opacity: 1;
//	}
//}

body,
html {
	height: 100vh;
}

.bubbleBox {
	opacity: 0;
	width: 20vw;
	position: fixed;
	left: calc(80vw - 32vw);
	top: 20vh;
	background-color: #fff;
	border-radius: 5px;
	border: 1px solid #66ccff;
	transition: all 0.5s;
	z-index: 100000;

	ul {
		margin: 0;
		padding: 10%;
	}
}

.el-timeline-item {
	width: 75vw;
	//.el-card{
	//	height: 15vh;
	//}
}

.show {
	opacity: 1 !important;
	transition: all 0.5s;
}

.head,
.final {
	height: 100vh !important;

	.history {
		height: 90vh;
		width: 90vw;
		background-image: linear-gradient(to bottom, transparent 0, transparent 10vh, rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) 90vh, transparent 90vh, transparent 100vh);
		margin: 0 auto;
		opacity: 0;
		transition: all 0.5s;
		padding: 10vh 0 0 0;

		.inside {
			margin: 5vh 3vw;
		}
	}


}

.page {
	//height: 120vh;
	height: 220vh;
	background-size: cover !important;
	background-position: top !important;

	// 注意：这里不可以通过 margin 值设置，background-image 需要与背景同高为 120vh，上下 10vh 设置为透明
	.content {
		width: 90vw;
		//height: 100vh;
		height: 200vh;
		//background-image: linear-gradient(to bottom, transparent 0, transparent 10vh, rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) 110vh, transparent 110vh, transparent 120vh);
		background-image: linear-gradient(to bottom, transparent 0, transparent 10vh, rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) 210vh, transparent 210vh, transparent 220vh);
		text-align: left;
		margin: 0 auto;
		padding: 15vh 0 0 0;

		.inside {
			overflow: hidden;
			margin: 3vh 1vw;
			//height: 90vh;
			height: 190vh;
		}
	}

	.story {
		width: 100vw;

		.bg {
			//height: 120vh;
			height: 220vh;
			position: absolute;
			width: 98vw;
			z-index: 10;
			background-size: auto 70vh !important;
		}
	}
}

.head {
	background: url(../assets/首页.png) fixed;
	background-position: center !important;
}

#lingcaiyin {
	background: url(../assets/云端.png) fixed;
	background-position: center !important;

	.bg {
		background: url(../assets/0.png) 80% bottom no-repeat fixed;
		background-size: auto 72.5vh !important;
	}
}

#v3 {
	background: url(../assets/梦语.png) fixed;

	.bg {
		background: url(../assets/v3.png) 80% bottom no-repeat fixed;
	}
}

#v5 {
	background: url(../assets/山遥路远.png) fixed;

	.bg {
		background: url(../assets/v5.png) 83.5% bottom no-repeat fixed;
		background-size: auto 71vh !important;
	}
}

#ai {
	background: url(../assets/无限接近幻想.jpg) fixed;

	.bg {
		background: url(../assets/ai.png) 81% bottom no-repeat fixed;
		background-size: auto 71vh !important;
	}
}

.final {
	background: url(../assets/繁华唱遍.png) fixed;
}
</style>
